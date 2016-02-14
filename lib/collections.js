this.Publishers = new Mongo.Collection("publishers");
this.Publishers.attachSchema(this.Schemas.Publisher);

this.Titles = new Mongo.Collection("titles");
this.Titles.attachSchema(this.Schemas.Title);

this.Requests = new Mongo.Collection("requests");
this.Requests.attachSchema(this.Schemas.Request);

this.Chats = new Mongo.Collection("chats");

this.Requests.before.insert(function (userId, request) {

    if (!Publishers.findOne({name: request.publisher})) {
        Publishers.insert( { name: request.publisher } );
    }
    if (!Titles.findOne({name: request.title, publisher: request.publisher})) {
        Titles.insert({name: request.title, publisher: request.publisher});
    }
    return true;
});

if (Meteor.isServer) {
    Requests.after.insert(function (userId, request) {

        var matchType = request.type === 'Buy' ? 'Sell' : 'Buy';

        // Finding matching complimentary requests (not created by the request user) and update them
        var matches = Requests.find({
            isActive: true,
            userId: {$ne: request.userId},
            type: matchType,
            publisher: request.publisher,
            title: request.title,
            volume: request.volume,
            minIssue: {$lte: request.maxIssue},
            maxIssue: {$gte: request.minIssue},
            minGrade: {$lte: request.maxGrade},
            maxGrade: {$gte: request.minGrade}
        }, {fields: {'_id': 1}});

        if (matches.length == 0) {
            console.log('no ' + matchType + ' matches');
        }
        else {
            console.log(matchType + ' matches:', matches.length);
            Requests.update(request._id, {
                $set: {
                    matches: matches.map(function (m) {
                        return {requestId: m._id};
                    })
                }
            });
            matches.map(function (m) {
                Requests.update(m._id, {$push: {matches: {requestId: request._id}}});
            });
        }
    });
}

Requests.before.remove(function(userId, request){

    Meteor.call('removeRequestReferences', request._id);
    Meteor.call('deleteChats', request._id);
});

Meteor.methods({

    getMatchingRequests: function(requestId) {
       return Requests.find({"matches.requestId": requestId }, {sort: {title: 1, minIssue:1}}).map(function (m) {m.requestId = requestId; return m;});
    },

    // Remove any references to this request
    removeRequestReferences: function(requestId) {

        Requests.update({"matches": requestId },
            {
                "$pull": {
                    "matches": requestId
                }
            });
    },

    // Remove any references to this request
    removeRequestReference: function(requestId, matchId) {

        // Remove reference in me to the other request
        Requests.update(requestId,
            {
                "$pull": {
                    "matches": { requestId: matchId }
                }
            });

        // remove reference in the other request to me
        Requests.update(matchId, {
            "$pull": {
                "matches": { requestId: requestId }
            }
        });
    },

    countChats: function() {
        return Chats.find({isActive:true}).count();
    },

    getChats: function() {
        var requestsWithChats = Requests.find({ isActive: true,
            userId: this.userId,
            matches: { $exists: true, $ne: [] },
            "matches.chatId": { $exists:true }
        }).fetch();
        console.log(requestsWithChats.length + ' Requests with chats for ' + this.userId);
        return requestsWithChats;
    },

    createChat: function(requestId, otherRequestId, otherUserId) {
        var chatId = Chats.insert({isActive: true, user1Id: this.userId, user2Id: otherUserId, user1RequestId: requestId, user2RequestId: otherRequestId,  messages: []});
        Requests.update({ _id: requestId, "matches.requestId": otherRequestId}, { $set: { "matches.$.chatId": chatId }});
        Requests.update({ _id: otherRequestId, "matches.requestId": requestId}, { $set: { "matches.$.chatId": chatId }});
        return chatId;
    },

    deleteChat: function(chatId) {
        console.log("deleting chatId:" + chatId);
        var chat = Chats.findOne({_id: chatId});
        if (chat) {
            Requests.update({ _id: chat.user1RequestId, "matches.requestId": chat.user2RequestId}, {$unset: {"matches.$.chatId": 1}});
            Requests.update({ _id: chat.user2RequestId, "matches.requestId": chat.user1RequestId}, {$unset: {"matches.$.chatId": 1}});
            Chats.remove({_id: chatId});
        }
    },

    deleteChats: function(requestId) {
        Chats.remove({$or: [{user1RequestId: requestId},{user2RequestId: requestId}]});
    },

    addMessage:function(chatId, message){
        var chat = Chats.findOne({_id:chatId});
        if (chat){
            var msgs = chat.messages;
            if (!msgs){
                msgs = [];
            }
            msgs.push({userId: this.userId, text: message});
            chat.messages = msgs;
            Chats.update(chat._id, chat);
        }
    },

    countMatches:function() {
        var sum=0;
        var requestsWithMatches = Requests.find({ matches: { $exists: true, $ne: [] } })
        requestsWithMatches.forEach(function(request){
            sum = sum + request.matches.length
        });
        return sum / 2; // /2 2 because each request will have an entry for it's opposite number so actual number is 1/2 the sum
    },

    myMatches:function() {
        var sum=0;
        var requestsWithMatches = Requests.find({ userId: this.userId, matches: { $exists: true, $ne: [] } })
        requestsWithMatches.forEach(function(request){
            sum = sum + request.matches.length
        });
        return sum;
    }
});
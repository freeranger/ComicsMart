this.Publishers = new Mongo.Collection("publishers");
this.Publishers.attachSchema(this.Schemas.Publisher);

this.Titles = new Mongo.Collection("titles");
this.Titles.attachSchema(this.Schemas.Title);

this.Requests = new Mongo.Collection("requests");
this.Requests.attachSchema(this.Schemas.Request);

this.Chats = new Mongo.Collection("chats");
// this.Chats.attachSchema(this.Schemas.Chat);

this.Requests.before.insert(function (userId, request) {

    if (!Publishers.findOne({name: request.publisher})) {
        Publishers.insert( { name: request.publisher } );
    }
    if (!Titles.findOne({name: request.title, publisher: request.publisher})) {
        Titles.insert({name: request.title, publisher: request.publisher});
    }
    return true;
});

Requests.after.insert(function (userId, request) {

    var matchType = request.type === 'Buy' ? 'Sell' : 'Buy';

    Meteor.call('getMatchingRequests', request, function(err, matches) {
        if (matches.length == 0) {
            console.log('no ' + matchType +' matches');
        }
        else {
            console.log(matchType + ' matches:', matches.length );
            Requests.update(request._id, { $set: { matches: matches.map(function(m) { return { requestId: m._id };})} });
            matches.map(function (m) {
                Requests.update(m._id, { $push: { matches: { requestId: request._id }}});
            });
        }
    });
});

Requests.before.remove(function(userId, request){

    Meteor.call('removeRequestReferences', request._id);

});

Meteor.methods({

    getRequests: function() {
        return Requests.find({ userId: this.userId, isActive: true }, {sort: {title: 1, minIssue:1}}).fetch();
    },

    getMatchingRequests: function(request) {

        var matchType = request.type === 'Buy' ? 'Sell' : 'Buy';

        // Finding matching complimentary requests (not created by the request user)
        var matches = Requests.find({ isActive: true,
            userId: { $ne: request.userId },
            type: matchType,
            publisher: request.publisher,
            title: request.title,
            volume: request.volume,
            minIssue: { $lte: request.maxIssue },
            maxIssue: { $gte: request.minIssue },
            minGrade: { $lte: request.maxGrade},
            maxGrade: { $gte: request.minGrade}
        }, {fields: {'_id': 1 }});

        return matches;
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

    getChats: function() {
        var user = Meteor.userId();
        var requestsWithChats = Requests.find({ isActive: true,
            userId: Meteor.userId(),
            matches: { $exists: true, $ne: [] },
            "matches.chatId": { $exists:true }
        }).fetch();
        console.log(requestsWithChats.length + ' Requests with chats for ' + user);
        return requestsWithChats;
    },

    addChatToRequests: function(chatId, requestId, otherRequestId) {

        Requests.update({ _id: requestId, "matches.requestId": otherRequestId}, { $set: { "matches.$.chatId": chatId }});
        Requests.update({ _id: otherRequestId, "matches.requestId": requestId}, { $set: { "matches.$.chatId": chatId }});

    },

    addMessage:function(chatId, message){
        var chat = Chats.findOne({_id:chatId});
        if (chat){
            var msgs = chat.messages;
            if (!msgs){
                msgs = [];
            }
            msgs.push({userId: Meteor.userId(), text: message});
            chat.messages = msgs;
            Chats.update(chat._id, chat);
        }
    }


});
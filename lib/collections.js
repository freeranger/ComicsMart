this.Publishers = new Mongo.Collection("publishers");
this.Publishers.attachSchema(this.Schemas.Publisher);

this.Titles = new Mongo.Collection("titles");
this.Titles.attachSchema(this.Schemas.Title);

this.Requests = new Mongo.Collection("requests");
this.Requests.attachSchema(this.Schemas.Request);

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

    if (request.type == 'Buy') {
        Meteor.call('getMatchingRequests', request, function(err, matches) {
            if (matches.length == 0) {
                console.log('no sell matches');
            }
            else {
                console.log('sell matches:', matches.length );
                // request.matches = matches.map(function (m) { return m._id});
                Requests.update(request._id, { $set: { matches: matches.map(function(m) { return m._id;})} });
                matches.map(function (m) {
                    Requests.update(m._id, { $push: { matches: request._id }});
                });
            }
        });
    }
    else {
        Meteor.call('getMatchingRequests', request, function(err, matches) {
            if (matches.length == 0) {
                console.log('no buy matches');
            }
            else {
                console.log('buy matches:', matches.length );
                // request.matches = matches.map(function (m) { return m._id});
                Requests.update(request._id, { $set: { matches: matches.map(function(m) { return m._id;})} });
                matches.map(function (m) {
                    Requests.update(m._id, { $push: { matches: request._id }});
                });
            }
        });
    }

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
        }, {fields: {'_id':1}});

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
                    "matches": matchId
                }
            });

        // remove reference in the other request to me
        Requests.update(matchId, {
            "$pull": {
                "matches": requestId
            }
        });
    }

});
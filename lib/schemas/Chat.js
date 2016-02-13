this.Schemas.Chat = new SimpleSchema({
    isActive: {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert) {
                return true;
            }
        }
    },
    user1Id: {
        type: String,
        autoValue: function() {
            if (this.isInsert && this.userId) {
                return this.userId;
            }
        },
        allowedValues: function () {
            // only allow references to the user collection.
            return Meteor.users.find().map(function (user) {
                return user._id
            });
        },
    },
    user2Id: {
        type: String,
        allowedValues: function () {
            // only allow references to the user collection.
            return Meteor.users.find().map(function (user) {
                return user._id
            });
        }
    },
    user1RequestId: {
        type: String,
        allowedValues: function () {
            // only allow references to existing Requests
            return Requests.find().map(function (doc) {
                return doc._id
            });
        }
    },
    user2RequestId: {
        type: String,
        allowedValues: function () {
            // only allow references to existing Requests
            return Requests.find().map(function (doc) {
                return doc._id
            });
        }
    },
    messages: {
        type: Array,
        optional: true
    },
    "messages.$": {
        type: Object
    },
    "messages.$.userId": {
        type: String,
        autoValue: function() {
            if (this.isInsert && this.userId) {
                return this.userId;
            }
        },
        allowedValues: function () {
            // only allow references to existing Users
            return Meteor.users.find().map(function (doc) {
                return doc._id
            });
        }
    },
    "messages.$.text": {
        type: String
    },
    "messages.$.time": {
        type: Date,
        autoValue: function() {
            return new Date().valueOf();
        }
    }


});

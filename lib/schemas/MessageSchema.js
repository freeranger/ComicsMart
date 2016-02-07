this.Schemas.MessageSchema = new SimpleSchema({
    userId: {
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
        },
    },
    text: {
        type: String
    },
    time: {
        type: Date,
        autoValue: function() {
            return new Date().valueOf();
        }
    }
});

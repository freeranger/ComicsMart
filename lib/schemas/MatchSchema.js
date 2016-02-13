this.Schemas.MatchSchema = new SimpleSchema({
    requestId: {
        type: String,
        allowedValues: function () {
            // only allow references to existing Requests
            return Requests.find().map(function (doc) {
                return doc._id
            });
        }
    },
    chatId: {
        type: String,
        optional: true,
        allowedValues: function () {
            // only allow references to existing Chats
            return Chats.find().map(function (doc) {
                return doc._id
            });
        }
    }
});

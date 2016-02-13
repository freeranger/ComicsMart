Meteor.publish("publishers", function () {
    return Publishers.find();
});

Meteor.publish("titles", function () {
    return Titles.find();
});

Meteor.publish("requests", function () {
    return Requests.find();
});

Meteor.publish("chats", function () {
    return Chats.find({$or : [{user1Id: this.userId},{user2Id: this.userId}]});
});

Meteor.publish("userData", function() {
    return Meteor.users.find({},
        {fields: {_id:1, username: 1 }});
});
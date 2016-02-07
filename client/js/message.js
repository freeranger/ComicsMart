Template.message.helpers({
    getUserDisplayName: function(userId) {
        if (userId === Meteor.userId()){
            return "me";
        } else {
            var user = Meteor.users.findOne({_id:userId});
            return user.username;
        }
    },
    getUserClass: function(userId) {
        if (userId === Meteor.userId()){
            return "blue-text text-darken-2";
        } else {
            return "teal-text";
        }
    }
})


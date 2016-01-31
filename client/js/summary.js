Template.summary.helpers({
    userName: function() {
        // TO DO - return a friendly user name
        return Meteor.user().emails[0].address;
    },
    requestCount:function(){
        return Requests.find({ userId: Meteor.userId(), isActive: true }).count();
    }

});
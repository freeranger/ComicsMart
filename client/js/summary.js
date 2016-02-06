Template.summary.helpers({
    requestCount:function(){
        return Requests.find({ userId: Meteor.userId(), isActive: true }).count();
    }

});
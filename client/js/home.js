Template.home.helpers({
    myRequestCount:function(){
        return Blaze._globalHelpers["myRequestList"]().count();
    },
    myChatCount:function(){
        return Chats.find().count();
    },

    myMatchCount: function() {
        Meteor.call("myMatches", function(error, count) {
            Session.set('myMatches', count);
        })
        return Session.get('myMatches');
    },

    totalRequestCount:function(){
        return Requests.find({isActive: true}).count();
    },
    totalMatches:function() {
        Meteor.call("countMatches", function(error, count) {
            Session.set('totalMatches', count);
        })
        return Session.get('totalMatches');
    },
    totalChatCount:function(){
        Meteor.call("countChats", function(error, count) {
            Session.set('totalChats', count);
        })
        return Session.get('totalChats');
    }
});

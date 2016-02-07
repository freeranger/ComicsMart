Session.set('showDelete', false);

Template.chats.helpers({
    // find all visible chats
    chatList:function(){
        Meteor.call('getChats', function(error, result) {
            Session.set('myChats', result)
        });
        return Session.get('myChats');
    },
    shouldShowDelete: function() {
        return Session.get('showDelete');
    }
});

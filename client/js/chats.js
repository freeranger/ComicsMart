Session.set('showDelete', false);

Template.chats.helpers({
    // find all visible chats
    requestList:function(){
        Meteor.call('getChats', function(error, result) {
            Session.set('myChats', result)
        });
        return Session.get('myChats');
    },
    chatList: function(matches) {
        var chats = [];
        for(var i=0; i < matches.length; i++) {
            if (matches[i].chatId) {
                var matchingRequest = Requests.findOne(matches[i].requestId);
                chats.push({chatId: matches[i].chatId, userId: matchingRequest.userId});
            }
        }
        return chats;
    },
    shouldShowDelete: function() {
        return Session.get('showDelete');
    }
});

Template.chats.rendered = function() {
    $('.tooltipped').tooltip({delay: 200});
}

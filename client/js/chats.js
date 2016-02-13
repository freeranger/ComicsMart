Session.set('showDeleteChats', false);

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
        return Session.get('showDeleteChats');
    }
});

Template.chats.rendered = function() {
    $('.js-toggleRemoveChats').click(function() {
        Session.set('showDeleteChats', !Session.get('showDeleteChats'));
    });

    $('.js-chats').on('click', '.js-removeChat', function(target) {
        var target = $(target.currentTarget);
        var id = target.data('id');
        MaterializeModal.confirm({
            title: "Delete Chat",
            message: "Are you sure you want to delete this Chat with " +  target.data('username') + " about " + target.data('title') +"?",
            callback: function(error, response) {
                if (response.submit) {
                    Meteor.call('deleteChat', id);
                    Materialize.toast("Chat Deleted!", 750, "black");
                } else {
                    Materialize.toast("Delete Cancelled", 750, "black");
                }
            }
        });
    });

    $('.tooltipped').tooltip({delay: 200});
}


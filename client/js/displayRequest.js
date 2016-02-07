Template.displayRequest.helpers({
    // find all visible docs
    matchList: function(requestId){
        return Requests.find({"matches.requestId": requestId }, {sort: {title: 1, minIssue:1}}).map(function (m) {m.requestId = requestId; return m;});
    },
    /*
    getChatLink: function(requestId, otherUserId, matches) {
        var match = $.grep(matches, function(e){ return e.requestId == requestId; })[0];
        if(match.chatId) {
            return '/chat/' + match.chatId;
        }
        else {
            return '/chat?requestId=' + requestId + '&otherUser=' + otherUserId;
        }
    },
    */
    getChatId: function(requestId, matches) {
        var match = $.grep(matches, function(e){ return e.requestId == requestId; })[0];
        if (match.chatId) {
            return match.chatId;
        }
        return '';
    }
});

Template.displayRequest.rendered = function() {
    $('.card-panel').on('click', '.js-notInterested', function(event) {
        var target = $(event.currentTarget);
        var requestId = target.closest('.js-request').data('id');
        var id = target.data('id');
        target.tooltip('remove');   // Take the tooltip off this button before we remove the item (and thus the row)
        Meteor.call('removeRequestReference', requestId, id);
        Materialize.toast("Match ignored!", 750, "black");
    });

    $('.card-panel').on('click', '.js-Chat', function(event) {
        event.preventDefault();
        var target = $(event.currentTarget);
        var chatId = target.data('chatid');
        if (!chatId) {
            var otherUserId = target.data('otheruserid');
            var requestId = target.closest('.js-request').data('id');
            var otherRequestId = target.data('id');
            var chatId = Chats.insert({isActive: true, userId1: Meteor.userId(), userId2: otherUserId, messages: []});
            Meteor.call('addChatToRequests', chatId, requestId, otherRequestId);
            Session.set('chatId', chatId);
        }
        MaterializeModal.close(false);
        Router.go('/chat/' + chatId);
    });

    $('.modal-body .tooltipped').tooltip({delay: 500});
}
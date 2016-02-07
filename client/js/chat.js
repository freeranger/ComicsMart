Template.chat.helpers({
    messages:function(){
        var chat = Chats.findOne({_id:Session.get("chatId")});
        return chat.messages;
    }
})
Template.chat.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat':function(event){
        // stop the form from triggering a page reload
        event.preventDefault();
        Meteor.call('addMessage', Session.get("chatId"), event.target.chat.value);
        // reset the form
        event.target.chat.value = '';
    }
})

// set up the iron router
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404NotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('requests', {
        path: '/requests'
    });

    this.route('chats', {
       path: '/chats'
    });

    this.route('chat', {
        path: '/chats/:_id',
        data: function (){
            var chatId = this.params._id;
            Session.set("chatId", chatId);
            var chat = Chats.findOne(chatId);
            var request = Requests.findOne({ userId: Meteor.userId(), "matches.chatId": chatId });
            var otherUserId;
            if (chat.user1Id === Meteor.userId()) {
                otherUserId = chat.user2Id;
            }
            else {
                otherUserId = chat.user1Id;
            }
            var otherUser = Meteor.users.findOne(otherUserId).username;

            templateData = {
                chat: chat,
                otherUser: otherUser,
                request: request
            };
            return templateData;
        }
    });

});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

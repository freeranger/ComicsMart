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


// 'home' page
/*
Router.route('/', function () {
    console.log("you hit / ");
    this.render("navbar", {to:"header"});
    this.render("home", {to:"main"});
});
*/

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('requests', {
        path: '/requests'
    });

    this.route('chat', {
        path: '/chat/:_id?',
        data: function (){
            var chatId = this.params._id;
            Session.set("chatId", chatId);
            var chat = Chats.findOne(chatId);
            var request = Requests.findOne({ userId: Meteor.userId(), "matches.chatId": chatId });
            var otherUserId;
            if (chat.userId1 === Meteor.userId()) {
                otherUserId = chat.userId2;
            }
            else {
                otherUserId = chat.userId1;
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

/*
Router.route('/chat'), function () {
    var user = Meteor.userId();

    var filter = {$or:[
        {user1Id:user},
        {user2Id:user}
    ]};

    var chats = Chats.find(filter);
    Session.set("")
}
*/
/*
// specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function () {
    var chatId = this.params._id;

    var chat = Chats.find(chatId);

    var otherUserId;
    if (chat.userId1 === Meteor.userId()) {
        otherUserId =chat.userId2;
    }
    else {
        otherUserId = chat.userId1;
    }
    var otherUser = Meteor.users.find(otherUserId).username;

    Session.set("chatId", chatId);
    Session.set("otherUser", otherUser);

    /*
    if (!chat){// no chat matching the filter - need to insert a new one
        chatId = Chats.insert({user1Id:Meteor.userId(), user2Id:otherUserId});
    }
    else {// there is a chat going already - use that.
        chatId = chat._id;
    }
    */
    /*
    if (chatId){// looking good, save the id to the session
        Session.set("chatId",chatId);
        Session.set("otherUserId",otherUserId);
    }
    this.render("navbar", {to:"header"});
    this.render("chat", {to:"main"});

});
*/

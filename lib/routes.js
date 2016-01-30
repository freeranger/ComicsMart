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
});

Router.plugin('ensureSignedIn', {
    only: ['private']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
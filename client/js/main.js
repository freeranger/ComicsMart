

// individual document page
/*
Router.route('/documents/:_id', function () {
    console.log("you hit /documents  "+this.params._id);
    Session.set("docid", this.params._id);
    this.render("navbar", {to:"header"});
    this.render("docItem", {to:"main"});
});
*/


// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
    counter: function () {
        return Session.get('counter');
    }
});


Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});

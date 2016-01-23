Template.requests.helpers({
    // find all visible docs
    requestList:function(){
        return Requests.find({ userId: Meteor.userId()}, {sort: {title: 1, minIssue:1}});
    }
});

Template.requests.rendered = function() {
    $(document).ready(function(){
   //     $('.js-requests').DataTable({"info":     false});
    });
}
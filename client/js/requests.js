Session.set('addRequestCancelled', false);
Session.set('showDelete', false);


Template.requests.helpers({
    // find all visible docs
    requestList:function(){
        return Requests.find({ userId: Meteor.userId(), isActive: true }, {sort: {title: 1, minIssue:1}});
    },
    gradeShortName: function(grade) {
        return GradeList.find(function(g) {  return g.value == grade }).name;
    },
    setCancelled: function() {
        addRequestCancelled = true;
    },
    shouldShowDelete: function() {
        return Session.get('showDelete');
    }
});

Template.requests.rendered = function() {
  //  $(document).ready(function(){
        $('.js-addRequest').click(function() {
            AutoForm.resetForm('addRequest');
            Session.set('addRequestCancelled', false);
            MaterializeModal.display({
                title: null, //"Add a Request",
                bodyTemplate: "addRequest",
                submitLabel: null,
                closeLabel: null,
                footerTemplate: '<div style="display:none"'
            });
        });

        $('.js-toggleRemoveRequests').click(function() {
            Session.set('showDelete', !Session.get('showDelete'));
        });

    $('.js-requests').on('click', '.js-removeRequest', function(target) {
        var target = $(target.currentTarget);
        var id = target.data('id');
        MaterializeModal.confirm({
            title: "Delete Request",
            message: "Are you sure you want to delete this request for " +  target.data('title') + "?",
            callback: function(error, response) {
                if (response.submit) {
                    Requests.remove({_id:id});
                    Materialize.toast("Request Deleted!", 750, "black");
                } else {
                    Materialize.toast("Delete Cancelled", 750, "black");
                }
            }
        });

        // alert('are you sure?');
    });

    $('.tooltipped').tooltip({delay: 200});
   // });
}

AutoForm.addHooks(["addRequest"], {

    onSuccess: function(operation, result, template) {
        if (Session.get('addRequestCancelled')) {
            MaterializeModal.close(false);
            return false;
        }

        // display success, reset form status
        console.log('operation: ' + operation + ' result:' + result)
        MaterializeModal.close();
        Materialize.toast("Request added", 1000);
       // console.log("CAPTCHA Validation Success! Email Sent!");
    },

    onError: function(operation, error, template) {
        // display error, reset form status
        console.log('Error during ' + operation + ' - ' + error);
        return false;
    }
});

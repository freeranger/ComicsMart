Session.set('addRequestCancelled', false);
Session.set('showDelete', false);


Template.requests.helpers({
    setCancelled: function() {
        addRequestCancelled = true;
    },
    shouldShowDelete: function() {
        return Session.get('showDelete');
    }
});

Template.requests.rendered = function() {
    $('.js-addRequest').click(function() {
        AutoForm.resetForm('addRequest');
        Session.set('addRequestCancelled', false);
        Session.set('showDelete', false);
        MaterializeModal.display({
            title: null,
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
                    Requests.remove({_id: id});
                    Materialize.toast("Request Deleted!", 750, "black");
                } else {
                    Materialize.toast("Delete Cancelled", 750, "black");
                }
            }
        });
    });

    $('.js-requests').on('click', '.js-openRequest', function(target) {
        var target = $(target.currentTarget);
        var id = target.data('id');
        MaterializeModal.display({
            title: null,
            closeLabel: '<i class="material-icons left red-text">exit_to_app</i> Close',
            bodyTemplate: "displayRequest",
            request: Requests.findOne({ _id: id}),
            callback: function(error, response) {
                // Remove the tooltips on the modal incase they cause problems
               $('.modal-body .tooltipped').tooltip('remove');
            }
        });
    });

    $('.tooltipped').tooltip({delay: 200});
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

    },

    onError: function(operation, error, template) {
        // display error, reset form status
        console.log('Error during ' + operation + ' - ' + error);
        return false;
    }
});

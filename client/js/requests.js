Template.requests.helpers({
    // find all visible docs
    requestList:function(){
        return Requests.find({ userId: Meteor.userId(), isActive: true }, {sort: {title: 1, minIssue:1}});
    },
    gradeShortName: function(grade) {
        return GradeList.find(function(g) {  return g.value == grade }).name;
    }
});

Template.requests.rendered = function() {
  //  $(document).ready(function(){
        $('.js-addRequest').click(function() {
            AutoForm.resetForm('addRequest');
            MaterializeModal.display({
                title: "Add a Request",
                bodyTemplate: "addRequest",
                submitLabel: null, //'<i class="material-icons left green-text">done</i> Add Request',
                closeLabel: null,// '<i class="material-icons left red-text">exit_to_app</i> Cancel',
                footerTemplate: null,
                /*
                callback: function(error, response) {
                    if (response.submit) {

                       // if (!AutoForm.validateForm('addRequest')) {
                         //   return false;
                       // }
                        // Iterate over form results & display.
                       // for (var field in response.form) {
                         //   console.log(field + ": " + response.form[field]);
                       // }
                    } else {
                        // console.log("Cancelled by user!");
                        Materialize.toast("Request cancelled", 1000);
                    }
                }
*/
            });
        });

        $('.tooltipped').tooltip({delay: 200});
   // });
}

/*
AutoForm.hooks({
    addRequest: {
        onSubmit: function (insertDoc) {
            if (customHandler(insertDoc)) {
                this.done();
                Materialize.toast("Request added!", 1000);

            } else {
                this.done(new Error("Submission failed"));
            }
            return false;
        }
    }
});
*/
AutoForm.addHooks(["addRequest"], {

    onSubmit: function(doc) {

        console.log("submitttttt");

    },

    onSuccess: function(operation, result, template) {
        // display success, reset form status
        MaterializeModal.close();
        Materialize.toast("Request added", 1000);
       // console.log("CAPTCHA Validation Success! Email Sent!");
    },

    onError: function(operation, error, template) {
        // display error, reset form status
        console.log('Error during ' + operation + ' - ' + error);
    }
});

//                submitLabel: '<i class="material-icons left green-text">done</i> Add Request',
// closeLabel: '<i class="material-icons left red-text">exit_to_app</i> Cancel',
//  <button type="submit" id="submitButton" class="btn waves-effect waves-light "><i class="material-icons left">done</i>Add Request</button>
// <button id="closeButton" class="btn red waves-effect waves-light"><i class="material-icons left">exit_to_app</i>Cancel</button>

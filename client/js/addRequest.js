Template.addRequest.helpers({
    gradeList: function() {
        return GradeList.sort(function(a, b) {  return b.value - a.value});
    },

    publisherSettings: function() {
        return {
            position: "top",
            limit: 10,
            rules: [
                {
                    collection: Publishers,
                    field: "name",
                    matchAll: true,
                    template: Template.publisher,
                    noMatchTemplate: Template.newPublisher
                }
            ],
            sort:true
        };
    },
    titleSettings: function() {
        return {
            position: "top",
            limit: 10,
            rules: [
                {
                    collection: Titles,
                    field: "name",
                    matchAll: true,
                    template: Template.title,
                    noMatchTemplate: Template.newTitle
                }
            ],
            sort:true
        };
    }
});

Template.addRequest.rendered = function() {
    $('#cancelAddRequest').click(function() {
        AutoForm.resetForm('addRequest');
        MaterializeModal.close();
        Materialize.toast("Request cancelled", 1000);
    });
};

Template.addRequest.helpers({
    gradeList: function() {
        return GradeList.sort(function(a, b) {  return b.value - a.value});
    },

    publisherShouldBeDisabled: function () {
        return false;
    },

    newRequest: function() {
        AutoForm.resetForm('addRequest');
        return {
            type: 'Buy',
            fillType: 'Any',
            volume: 1,
            minGrade: 8.0,
            publisher:'',
            title:'',
            minIssue:''
        }
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


Template.addRequest.events({
    "autocompleteselect input": function(event, template, doc) {
        if (this.name == 'title') {
            var publisher = AutoForm.getFieldValue('publisher', 'addRequest');
            $('#publisher').val(doc.publisher);
            console.log('title:' + doc);
        }
        else {
            console.log('pub:' + doc);
        }
    },

    "autocompleteselect input title": function(event, template, doc) {
        console.log("title eee", doc);
    }
});
Template.addRequest.helpers({
    gradeList: function() {
        return [
            {label: "Gem Mint", value: 10.0},
            {label: "Mint", value: 9.9},
            {label: "Near Mint/Mint", value: 9.8},
            {label: "Near Mint +", value: 9.6},
            {label: "Near Mint", value: 9.4},
            {label: "Near Mint -", value: 9.2},
            {label: "Very Fine/Near Mint", value: 9.0},
            {label: "Very Fine +", value: 8.5},
            {label: "Very Fine", value: 8.0},
            {label: "Very Fine -", value: 7.5},
            {label: "Fine/Very Fine", value: 7.0},
            {label: "Fine +", value: 6.5},
            {label: "Fine", value: 6.0},
            {label: "Fine -", value: 5.5},
            {label: "Very Good/Fine", value: 5.0},
            {label: "Very Good +", value: 4.5},
            {label: "Very Good", value: 4.0},
            {label: "Very Good -", value: 3.5},
            {label: "Good/Very Good", value: 3.0},
            {label: "Good +", value: 2.5},
            {label: "Good", value: 2.0},
            {label: "Good -", value: 1.8},
            {label: "Fair/Good", value: 1.5},
            {label: "Fair", value: 1.0},
            {label: "Poor", value: 0.5}
        ].sort(function(a, b) {  return a.value - b.value});
    },

    publisherSettings: function() {
        return {
            position: "top",
            limit: 10,
            rules: [
                {
                    collection: Publishers,
                    field: "name",
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
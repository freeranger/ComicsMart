var gradeValues = [0.5, 1.0, 1.5, 1.8, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.2, 9.4, 9.6, 9.8, 9.9, 10.0]

this.Schemas.Request = new SimpleSchema({
    userId: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return this.userId;
            }
        }
    },
    title: {
        type: String,
        max: 250,
        label: 'Title'
    },
    publisher: {
        type: String,
        max: 100,
        label: 'Publisher'
    },
    type: {
        type: String,
        allowedValues: ['Buy','Sell'],
        label:'Request Type'
    },
    volume: {
        type: Number,
        min: 1,
        label: 'Volume'
    },
    minIssue:{
        type: Number,
        min: 1,
        label: 'Min Issue'
    },
    maxIssue: {
        type: Number,
        min: 1,
        optional: true,
        label: 'Max Issue',
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return this.field('minIssue').value;
            }
        },
        custom: function() {
            var minIssue = this.field('minIssue').value;
            if (minIssue){
                if (this.value && this.value < minIssue) {
                    return "minIssue";
                }
            }
        }

    },
    minGrade: {
        type: Number,
        decimal: true,
        label: 'Min Grade',
        allowedValues: gradeValues
    },
    maxGrade: {
        type: Number,
        decimal: true,
        optional: true,
        label: 'Max Grade',
        allowedValues: gradeValues,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return this.field('minGrade').value;
            }
        },
        custom: function() {
            var minGrade = this.field('minGrade').value;
            if (minGrade){
                if (this.value && this.value < minGrade) {
                    return "minGrade";
                }
            }
        }
    },
    fillType: {
        type: String,
        allowedValues: ['Any', 'Partial', 'Full'],
        label: 'Request Match Type'
    },
    matches: {
        type: [String],
        optional: true,
        label: 'Matching Requests'
    }
});

this.Schemas.Request.messages({
    minIssue: "[label] must be >= Min Issue (or blank)",
    minGrade: "[label] must be at least as good as the Min Grade (or blank)"
});
var gradeValues = this.GradeList.map(function (g) { return g.value});

this.Schemas.Request = new SimpleSchema({
    isActive: {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert) {
                return true;
            }
        }
    },
    userId: {
        type: String,
        autoValue: function() {
            if (this.isInsert && this.userId) {
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
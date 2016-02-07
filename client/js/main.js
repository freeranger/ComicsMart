Template.registerHelper('Schemas', function() {
    return Schemas;
});

Template.registerHelper('getGradeName', function(grade) {
    return GradeList.find(function(g) {  return g.value == grade }).name;
});

Template.registerHelper('getGradeLabel', function(grade) {
    return GradeList.find(function(g) {  return g.value == grade }).label;
});

Template.registerHelper('getUsername', function(userId){
    var user = Meteor.users.findOne({_id:userId});
    return user.username;
});

Template.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
});
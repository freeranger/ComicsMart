Template.displayRequest.helpers({
    // find all visible docs
    matchList:function(requestId){
        return Requests.find({ matches: requestId }, {sort: {title: 1, minIssue:1}});
    }
});

Template.displayRequest.rendered = function() {
    $('.modal-body .tooltipped').tooltip({delay: 200});
}
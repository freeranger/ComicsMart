Template.displayRequest.helpers({
    // find all visible docs
    matchList:function(requestId){
        return Requests.find({ matches: requestId}, {sort: {title: 1, minIssue:1}});
    }
});

Template.displayRequest.rendered = function() {
    $('.card-panel').on('click', '.js-notInterested', function(target) {
        var target = $(target.currentTarget);
        var requestId = target.closest('.js-request').data('id');
        var id = target.data('id');
        target.tooltip('remove');
        Meteor.call('removeRequestReference', requestId, id);
        Materialize.toast("Match ignored!", 750, "black");
    });

    $('.modal-body .tooltipped').tooltip({delay: 500});
}
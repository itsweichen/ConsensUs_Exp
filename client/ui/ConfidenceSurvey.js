Template.ConfidenceSurvey.events({
    'submit form': function(e) {
        e.preventDefault();
        var confidence = $('input[name="confidence"]:checked').val();
        var willingness = $('input[name="willingness"]:checked').val()
        var order = FlowRouter.getQueryParam("order");
        console.log(confidence, willingness, order);
        Confidence.insert({userId: Meteor.userId(), confidence: confidence, willingness: willingness, order: order});

        if (order == "1") {
            FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type=1');
        }
        else {
            FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/done');
        }
    }
});

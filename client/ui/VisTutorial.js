Template.VisTutorial.events({
    'click #next-btn': function() {
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type=1');
    }
});

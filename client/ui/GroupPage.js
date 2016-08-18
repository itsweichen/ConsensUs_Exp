Template.GroupPage.helpers({
    'type': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '1';
    }
});

Template.GroupPage.events({
    'click #submitArgu': function() {
        var argu = $('textarea').val();
        Arguments.insert({userId: Meteor.userId(), argu: argu});
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/individual?order=2');
    }
});

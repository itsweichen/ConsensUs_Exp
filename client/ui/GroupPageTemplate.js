Template.GroupPageTemplate.helpers({
    cond1: function() {
        var taskId = FlowRouter.getParam("taskId");
        console.log(taskId);
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 1;
    },
    cond3: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 3;
    },
    'type': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '1';
    }
});

Template.GroupPageTemplate.events({
    'click #submitArgu': function() {
        var argu = $('textarea').val();
        Arguments.insert({userId: Meteor.userId(), argu: argu});
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/individual?order=2');
    }
});

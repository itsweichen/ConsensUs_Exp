Template.VisExample.helpers({
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 4;
    }
});

Template.GroupPageBothConflicts.helpers({
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 4;
    }
});

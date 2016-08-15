Template.TaskInstructions.events({
    'click #btn-start': function() {
        var username = $('#username').val();
        var taskId = FlowRouter.getParam("taskId");
        Chairs.insert({userName: username, taskId: taskId});
        Session.set('chairName', username);
        FlowRouter.go('/'+taskId+'/individual');
    },
});

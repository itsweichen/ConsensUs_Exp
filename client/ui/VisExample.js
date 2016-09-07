

Template.VisExample.events({
    'click #tour-start': (event) => {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        console.log("restart");
        Session.set('hideEndTour', false);

        if ((task.condition === 1) || (task.condition === 2)) {
            groupVisExample.restart(true);
        } else if (task.condition === 3) {
            arguTour.restart(true);
        } else {
            groupVisExampleBoth.restart(true);
        }

    },
    'click #next-btn': function() {
        timerStart(2);
        $('body, html').animate({ scrollTop: 0 }, 800);
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type=1');
    }
});

Template.VisExample.helpers({
    cond1_2: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        if (task)
            return (task.condition === 1) || (task.condition === 2) || (task.condition === 4);
    },
    cond3: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        if (task)
            return task.condition === 3;
    },
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        if (task)
            return task.condition === 4;
    }
});

Template.VisExampleVis.helpers({
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 4;
    }
});


Template.VisExample.onRendered(function() {
    this.autorun(function() {
    Session.set('hideEndTour', hideEndTour);
    var taskId = FlowRouter.getParam("taskId");
    var task = Tasks.findOne({_id: taskId});
    if (!taskId || !task) {
        return;
    }
    if ((task.condition === 1) || (task.condition === 2)) {
        groupVisExample.init();
        groupVisExample.start(true);
    } else {
        arguTour.init();
        arguTour.start(true);
    }
});
});

Template.VisExample.events({
    'click #tour-start': (event) => {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        console.log("restart");
        Session.set('hideEndTour', false);

        if ((task.condition === 1) || (task.condition === 2)) {
            groupVisExample.restart(true);
        } else {
            arguTour.restart(true);
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
        return (task.condition === 1) || (task.condition === 2);
    },
    cond3: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 3;
    }
});

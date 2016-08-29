
Template.VisExample.onRendered(function() {
    Session.set('hideEndTour', hideEndTour);
    groupVisExample.init();
    groupVisExample.start(true);
});

Template.VisExample.events({
    'click #tour-start': (event) => {
        console.log("restart");
        Session.set('hideEndTour', false);
        groupVisExample.restart(true);
    },
    'click #next-btn': function() {
        timerStart(2);
        $('body, html').animate({ scrollTop: 0 }, 800);
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type=1');
    }
});

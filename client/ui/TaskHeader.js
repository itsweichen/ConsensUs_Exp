Template.TaskHeader.helpers({
    chairName: function() {
        return Meteor.user() && Meteor.user().profile && Meteor.user().profile.nickname;
    }
});

Template.TaskHeader.events({
    'click #tour-start': (event) => {
        Session.set('hideEndTour', false);
        if (FlowRouter.getRouteName() == "individualPage") {
            individualTour.restart();
        } else if (FlowRouter.getRouteName() == "groupPage") {
            groupVisTour.restart();
        }

    }
});

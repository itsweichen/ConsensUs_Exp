Template.TaskHeader.helpers({
    chairName: function() {
        return Meteor.user().profile.nickname;
    }
});

Template.TaskHeader.events({
    'click #tour-start': (event) => {
        tour.restart();
    }
});

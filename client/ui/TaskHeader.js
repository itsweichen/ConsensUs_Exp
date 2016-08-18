Template.TaskHeader.helpers({
    chairName: function() {
        return Meteor.user().profile.nickname;
    }
});

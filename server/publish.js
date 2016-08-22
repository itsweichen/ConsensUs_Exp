Meteor.publish('user.voters', function(taskId) {
    return Voters.find();
});

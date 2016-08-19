Meteor.methods({
    timer: function(userId, stage, timeRange) {
        Timer.insert({userId: userId, stage: stage, time: timeRange});
    }
});

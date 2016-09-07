timerStart = function(stage) {
    console.log("timer - stage: " + stage);
    Meteor.call('timer', Meteor.userId(), stage, Date.now());
}

timerEnd = function(stage) {
    var getTime = Timer.findOne({userId: Meteor.userId(), stage: stage}) || {time: -1};
    var startTime = getTime.time;
    var endTime = Date.now();
    var range = (endTime - startTime)/1000;
    if (startTime == -1) {
        range = -1
    }
    console.log("timer - stage: " + stage + " time: " + range);
    Timer.update({_id: Timer.findOne({userId: Meteor.userId(), stage:stage})._id}, {$set: {time: range}});
}
·

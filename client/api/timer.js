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
        range = -1;
    }
    console.log("timer - stage: " + stage + " time: " + range);
    var timerId = Timer.findOne({userId: Meteor.userId(), stage:stage});
    if(timerId) {
        Timer.update({_id: timerId._id}, {$set: {time: range}});
    }
}

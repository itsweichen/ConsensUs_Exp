timerStart = function(stage) {
    Session.set("timer", Date.now());
}

timerEnd = function(stage) {
    var startTime = Session.get("timer");
    var endTime = Date.now();
    var range = (endTime - startTime)/1000;
    console.log("stage: " + stage + " time: " + range);
    Meteor.call('timer', Meteor.userId(), stage, range);
}

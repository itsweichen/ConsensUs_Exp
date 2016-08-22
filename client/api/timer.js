timerStart = function(stage) {
    Session.set("timer", Date.now());
    console.log("timer - stage: " + stage);
}

timerEnd = function(stage) {
    var startTime = Session.get("timer");
    var endTime = Date.now();
    var range = (endTime - startTime)/1000;
    console.log("timer - stage: " + stage + " time: " + range);
    Meteor.call('timer', Meteor.userId(), stage, range);
}

function startIndiTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            $('#time').css("color", "red");
            clearInterval(countdown);
        }
    }, 1000);
}

Template.individualPage.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    loggedIn: function() {
        return !!Meteor.user(); // **
    },
    ord1: function() {
        var ord = FlowRouter.getQueryParam("order");
        return ord == "1";
    }
});


Template.individualPage.events({
    'click #btn-next': (event) => {

        // check scores
        for (var i = 1; i < 4; i++) {
            if (scores[0][i] == -1) {
                alert("Please give score to each candidate regarding each criterion before submit.");
                return;
            }
        }

        // save scores
        const FLAG = 1;
        var order = FlowRouter.getQueryParam("order");

        Scores.insert({userId:  Meteor.userId(), score: scores, order: order });

        // save Arguments
        //var argu = $('textarea#arguments').val();
        //console.log("argu: " + argu);
        //Arguments.insert({userId: userId, arguments: argu});

        if (order == "1") {
            timerEnd(1);
        } else {
            //timerEnd(4);
        }
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order='+order);
    }
});


Template.individualPage.onRendered(function() {
    var order = FlowRouter.getQueryParam("order");

    if (order == "1") {
        Session.set('hideEndTour', hideEndTour);
        individualTour.init();
        individualTour.start(true);

        // var time = 60 * 10,
        //     display = document.querySelector('#time');
        // startIndiTimer(time, display);
    }

});

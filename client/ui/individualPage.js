function shuffle(array) {
    // credits to http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array;
}

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
    },
    info_url: function() {
        var urls = new Array(6);
        urls[0] = "https://docs.google.com/spreadsheets/d/1Is_kRroJXgTj9ZseQ9sfw44Crh7FfSTaqgj7Sbd7b1k/edit?usp=sharing";
        urls[1] = "https://docs.google.com/spreadsheets/d/1ijPtrQiyFO9L6TxoL2tL-UpoX0EPOzKjoisKm6NoO6Q/edit?usp=sharing";
        urls[2] = "https://docs.google.com/spreadsheets/d/1Pj1W9RGk0BgqyxTtVn-qjMu0GXvE9mTJT6dAS-r3pIs/edit?usp=sharing";
        urls[3] = "https://docs.google.com/spreadsheets/d/1X8dYwE2eX-FU0CMH5AgPAoYXgDOuHyyrkAYBsqFBX44/edit?usp=sharing";
        urls[4] = "https://docs.google.com/spreadsheets/d/1dsyL5JzRIcoC02BXGgOHrjSya65zBpXwCCDaWNARCtI/edit?usp=sharing";
        urls[5] = "https://docs.google.com/spreadsheets/d/1_6EZsLCbNCX5DOU_WyEBwq3OTOGVQnUeaf-S9pxUQkQ/edit?usp=sharing";
        shuffle(urls);
        return urls[0];
    }
});


Template.individualPage.events({
    'click #btn-next': (event) => {

        // check scores
        if (!devMode) {
            for (var i = 1; i < 4; i++) {
                if (scores[0][i] == -1) {
                    alert("Please give score to each candidate regarding each criterion before submit.");
                    return;
                }
            }
        }


        // save scores
        const FLAG = 1;
        var order = FlowRouter.getQueryParam("order");

        Scores.insert({userId:  Meteor.userId(), score: scores, order: order });


        // **************
        // random select voters

        var voters = [];
        const VOTER_NUM = 6;
        for (var i = 1; i < 3; i++) {
            var potentialVoters = Voters.find({flag:i}).fetch();
            shuffle(potentialVoters);
            voters = voters.concat(potentialVoters.slice(0, VOTER_NUM/2));
        }

        shuffle(voters);
        for (var i = 0; i < voters.length; i++) {
            voters[i] = voters[i].name;
        }

        Meteor.users.update(
            {_id: Meteor.userId()},
            {$set:
                {
                    "profile.voters": voters,
                }
            }
        );


        // **************

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

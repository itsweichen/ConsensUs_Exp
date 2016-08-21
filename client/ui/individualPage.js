Template.individualPage.helpers({
    authInProcess: function() {
        console.log(Scores.find().fetch());
        return Meteor.loggingIn();
    },
    loggedIn: function() {
        return !!Meteor.user(); // **
    }
});


Template.individualPage.events({
    'click #btn-next': (event) => {
        console.log("Next Button clicked.");
        console.log(scores);

        // save scores
        const FLAG = 1;
        var order = FlowRouter.getQueryParam("order");
        console.log(order);

        Scores.insert({userId:  Meteor.userId(), score: scores, order: order });

        // save Arguments
        //var argu = $('textarea#arguments').val();
        //console.log("argu: " + argu);
        //Arguments.insert({userId: userId, arguments: argu});

        timerEnd(1);
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order='+order);
    }
});

Template.individualPage.onRendered(function() {
    // Set up tour
    $('body').pagewalkthrough({
        name: 'individualPageIntro',
        steps: [{
            popup: {
                content: "First, you need to read through the candidate's information and give your own evaluation scores.",
                type: 'modal'
            }
        }, {
            wrapper: '#click-info',
            popup: {
                content: "Click here to open candidates' document",
                type: 'tooltip',
                position: 'bottom'
            }
        }, {
            wrapper: '#legend',
            popup: {
                content: "Each color represents a candidate",
                type: 'tooltip',
                position: 'bottom'
            }
        }, {
            wrapper: '#a1',
            popup: {
                content: "Click and drag these colored circles onto the line to rate them according to the criteria. (The leftmost side is for 'not suitable' while the rightmost side is for 'suitable')",
                type: 'tooltip',
                position: 'bottom'
            }
        }, {
            wrapper: '#a0',
            popup: {
                content: "The overall bar will automatically calculate the average scores for each candidate",
                type: 'tooltip',
                position: 'bottom'
            }
        }, {
            wrapper: '#btn-next',
            popup: {
                content: "Click next after you finish the task",
                type: 'tooltip',
                position: 'top'
            }
        }],
        buttons: {
            // ID of the button
            jpwClose: {
                // Translation string for the button
                i18n: 'Click here to close',
                // Whether or not to show the button.  Can be a boolean value, or a
                // function which returns a boolean value
                show: false
            }
        }
    });



    // Show the tour
    $('body').pagewalkthrough('show');

});

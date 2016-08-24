Template.individualPage.helpers({
    authInProcess: function() {
        console.log(Scores.find().fetch());
        return Meteor.loggingIn();
    },
    loggedIn: function() {
        return !!Meteor.user(); // **
    },
    ord1: function() {
        var ord = FlowRouter.getQueryParam("order");
        console.log(ord);
        return ord == "1";
    }
});


Template.individualPage.events({
    'click #btn-next': (event) => {
        console.log("Next Button clicked.");

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
            timerEnd(4);
        }
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order='+order);
    }
});

tour = new Tour({
  steps: [
  {
    element: "#a3",
    title: "Title of my step",
    content: "Content of my step",
    placement: 'bottom'
}],
template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>\
<div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« Prev</button><span data-role='separator'>|</span><button class='btn btn-default' data-role='next'>Next »</button></div></div>"
});

Template.individualPage.onRendered(function() {

    var order = FlowRouter.getQueryParam("order");
    // Instance the tour


// Initialize the tour
tour.init();

// Start the tour
tour.start();
});


    //
    //     $('body').pagewalkthrough({
    //         name: 'individualPageIntro',
    //         steps: [{
    //             wrapper: '#click-info',
    //             popup: {
    //                 content: "",
    //                 type: 'tooltip',
    //                 position: 'bottom',
    //                 overlayWidth: 110,
    //                 overlayHeight: 60,
    //                 offsetHorizontal: -20
    //             }
    //         }, {
    //             wrapper: '#legend',
    //             popup: {
    //                 content: "Each color represents a candidate",
    //                 type: 'tooltip',
    //                 position: 'bottom',
    //                 offsetVertical: 10,
    //                 overlayWidth: 100,
    //                 overlayHeight: 80
    //             }
    //         }, {
    //             wrapper: '#a1',
    //             popup: {
    //                 content: "Click and drag these colored dots onto the line to rate them according to the criteria. (The leftmost side is for 'not suitable' while the rightmost side is for 'suitable').",
    //                 type: 'tooltip',
    //                 position: 'bottom',
    //                 overlayWidth: 600,
    //                 overlayHeight: 100,
    //                 offsetHorizontal: 100
    //             }
    //         }, {
    //             wrapper: '#a0',
    //             popup: {
    //                 content: "The overall bar will automatically calculate the average scores for each candidate.",
    //                 type: 'tooltip',
    //                 position: 'bottom',
    //                 overlayWidth: 600,
    //                 overlayHeight: 100,
    //                 offsetHorizontal: 50
    //             }
    //         }, {
    //             wrapper: '#checkbox_panel',
    //             popup: {
    //                 content: "Check 'Scale' if you want to see a more quantified view on the line.",
    //                 type: 'tooltip',
    //                 position: 'bottom',
    //                 overlayWidth: 80,
    //                 overlayHeight: 60,
    //             }
    //         }, {
    //             wrapper: '#btn-next',
    //             popup: {
    //                 content: "Click 'next' button after you finish the task",
    //                 type: 'tooltip',
    //                 position: 'top',
    //                 overlayWidth: 160,
    //                 overlayHeight: 80
    //             }
    //         }],
    //         buttons: {
    //             // ID of the button
    //             jpwClose: {
    //                 // Translation string for the button
    //                 i18n: 'Click here to close',
    //                 // Whether or not to show the button.  Can be a boolean value, or a
    //                 // function which returns a boolean value
    //                 show: showCloseWalkthrough
    //             }
    //         }
    //     });
    //     $('body').pagewalkthrough('show');
    // } else {
    //     $('body').pagewalkthrough({
    //         name: 'individualPageIntro',
    //         steps: [{
    //             popup: {
    //                 content: "Here are your original scores before seeing others’ opinions.",
    //                 type: 'modal'
    //             }
    //         }, {
    //             popup: {
    //                 content: "Please make changes to your scores if you have different opinions now.",
    //                 type: 'modal'
    //             }
    //         }],
    //         buttons: {
    //             // ID of the button
    //             jpwClose: {
    //                 // Translation string for the button
    //                 i18n: 'Click here to close',
    //                 // Whether or not to show the button.  Can be a boolean value, or a
    //                 // function which returns a boolean value
    //                 show: showCloseWalkthrough
    //             }
    //         }
    //     });
        // $('body').pagewalkthrough('show');

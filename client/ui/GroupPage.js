Template.GroupPage.onRendered(function() {
});



Template.GroupPageBothConflicts.onRendered(function() {
    var type = FlowRouter.getQueryParam("type");

    if (type == "1") {
        console.log("groupVisTour should start.");
        Session.set('hideEndTour', hideEndTour);
        groupVisTour.init();
        groupVisTour.start(true);

        // $('body').pagewalkthrough({
        //     name: 'groupPageIntro',
        //     steps: [{
        //         popup: {
        //             content: "In this page, you will see an aggregation of every committee member's scores and reasons.",
        //             type: 'modal'
        //         }
        //     }, {
        //         wrapper: '#div-vis',
        //         popup: {
        //             content: "The big dots represent the average scores across your committee, while the small dots represent your scores.",
        //             type: 'tooltip',
        //             position: 'bottom'
        //         }
        //     }, {
        //         wrapper: '#a23 .large_dot',
        //         popup: {
        //             content: "When you hover on the big dots, the red horizontal line above the dot represent the conflict among committee. A longer line means there is a bigger conflict.",
        //             type: 'tooltip',
        //             position: 'top',
        //             overlayWidth: 70,
        //             overlayHeight: 70,
        //             offsetVertical: -30,
        //             offsetHorizontal: 20
        //         },
        //         onEnter: function() {
        //             $('#a23 .large_dot').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             $('#a23 .large_dot').triggerSVGEvent('mouseout');
        //         }
        //     }, {
        //         wrapper: '#a33 .small_dot',
        //         popup: {
        //             content: "When you hover on the small dots, the red line indicates the conflict between the committee and you.",
        //             type: 'tooltip',
        //             position: 'top',
        //             offsetVertical: -40,
        //             offsetHorizontal: 20
        //         },
        //         onEnter: function() {
        //             $('#a33 .small_dot').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             $('#a33 .small_dot').triggerSVGEvent('mouseout');
        //         }
        //     }, {
        //         wrapper: '.side_panel',
        //         popup: {
        //             content: "You can uncheck the candidate here to hide the related dots if you want to see a cleaner comparison.",
        //             type: 'tooltip',
        //             position: 'top',
        //             offsetVertical: -20
        //         },
        //         onEnter: function() {
        //             $($('.side_panel input')[0]).triggerSVGEvent('mousedown');
        //         },
        //         onLeave: function() {
        //             // $($('.side_panel input')[0]).triggerSVGEvent('click');
        //         }
        //     }, {
        //         wrapper: '#a22 .large_dot',
        //         popup: {
        //             content: "You can click the dots to see every member's scores regarding to the specific candidate and criterion.",
        //             type: 'tooltip',
        //             position: 'top',
        //             overlayWidth: 80,
        //             overlayHeight: 50,
        //             offsetVertical: -30,
        //             offsetHorizontal: 30
        //         },
        //         onEnter: function() {
        //             // $('#a22 .large_dot').triggerSVGEvent('click');
        //         },
        //         onLeave: function() {
        //             $('#a22 .large_dot').triggerSVGEvent('click');
        //             // $('#r1 text').triggerSVGEvent('click');
        //         }
        //     }, {
        //         wrapper: '#a2',
        //         popup: {
        //             content: "Hovering on a dot shows the name of the member who gave the score.",
        //             type: 'tooltip',
        //             position: 'top',
        //             overlayWidth: 600,
        //             overlayHeight: 100,
        //             offsetHorizontal: 100,
        //             offsetVertical: -50
        //         },
        //         onEnter: function() {
        //             // $('#a221').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             $('#r1 text').triggerSVGEvent('mousedown');
        //         }
        //     }, {
        //         wrapper: '#left_side_panel',
        //         popup: {
        //             content: "This is a list of names of your committee. ",
        //             type: 'tooltip',
        //             position: 'top',
        //             overlayWidth: 180
        //         },
        //         onEnter: function() {
        //             // $('#a221').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             // $('#r1 text').triggerSVGEvent('mousedown');
        //         }
        //     }, {
        //         wrapper: '#left_side_panel',
        //         popup: {
        //             content: "You can hover on their names to see their individual scores.",
        //             type: 'tooltip',
        //             position: 'top',
        //             overlayWidth: 180
        //         },
        //         onEnter: function() {
        //             $('#v2 text').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             // $('#r1 text').triggerSVGEvent('mousedown');
        //         }
        //     }, {
        //         wrapper: '#argument_div',
        //         popup: {
        //             content: "Here is the member's arguments showing the rationales for the scores.",
        //             type: 'tooltip',
        //             position: 'top'
        //         },
        //         onEnter: function() {
        //             // $('#v2').triggerSVGEvent('mouseover');
        //         },
        //         onLeave: function() {
        //             $('#v2 text').triggerSVGEvent('mouseout');
        //         }
        //     }, {
        //         popup: {
        //             content: "Please explore the visualization and answer the questions below.",
        //             type: 'modal'
        //         }
        //     }],
        //     buttons: {
        //         // ID of the button
        //         jpwClose: {
        //             // Translation string for the button
        //             i18n: 'Click here to close',
        //             // Whether or not to show the button.  Can be a boolean value, or a
        //             // function which returns a boolean value
        //             show: showCloseWalkthrough
        //         }
        //     }
        // });
 //       $('body').pagewalkthrough('show');
    }

});

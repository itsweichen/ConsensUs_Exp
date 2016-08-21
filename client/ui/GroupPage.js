Template.GroupPage.onRendered(function() {
    // Set up tour
    $('body').pagewalkthrough({
        name: 'groupPageIntro',
        steps: [{
            popup: {
                content: "In this page, you will see an aggregation of every committee member's scores and reasons.",
                type: 'modal'
            }
        }, {
            wrapper: '#div-vis',
            popup: {
                content: "This is the visualization that you can explore your committee's scores",
                type: 'tooltip',
                position: 'top'
            }
        }, {
            popup: {
                content: "As committee chair, please look over their scores and reasons. Your job is to take into account the perspective of the committee and integrate everyone’s reasoning to come to the best decision possible. ",
                type: 'modal'
            }
        }]
    });

    // Show the tour
    $('body').pagewalkthrough('show');

});



Template.GroupPageBothConflicts.onRendered(function() {
    // Set up tour
    $('body').pagewalkthrough({
        name: 'groupPageIntro',
        steps: [{
            popup: {
                content: "In this page, you will see an aggregation of every committee member's scores and reasons.",
                type: 'modal'
            }
        }, {
            wrapper: '#div-vis',
            popup: {
                content: "The big dots represent the average scores across your committee, while the small dots represent your socres.",
                type: 'tooltip',
                position: 'top'
            }
        }, {
            wrapper: '#a13 .large_dot',
            popup: {
                content: "When you hover on the big dots, the red horizontal line above the dot represent the conflict among committee. A longer line means there is a bigger conflict.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                $('#a13 .large_dot').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                $('#a13 .large_dot').triggerSVGEvent('mouseout');
            }
        }, {
            wrapper: '#a33 .small_dot',
            popup: {
                content: "When you hover on the small dots, the red line indicates the conflict between the committee and you.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                $('#a33 .small_dot').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                $('#a33 .small_dot').triggerSVGEvent('mouseout');
            }
        }, {
            wrapper: '.side_panel',
            popup: {
                content: "You can uncheck the candidate here to hide the related dots if you want to see a cleaner comparison.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                $($('.side_panel input')[0]).triggerSVGEvent('mousedown');
            },
            onLeave: function() {
                // $($('.side_panel input')[0]).triggerSVGEvent('click');
            }
        }, {
            wrapper: '#a22 .large_dot',
            popup: {
                content: "You can click the dots to see every member's scores regarding to the specific candidate and criterion.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                // $('#a22 .large_dot').triggerSVGEvent('click');
            },
            onLeave: function() {
                $('#a22 .large_dot').triggerSVGEvent('click');
                // $('#r1 text').triggerSVGEvent('click');
            }
        }, {
            wrapper: '#a2',
            popup: {
                content: "Hovering on a dot shows the name of the member who gave the score.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                $('#a221').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                $('#r1 text').triggerSVGEvent('mousedown');
            }
        }, {
            wrapper: '#left_side_panel',
            popup: {
                content: "This is a list of names of your committee. ",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                // $('#a221').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                // $('#r1 text').triggerSVGEvent('mousedown');
            }
        }, {
            wrapper: '#left_side_panel',
            popup: {
                content: "You can hover on their names to see their individual scores.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                $('#v2 text').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                // $('#r1 text').triggerSVGEvent('mousedown');
            }
        }, {
            wrapper: '#argument_div',
            popup: {
                content: "Here is the member's arguments showing the rationales for the scores.",
                type: 'tooltip',
                position: 'top'
            },
            onEnter: function() {
                // $('#v2').triggerSVGEvent('mouseover');
            },
            onLeave: function() {
                $('#v2 text').triggerSVGEvent('mouseout');
            }
        }, {
            popup: {
                content: "Please explore the visualization and answer the questions below.",
                type: 'modal'
            }
        }]
    });

    var type = FlowRouter.getQueryParam("type");

    if (type == "1") {
        console.log("show body");
        $('body').pagewalkthrough('show');
    }
    else {
        console.log("h3");

        $('h3').pagewalkthrough('show');
    }


});

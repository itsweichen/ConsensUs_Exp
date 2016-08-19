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

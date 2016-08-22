Template.NonVis.onRendered(function() {
    var type = FlowRouter.getQueryParam("type");

    if (type == "1") {
        $('body').pagewalkthrough({
            name: 'groupPageIntro',
            steps: [{
                popup: {
                    content: "In this page, you will see an aggregation of every committee member's scores and reasons.",
                    type: 'modal'
                }
            }, {
                wrapper: '#overall-table',
                popup: {
                    content: "This table shows the average scores across your committee member.",
                    type: 'tooltip',
                    position: 'bottom'
                }
            }, {
                wrapper: '.side_panel',
                popup: {
                    content: "This is a list of names of your committee. ",
                    type: 'tooltip',
                    position: 'top',
                    overlayWidth: 180
                }
            }, {
                wrapper: '.side_panel',
                popup: {
                    content: "You can hover on their names to see their individual scores.",
                    type: 'tooltip',
                    position: 'top',
                    overlayWidth: 180
                },
                onEnter: function() {
                    $('#v2 text').triggerSVGEvent('mouseover');
                },
                onLeave: function() {
                    // $('#r1 text').triggerSVGEvent('mousedown');
                }
            }, {
                wrapper: '.argument_panel',
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
                    content: "Please explore the table and answer the questions below.",
                    type: 'modal'
                }
            }],
            buttons: {
                // ID of the button
                jpwClose: {
                    // Translation string for the button
                    i18n: 'Click here to close',
                    // Whether or not to show the button.  Can be a boolean value, or a
                    // function which returns a boolean value
                    show: showCloseWalkthrough
                }
            }
        });
        $('body').pagewalkthrough('show');
    }

});

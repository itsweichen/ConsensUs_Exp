var tourTemplate = "<div class='popover tour-tour tour-tour-3 fade top in'>\
  <div class='arrow'></div>\
  <h3 class='popover-title'></h3>\
  <div class='popover-content'></div>\
  <div class='popover-navigation'>\
      <div class='btn-group'>\
          <button class='btn btn-sm btn-default' data-role='prev'>« Prev</button>\
          <button class='btn btn-sm btn-default' data-role='next'>Next »</button>\
      </div>\
      <button class='btn btn-default btn-sm display-none' id='tour-end' data-role='end'>End tour</button>\
  </div>\
</div>";

individualTour = new Tour({
    steps: [
        {
            element: "#click-info",
            title: "Step 1 (1/3)",
            content: "Click here to read the candidates' information.",
            placement: 'bottom'
        }, {
            element: "#a12",
            title: "Step 2 (2/3)",
            content: "Click and drag these colored dots onto the left line (for each criterion) to rate each candidate.",
            placement: 'bottom'
        }, {
            element: "#checkbox_panel",
            title: "Tip (3/3)",
            content: "Check 'Scale' if you want to see a more quantified view on the line.",
            placement: 'bottom',
            onShown: function(tour) {
                $("#tour-end").removeClass("display-none");
            }
        }
    ],
    template: tourTemplate,
    onShown: function() {
        if (!Session.get("hideEndTour")) {
            $("#tour-end").removeClass("display-none");
        }
    }
});

groupVisTour = new Tour({
    steps: [
        {
            element: "#main_panel",
            title: "Overview (1/6)",
            content: "In this page, you will see an aggregation of every committee member's scores.",
            placement: "top"
        }, {
            element: "#a12",
            title: "Dots (2/6)",
            content: "Big dots: Average scores across the committee. || Small dots: Your scores.",
            placement: 'bottom'
        }, {
            element: "#a12 .large_dot",
            title: "Hovering on BIG dots (3/6)",
            content: "Red horizontal line (on hover): <b>disagreement within the committee</b>. (A longer line means there is a bigger disagreement.)",
            placement: 'bottom',
            onShown: function(tour) {
                $('#a12 .large_dot').triggerSVGEvent('mouseover');
            },
            onHidden: function(tour) {
                $('#a12 .large_dot').triggerSVGEvent('mouseout');
            }
        }, {
            element: "#a12 .small_dot",
            title: "Hovering on SMALL dots (4/6)",
            content: "Red line: <b>disagreement between the committee and you</b>.",
            placement: 'top',
            onShown: function(tour) {
                $('#a12 .small_dot').triggerSVGEvent('mouseover');
            },
            onHidden: function(tour) {
                $('#a12 .small_dot').triggerSVGEvent('mouseout');
            }
        }, {
            element: "#a22 .large_dot",
            title: "Click on the dots(4/6)",
            content: "Please click the blue big dot.",
            placement: 'top',
            onShow: function(tour) {
                $('#a22 .large_dot').addClass("tour-step-element-reflex");
            },
            onHidden: function(tour) {
                $('#a22 .large_dot').triggerSVGEvent('click');
            },
            reflex: true
        }, {
            element: "#a2",
            title: "Every member's score (4/6)",
            content: "This is <b>everyone's score for Adam in Activites</b>. You can hover on the dots to see who gave the score.",
            placement: 'top',
            onHidden: function(tour) {
                if( $('#r1 text') !== undefined ) {
                    $('#r1 text').triggerSVGEvent('mousedown');
                }
            }
        }, {
            element: "#v2",
            title: "Hoving on the NAME (5/6)",
            content: "You'll see his/her scores on hovering.",
            placement: 'top',
            onShown: function(tour) {
                $('#v2').triggerSVGEvent('mouseover');
            },
            onHidden: function(tour) {
                $('#v2').triggerSVGEvent('mouseout');
            }
        }, {
            element: "#vis-example",
            title: "Next Step (6/6)",
            content: "Now, please spend 2 minutes to explore the visualization above and examples below.",
            placement: 'top',
            onShown: function(tour) {
                $("#tour-end").removeClass("display-none");
            }
        }
    ],
    template: tourTemplate,
    onShown: function() {
        if (!Session.get("hideEndTour")) {
            $("#tour-end").removeClass("display-none");
        }
    },
    storage: window.sessionStorage
});

questionTour = new Tour({
    steps: [
        {
            element: "#insertQuestionForm",
            title: "Task",
            content: "Please answer the questions using the result above.",
            placement: 'bottom'
        }
    ],
    template: tourTemplate,
    onShown: function() {
        if (!Session.get("hideEndTour")) {
            $("#tour-end").removeClass("display-none");
        }
    }
});

revoteTour = new Tour({
    steps: [
        {
            element: "#main_panel",
            title: "Step 1 (1/3)",
            content: "Explore the visualization.",
            placement: 'bottom'
        }, {
            element: "iframe",
            title: "Step 2 (2/3)",
            content: "Re-evalutate the three candidates from the perspective of the committee.",
            placement: 'bottom',
            onShown: function(tour) {
                $("#tour-end").removeClass("display-none");
            }
        }
    ],
    template: tourTemplate,
    onShown: function() {
        if (!Session.get("hideEndTour")) {
            $("#tour-end").removeClass("display-none");
        }
    }
});

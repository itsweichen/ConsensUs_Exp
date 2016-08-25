Template.GroupPageTemplate.helpers({
    taskId: function() {
        return FlowRouter.getParam("taskId");
    },
    cond1_2: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return (task.condition === 1) || (task.condition === 2);
    },
    cond5_6: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return (task.condition === 5) || (task.condition === 6);
    },
    cond3: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 3;
    },
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return task.condition === 4;
    },
    'type1': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '1';
    },
    'type0': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '0';
    },
});

Template.GroupPageTemplate.events({
    'click .submitArgu': function() {
        var argu = $('textarea').val();
        var numm = s.split(/[^\s]+/).length - 1;
        if (numm < 80) {
            $('.div-alert').html('<div class="alert alert-danger" role="alert">Your arguments should be at least 80 words.</div>');
            return;
        }
        var flag = $("#change-scores").val();
        console.log("flag " + flag);
        Arguments.insert({userId: Meteor.userId(), argu: argu, flag: flag});
        timerEnd(3);
        timerStart(4);
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order=2');
    },
    'keydown textarea': function(e) {
        s = e.target.value;
        var numm = s.split(/[^\s]+/).length - 1;
        $(".word_counter").html(numm);
    },
    'change #change-scores': function(e) {
        var value = $(e.target).val();
        if (value === "yes") {
            $("#argu-textarea-change").show()

        } else {
            $("#argu-textarea-change").hide()

        }
        if (value === "no") {
            $("#argu-textarea-convince").show()
        } else {
            $("#argu-textarea-convince").hide()
        }
    }

});

// Template.GroupPageTemplate.onRendered(function() {
//     this.autorun(function() {
//         var type = FlowRouter.getQueryParam("type");
//         if (type == "2") {
//             $('body').pagewalkthrough({
//                 name: 'groupPageIntro2',
//                 steps: [{
//                     popup: {
//                         content: "As committee chair, your job is to take into account the perspective of the committee and integrate everyone’s reasoning to come to the best decision possible.",
//                         type: 'modal'
//                     }
//                 }, {
//                     wrapper: '#argu-textarea',
//                     popup: {
//                         content: "In the textbox below, please write arguments for your decision, which will be sent to the committee. Provide as many details as possible so that your committee members will understand your reasoning.",
//                         type: 'tooltip',
//                         position: 'top'
//                     }
//                 }
//                 ]
//             });
//             $('body').pagewalkthrough('show');
//         };
//     });
// });

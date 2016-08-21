Template.GroupPageTemplate.helpers({
    cond1_2: function() {
        var taskId = FlowRouter.getParam("taskId");
        console.log(taskId);
        var task = Tasks.findOne({_id: taskId});
        return (task.condition === 1) || (task.condition === 2);
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
    'type': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '1';
    }
});

Template.GroupPageTemplate.events({
    'click #submitArgu': function() {
        var argu = $('textarea').val();
        Arguments.insert({userId: Meteor.userId(), argu: argu});
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/individual?order=2');
    }
});

Template.GroupPageTemplate.onRendered(function() {
    $('body').pagewalkthrough({
        name: 'groupPageIntro2',
        steps: [{
            popup: {
                content: "As committee chair, your job is to take into account the perspective of the committee and integrate everyone’s reasoning to come to the best decision possible. ",
                type: 'modal'
            }
        }, {
            wrapper: '#argu-textarea',
            popup: {
                content: "In the textbox below, please write arguments for your decision, which will be sent to the committee. Provide as many details as possible so that your colleagues will understand your reasoning.",
                type: 'tooltip',
                position: 'top'
            }
        }
        ]
    });
    $('body').pagewalkthrough('show');
});

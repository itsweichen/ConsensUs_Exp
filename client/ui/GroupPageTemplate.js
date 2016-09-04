Template.GroupPageTemplate.helpers({
    taskId: function() {
        return FlowRouter.getParam("taskId");
    },
    cond1_2: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return (task.condition === 1) || (task.condition === 2) || (task.condition === 4);
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
    'type1p5': () => {
        var type = FlowRouter.getQueryParam("type");
        return type === '1.5';
    },
});

Template.GroupPageTemplate.events({
    'click .submitArgu': function() {
        var argu1 = $('#argu-textarea-1 textarea').val();
        var argu2 = $('#argu-textarea-2 textarea').val();
        var argu1Len = argu1.split(/[^\s]+/).length - 1;
        // var argu2 = $('#argu-textarea-2 textarea').val();
        // var argu2Len = argu2.split(/[^\s]+/).length - 1;


        var g1 = $('#g1 input[name="g1"]:checked').val();
        var g2 = $('#g2 input[name="g2"]:checked').val();
        var g3 = $('#g3 input[name="g3"]:checked').val();

        if (argu1Len < 30 || g1 === undefined || g2 === undefined || g3 === undefined /*|| argu2Len < 30*/) {
            $('.div-alert').html('<div class="alert alert-danger" role="alert">Your arguments should be at least 30 words for each question.</div>');
            return;
        }
        timerEnd(3);
        Arguments.insert({userId: Meteor.userId(), argu1: argu1, argu2: argu2});
        Scores.insert({userId:  Meteor.userId(), score: document.getElementById('indi2').contentWindow.scores, order: "2" });

        Subjective.update({_id: Subjective.findOne({userId: Meteor.userId()})._id}, {$set: {g1: g1, g2: g2, g3: g3}});

        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order=2');
    },
    'keydown #argu1': function(e) {
        s = e.target.value;
        var numm = s.split(/[^\s]+/).length - 1;
        //if (e.target.name === "argu1") {
        $("#argu-textarea-1 .word_counter").html(numm);
        //} else {
        //    $("#argu-textarea-2 .word_counter").html(numm);
        //}

    }

});

Template.GroupPageTemplate.onRendered(function() {
    var type = FlowRouter.getQueryParam("type");


    if (type === "2") {
        Session.set('hideEndTour', hideEndTour);
        revoteTour.init();
        revoteTour.start(true);
    }
});

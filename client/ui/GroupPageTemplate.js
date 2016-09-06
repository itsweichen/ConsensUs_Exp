Template.GroupPageTemplate.helpers({
    taskId: function() {
        return FlowRouter.getParam("taskId");
    },
    cond1_2: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        var type = type = FlowRouter.getQueryParam("type");
        return (task.condition === 1) || (task.condition === 2) || (task.condition === 4) || (type === "s");
    },
    cond5_6: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        return (task.condition === 5) || (task.condition === 6);
    },
    cond3: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        var type = FlowRouter.getQueryParam("type");
        return task.condition === 3 && type !== "s";
    },
    cond4: function() {
        var taskId = FlowRouter.getParam("taskId");
        var task = Tasks.findOne({_id: taskId});
        var type = FlowRouter.getQueryParam("type");
        return task.condition === 4 && type !== "s";
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

        var g1 = $('#g1 input[name="g1"]:checked').val();
        var g2 = $('#g2 input[name="g2"]:checked').val();
        var g3 = $('#g3 input[name="g3"]:checked').val();

        if (argu1Len < 30 || g1 === undefined || g2 === undefined || g3 === undefined /*|| argu2Len < 30*/) {
            $('.div-alert').html('<div class="alert alert-danger" role="alert">Your arguments should be at least 30 words for the reasons (first question).</div>');
            return;
        }

        $('#myModal').modal();
        var scores = document.getElementById('indi2').contentWindow.scores;
        var overall = scores[0].slice(1,4);
        var names = ["Sam", "Adam", "Jim"];
        var pair = {};
        for (var i = 0; i < 3; i++) {
            pair[names[i]] = overall[i];
        }
        var sortable = [];
        for (var name in pair)
              sortable.push([name, pair[name]]);

        sortable.sort(
            function(a, b) {
                return b[1] - a[1];
            }
        )

        overall.sort();
        var names_rank = new Array(3);
        for (var i = 0; i < 3; i++) {
            names_rank[i] = names[scores[0].indexOf(overall[2-i])];
        }

        $('#1').html("<b>" + sortable[0][0] + "</b>; overall score: " + sortable[0][1]);
        $('#2').html("<b>" + sortable[1][0] + "</b>; overall score: " + sortable[1][1]);
        $('#3').html("<b>" + sortable[2][0] + "</b>; overall score: " + sortable[2][1]);
    },
    'click #btn-confirm': (event) => {
        timerEnd(3);

        var argu1 = $('#argu-textarea-1 textarea').val();
        var argu2 = $('#argu-textarea-2 textarea').val();
        var g1 = $('#g1 input[name="g1"]:checked').val();
        var g2 = $('#g2 input[name="g2"]:checked').val();
        var g3 = $('#g3 input[name="g3"]:checked').val();
        
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

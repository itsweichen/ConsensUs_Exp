Template.SubjectiveQuestions.events({
    'submit form': function(e) {
        e.preventDefault();
        var q1 = $('#q1 input[name="q1"]:checked').val();
        var q2 = $('#q2 input[name="q2"]:checked').val();
        var q3 = $('#q3 input[name="q3"]:checked').val();
        var q4 = $('#q4 input[name="q4"]:checked').val();
        var q5 = $('#q5 input[name="q5"]:checked').val();
        var q1w = $('#q1 textarea[name="q1w"]').val();

        if (q1 === undefined || q2 == undefined || q3 == undefined || q4 == undefined || q5 == undefined || q1w == "") {
            alert("Please input your answers for all of the questions before submit.");
            return;
        }

        Subjective.insert({userId: Meteor.userId(), q1: q1, q2: q2, q3: q3, q4: q4, q5: q5, q1w: q1w});
        timerStart(3);
        $('body, html').animate({ scrollTop: $("#scroll-to").offset().top - 100 }, 800);
        $('#step').html("3/3");
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type='+2);
    }
});

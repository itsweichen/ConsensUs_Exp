Template.SubjectiveQuestions.events({
    'submit form': function(e) {
        e.preventDefault();
        var q1 = $('#q1 input[name="ability"]:checked').val();
        var q2 = $('#q2 input[name="ability"]:checked').val();
        var q3 = $('#q3 input[name="ability"]:checked').val();
        var q4 = $('#q4 input[name="ability"]:checked').val();
        var q5 = $('#q5 input[name="ability"]:checked').val();

        if (q1 === undefined || q2 == undefined || q3 == undefined || q4 == undefined || q5 == undefined) {
            alert("Please input your answers before submit.");
            return;
        }

        Subjective.insert({userId: Meteor.userId(), q1: q1, q2: q2, q3: q3, q4: q4, q5: q5});
        timerStart(3);
        $('body, html').animate({ scrollTop: 0 }, 800);
        FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type='+2);
    }
});

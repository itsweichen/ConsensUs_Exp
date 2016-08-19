Template.TaskInstructions.events({
    'submit form': function(e) {
        e.preventDefault();
        var taskId = FlowRouter.getParam("taskId");
        var username = $('#inputUsername').val();
        var nickname = $('#inputNickname').val();
        var password = "123456";
        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                taskId: taskId,
                nickname: nickname
            }
        }, function(error){
            if(error){
                var errorHTML = "<div class='alert alert-danger' role='alert'>"+error.reason+"</div>";
                console.log(errorHTML);
                $('.form-signin').prepend(errorHTML);
            } else {
                timerStart(1);
                FlowRouter.go('/'+taskId+'/individual?order=1'); // Redirect user if registration succeeds
            }
        });
    }
});

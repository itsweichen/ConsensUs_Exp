Template.TaskInstructions.events({
    'submit form': function(e) {
        e.preventDefault();
        var taskId = FlowRouter.getParam("taskId");
        var username = $('#inputUsername').val();
        var password = "123456";
        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                taskId: taskId
            }
        }, function(error){
            if(error){
                var errorHTML = "<div class='alert alert-danger' role='alert'>"+error.reason+"</div>";
                console.log(errorHTML);
                $('.form-signin').prepend(errorHTML);
            } else {
                FlowRouter.go('/'+taskId+'/individual'); // Redirect user if registration succeeds
            }
        });
    }
});

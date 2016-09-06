Template.UserSignIn.events({
    'submit form': function(event){
        event.preventDefault();
        var taskId = FlowRouter.getParam("taskId");
        var username = $('#inputUsername').val();
        var password = "123456";
        Meteor.loginWithPassword(username, password, function(error){
            if(error){
                var errorHTML = "<div class='alert alert-danger' role='alert'>"+error.reason+"</div>";
                console.log(errorHTML);
                $('.form-signin').prepend(errorHTML);
            }
            else{
                FlowRouter.go('/'+taskId+'/group?type=s');
            }
        });
    }
});

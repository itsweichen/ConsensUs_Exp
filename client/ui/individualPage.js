Template.individualPage.helpers({
    authInProcess: function() {
        console.log(Scores.find().fetch());
        return Meteor.loggingIn();
    },
    loggedIn: function() {
        return !!Meteor.user(); // **
    }
 });


Template.individualPage.events({
      'click #btn-next': (event) => {
          console.log("Next Button clicked.");
          console.log(scores);

          // save scores
          const FLAG = 1;
          Scores.insert({userId:  Meteor.userId(), score: scores, flag: FLAG });

          // save Arguments
          //var argu = $('textarea#arguments').val();
          //console.log("argu: " + argu);
          //Arguments.insert({userId: userId, arguments: argu});

          FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group');
      }
});
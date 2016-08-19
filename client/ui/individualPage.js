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
          var order = FlowRouter.getQueryParam("order");
          console.log(order);

          Scores.insert({userId:  Meteor.userId(), score: scores, order: order });

          // save Arguments
          //var argu = $('textarea#arguments').val();
          //console.log("argu: " + argu);
          //Arguments.insert({userId: userId, arguments: argu});

          timerEnd(1);
          FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/confidence?order='+order);
      }
});

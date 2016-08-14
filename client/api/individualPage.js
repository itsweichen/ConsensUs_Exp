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
      'click #next-btn': (event) => {
          console.log("Next Button clicked.");
          console.log(scores);

          // save scores
          var userId = Meteor.userId();
          const FLAG = 1;
          for (var i = 0; i < scores.length; i++) {
              for (var j = 1; j < scores[i].length; j++) {
                  Scores.insert({userId: userId, criteriaId: i, candidateId: j, score: scores[i][j], flag: FLAG});
              }
          }

          // save Arguments
          var argu = $('textarea#arguments').val();
          console.log("argu: " + argu);
          Arguments.insert({userId: userId, arguments: argu});

          
      }
  });

Template.Questions.helpers({
    voterOptions: () => {
        // TODO: according to specific tasks
        var voters = Meteor.user().profile.voters;
        var chair = Meteor.user().profile.nickname;
        var options = [];
        var count = 1;
        options.push({label: chair, value: 1})
        voters.forEach(function(item) {
            count = count + 1;
            options.push({label: item, value: count})
        });
        return options;
    },
    ccOptions: () => {
        return [
          {
            optgroup: "Academic",
            options: [
              {label: "Academic, Sam", value: "11"},
              {label: "Academic, Adam", value: "12"},
              {label: "Academic, Jim", value: "13"}
            ]
          },
          {
            optgroup: "Activities",
            options: [
              {label: "Activities, Sam", value: "21"},
              {label: "Activities, Adam", value: "22"},
              {label: "Activities, Jim", value: "23"}
            ]
          },
          {
            optgroup: "Recommendation Letter",
            options: [
              {label: "Recommendation, Sam", value: "31"},
              {label: "Recommendation, Adam", value: "32"},
              {label: "Recommendation, Jim", value: "33"}
            ]
          },
          {
            optgroup: "Readiness for Engineering",
            options: [
              {label: "Readiness, Sam", value: "41"},
              {label: "Readiness, Adam", value: "42"},
              {label: "Readiness, Jim", value: "43"}
            ]
          }
        ];
    }
});

AutoForm.hooks({
  insertQuestionForm: {
      onSubmit: function(insertDoc, updateDoc, currentDoc) {
          console.log("onsubmit");
          console.log(insertDoc);
      },
      onSuccess: function (insertDoc, updateDoc, currentDoc) {
          timerEnd(2);
          $('body, html').animate({ scrollTop: 0 }, 800);
          FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type='+1.5);
        }
  }
});

Template.Questions.onRendered(function() {
    console.log("question");
    Session.set('hideEndTour', hideEndTour);
    questionTour.init();
    questionTour.start(true);
    // Session.set('hideEndTour', hideEndTour);
    // groupVisTour.init();
    // groupVisTour.start(true);
})

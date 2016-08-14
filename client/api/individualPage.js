Template.individualPage.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  loggedIn: function() {
    return !!Meteor.user(); // **
  }
});

AutoForm.hooks({
  insertQuestionForm: {
      onSubmit: function(insertDoc, updateDoc, currentDoc) {
          console.log("onsubmit");
          console.log(insertDoc);
      },
      onSuccess: function (insertDoc, updateDoc, currentDoc) {
          FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type='+2);
        }
  }
});

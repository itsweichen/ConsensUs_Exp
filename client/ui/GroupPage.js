Template.GroupPage.onRendered(function() {
});



Template.GroupPageBothConflicts.onRendered(function() {
    var type = FlowRouter.getQueryParam("type");

    if (type == "0") {
        Session.set('hideEndTour', hideEndTour);
        groupVisTour.init();
        groupVisTour.start(true);
    }

});

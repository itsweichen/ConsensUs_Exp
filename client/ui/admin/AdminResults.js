Template.AdminResults.helpers({
    users: function() {
        return Meteor.users.find();
    },
    Scores: function() {
        return Scores;
    }
});

Template.ResultRow.helpers({
    scores: function(_id) {
        var scores = Scores.findOne({userId: _id}).score;
    }
});

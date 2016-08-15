Template.Admin.helpers({
    tasks: () => {
        return Tasks.find();
    },
    voters: () => {
        return Voters.find();
    },
    voterOptions: () => {
        var voters = Voters.find({});
        var options = [];
        voters.forEach(function(item) {
            options.push({label: item.name, value: item.name})
        });
        return options;
    }
});

Template.Admin.events({
    'click .glyphicon-pencil': function() {
        Session.set('editVoter', !Session.get('editVoter'));
    },
    'click .glyphicon-trash': function() {
        Voters.remove(this._id);
    },
});

Template.Admin.onRendered(function() {
    var plusBtn= document.getElementsByClassName('glyphicon glyphicon-plus');
    const CRITERIA_NUM = 4;
    for (var i = 0; i < CRITERIA_NUM; i++) {
        for (var j = 0; j < plusBtn.length; j++){
            plusBtn[j].click();
        }
    }
});

Template.CreatedVoters.helpers({
    updateVotersId: function() {
        return this._id;
    }
});


Template.AdminVoters.events({
    'click .glyphicon-pencil': function() {
        Session.set('editVoter', !Session.get('editVoter'));
    },
    'click .glyphicon-trash': function() {
        Voters.remove(this._id);
    },
    'click .cal-avg': function(e) {
        var ul = $(e.target).parent().parent(); // ul.list-group
        var inputEles = ul.find("input.form-control");

        var total = 0.0;
        for (var i = 1; i < inputEles.length; i++) {
            total += parseFloat(inputEles[i].value);
        }
        var avg = total / (inputEles.length - 1);
        $(inputEles[0]).val(avg);
    }
});


Template.AdminVoters.onRendered(function() {
    // auto clicking
    var plusBtn= document.getElementsByClassName('glyphicon glyphicon-plus');
    const CRITERIA_NUM = 4;
    for (var i = 0; i < CRITERIA_NUM; i++) {
        for (var j = 0; j < plusBtn.length; j++){
            plusBtn[j].click();
        }
    }
    // add compute buttons
    var listGroup = $('ul.list-group');
    for (var i = 0 ; i < listGroup.length; i++) {
        $(listGroup[i]).append('<li class="list-group-item"><button type="button" class="btn btn-primary cal-avg"><span class="glyphicon glyphicon-phone"></span></button></li>');
    }
});

Template.CreatedVoters.helpers({
    updateVotersId: function() {
        return this._id;
    }
});

Template.Admin.helpers({
    results: function () {
        return Results.find();
    }
});

Template.Admin.events({
    'click #get-result': function(e) {
        var chairs = Meteor.users.find({'username': {$ne : "weichen"}});
        var mturk_id, name, taskId, voterNum, biasedType, confi_1, confi_2, will_1, will_2, score_1, score_2, argu;
        chairs.forEach(function(chair) {
            id = chair._id;
            mturk_id = chair.username;
            name = chair.profile.nickname;
            taskId = chair.profile.taskId;
            var task = Tasks.findOne({_id: taskId});
            voterNum = task.voterNum;
            biasedType = task.biasedType;
            var confidence_1 = Confidence.findOne({userId: id, order: "1"});
            confi_1 = confidence_1.confidence;
            will_1 = confidence_1.willingness;
            var confidence_2 = Confidence.findOne({userId: id, order: "2"});
            confi_2 = confidence_1.confidence;
            will_2 = confidence_1.willingness;
            score_1 = Scores.findOne({userId: id, order: "1"}).score;
            score_2 = Scores.findOne({userId: id, order: "2"}).score;
            argu = Arguments.findOne({userId: id}).argu;
            Results.insert({
                mturk_id: mturk_id,
                name: name,
                taskId: taskId,
                voterNum: voterNum,
                biasedType: biasedType,
                confi_1: confi_1,
                confi_2: confi_2,
                will_1: will_1,
                will_2: will_2,
                score_1: score_1,
                score_2: score_2,
                argu: argu
            });
        });
        $(e.target).hide();
    }
});

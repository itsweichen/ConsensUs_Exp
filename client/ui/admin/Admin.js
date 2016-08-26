Template.Admin.helpers({
    results: function () {
        return Results.find();
    }
});

Template.Admin.events({
    'click #get-result': function(e) {
        var chairs = Meteor.users.find({'username': {$ne : "weichen"}});
        var mturk_id, name, taskId, voterNum, biasedType, confi_1, confi_2, will_1, will_2, score_1, score_2, argu1, argu2;
        var time = new Array(4);
        var questions, questionsR, condition;
        chairs.forEach(function(chair) {
            id = chair._id;
            mturk_id = chair.username;
            if (Results.findOne({mturk_id: mturk_id})) {
                console.log(mturk_id + " already exists.");
                return;
            }
            name = chair.profile.nickname;
            taskId = chair.profile.taskId;
            var task = Tasks.findOne({_id: taskId});
            voterNum = task.voterNum;
            biasedType = task.biasedType;
            condition = task.condition;

            // confidence
            var confidence_1 = Confidence.findOne({userId: id, order: "1"}) || {confidence: -1, willingness: -1};
            confi_1 = confidence_1.confidence;
            will_1 = confidence_1.willingness;
            var confidence_2 = Confidence.findOne({userId: id, order: "2"}) || {confidence: -1, willingness: -1};
            confi_2 = confidence_1.confidence;
            will_2 = confidence_1.willingness;

            // score
            score_1 = Scores.findOne({userId: id, order: "1"}) || {score: -1};
            score_2 = Scores.findOne({userId: id, order: "2"}) || {score: -1};
            score_1 = score_1.score;
            score_2 = score_2.score;

            // argu
            argu = Arguments.findOne({userId: id}) || {argu1: "null", argu2: "null"};
            argu1 = argu.argu1;
            argu2 = argu.argu2;

            for (var i = 0; i < 3; i++){
                var tmp = Timer.findOne({userId: id, stage: i+1}) || {time: -1};
                time[i] = tmp.time;
            }

            questions = Questions.findOne({userId: id}) || {q: null};
            questions = JSON.stringify(questions);

            questionsR = QuestionsR.findOne({userId: id}) || {q:null};
            questionsR = JSON.stringify(questionsR);

            Results.insert({
                userId: id,
                mturk_id: mturk_id,
                name: name,
                taskId: taskId,
                condition: condition,
                voterNum: voterNum,
                biasedType: biasedType,
                confi_1: confi_1,
                confi_2: confi_2,
                will_1: will_1,
                will_2: will_2,
                score_1: score_1,
                score_2: score_2,
                argu1: argu1,
                argu2: argu2,
                time: time,
                questions: questions,
                questionsR: questionsR
            });
        });
        $(e.target).hide();
    }
});

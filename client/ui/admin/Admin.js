Template.Admin.helpers({
    results: function () {
        return Results.find();
    }
});

function checkAnswer(users, rightPool) {
    if (users === undefined || rightPool === undefined) {
        return null;
    }
    for (var i = 0; i < rightPool.length; i++) {
        if (users == rightPool[i]) {
            return true;
        }
    }
    return false;
}

function checkAnswerQ6(users, rightPool) {
    if (users === undefined || rightPool === undefined) {
        return null;
    }
    for (var i = 0; i < rightPool.length; i++) {
        if (users.join("") == rightPool[i]) {
            return true;
        }
    }
    return false;
}


Template.Admin.events({
    'click #get-result': function(e) {
        var chairs = Meteor.users.find({'username': {$ne : "weichen"}});
        var mturk_id, name, taskId, voterNum, biasedType, confi_1, confi_2, will_1, will_2, score_1, score_2, argu1;
        var subjective;
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
            confi_2 = confidence_2.confidence;
            will_2 = confidence_2.willingness;

            // subjective
            subjective = Subjective.findOne({userId: id}) || {sub: -1};
            subjective = JSON.stringify(subjective);

            // score
            score_1 = Scores.findOne({userId: id, order: "1"}) || {score: [[-1]]};
            score_2 = Scores.findOne({userId: id, order: "2"}) || {score: [[-1]]};
            score_1 = score_1.score;
            score_2 = score_2.score;

            var scoreDis = 0;
            for (var i = 0; i < score_1.length; i++) {
                for (var j = 0; j < score_2.length; j++) {
                    scoreDis += Math.abs(score_1[i][j] - score_2[i][j]);
                }
            }

            // argu
            argu = Arguments.findOne({userId: id}) || {argu1: "null"};
            argu1 = argu.argu1;

            for (var i = 0; i < 3; i++){
                var tmp = Timer.findOne({userId: id, stage: i+1}) || {time: -1};
                time[i] = tmp.time;
            }

            questions = Questions.findOne({userId: id}) || {q1: null};
            questionsR = QuestionsR.findOne({userId: id}) || {q1:null};

            questionCheck = new Array(8);

            if (questions.q1 !== null && questionsR.q1 !== null) {
                questionCheck[0] = checkAnswer(questions.q1, questionsR.q1);
                questionCheck[1] = checkAnswer(questions.q2, questionsR.q2);
                questionCheck[2] = checkAnswer(questions.q3, questionsR.q3);
                questionCheck[3] = checkAnswer(questions.q4, questionsR.q4);
                questionCheck[4] = checkAnswer(questions.q5, questionsR.q5);
                questionCheck[5] = checkAnswerQ6(questions.q6, questionsR.q6);
                questionCheck[6] = checkAnswer(questions.q7, questionsR.q7);
                questionCheck[7] = checkAnswer(questions.q8, questionsR.q8);
            }

            questions = JSON.stringify(questions);
            questionsR = JSON.stringify(questionsR);

            Results.insert({
                userId: id,
                mturk_id: mturk_id,
                name: name,
                votersConfig: JSON.stringify(chair.profile.votersConfig),
                taskId: taskId,
                condition: condition,
                voterNum: voterNum,
                biasedType: biasedType,
                confi_1: confi_1,
                confi_2: confi_2,
                will_1: will_1,
                will_2: will_2,
                scoreDis: scoreDis,
                score_1: score_1,
                score_2: score_2,
                argu1: argu1,
                time: time,
                questionCheck: questionCheck,
                questions: questions,
                questionsRight: questionsR,
                subjective: subjective
            });
        });
        $(e.target).hide();
    }
});

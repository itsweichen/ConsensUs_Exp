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
        var mturk_id, name, taskId, voterNum, biasedType, confi_1, confi_2, will_1, will_2, score_1, score_2, argu1, argu2;
        var subjective;
        var time = new Array(4);
        var questions, questionsR, condition;
        chairs.forEach(function(chair) {
            id = chair._id;
            var group = chair.profile.group || [[-1]];

            for (var i = 0; i < group.length; i++) {
                for (var j = 0; j < group[0].length; j++) {
                    group[i][j] = d3.round(group[i][j], 1);
                }
            }

            var url = chair.profile.url;
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
            var confidence_2 = Confidence.findOne({userId: id, order: "2"}) || {confidence: -1, willingness: -1};

            // subjective
            subjective = Subjective.findOne({userId: id}) || {sub: -1};

            // score
            score_1 = Scores.findOne({userId: id, order: "1"}) || {score: [[-1]]};
            score_2 = Scores.findOne({userId: id, order: "2"}) || {score: [[-1]]};
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

            questions = Questions.findOne({userId: id}) || {q1: null, q2w: "null"};
            questionsR = QuestionsR.findOne({userId: id}) || {q1:null};

            questionCheck = new Array(8);
            var que_q2w = questions.q2w || "null";

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

            var question_right_count = 0;
            for (var i = 0; i < 8; i++) {
                if (questionCheck[i]){
                    question_right_count += 1;
                }
            }

            Results.insert({
                userId: id,
                mturk_id: mturk_id,
                name: name,
                url: url,
                taskId: taskId,
                condition: condition,
                confi_1: confidence_1.confidence,
                confi_2: confidence_2.confidence,
                will_1: confidence_1.willingness,
                will_2: confidence_2.willingness,
                score_1: score_1,
                score_2: score_2,
                argu1: argu1,
                argu2: argu2,
                time: time,
                question_right_count: question_right_count,
                que_q2w: que_q2w,
                sub_q1: subjective.q1 || "null",
                sub_q2: subjective.q2 || "null",
                sub_q3: subjective.q3 || "null",
                sub_q4: subjective.q4 || "null",
                sub_q5: subjective.q5 || "null",
                sub_q1w: subjective.q1w || "null",
                sub_g1: subjective.g1 || "null",
                sub_g2: subjective.g2 || "null",
                sub_g3: subjective.g3 || "null",
                group: group,
                question_check: questionCheck,
                // for debugging
                // subjective: JSON.stringify(subjective),
                questions: JSON.stringify(questions) || "null",
                questionsRight: JSON.stringify(questionsR) || "null"
            });
        });
        $(e.target).hide();
    }
});

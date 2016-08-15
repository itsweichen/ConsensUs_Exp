Scores = new Mongo.Collection('Scores');
Arguments = new Mongo.Collection('Arguments');

Voters = new Mongo.Collection('Voters');
Tasks = new Mongo.Collection('Tasks');

Chairs = new Mongo.Collection('Chairs');

// CandidateScores = new SimpleSchema({
//     score: {
//         type: [Number],
//         label: "one candidate's scores",
//         decimal: true
//     }
// });

VotersSchema = new SimpleSchema({
    name: {
        type: String,
        label: "voter name"
    },
    // scores: {
    //     type: [CandidateScores],
    //     decimal: true
    // },

    // Assume the candidate num is 3
    scoresSam: {
        type: [Number],
        label: "Sam's score",
        decimal: true
    },
    scoresAdam: {
        type: [Number],
        label: "Adam's score",
        decimal: true
    },
    scoresJim: {
        type: [Number],
        label: "Jim's score",
        decimal: true
    },
    argu: {
        type: String,
        label: "argu"
    },
    flag: {
        type: Number,
        label: "flag"
    }
});

Voters.attachSchema(VotersSchema);

TasksSchema = new SimpleSchema({
    condition: {
        type: Number,
        autoform: {
            type: "select",
            options: function() {
                return [
                    {label: "1", value: 1},
                    {label: "2", value: 2},
                    {label: "3", value: 3},
                ]
            }
        }
    },
    candidateNum: {
        type: Number,
        defaultValue: 3,
        autoform: {
            type: "hidden"
        }
    },
    criteriaNum: {
        type: Number,
        defaultValue: 4,
        autoform: {
            type: "hidden"
        }
    },
    voterNum: {
        type: Number
    },
    voters: {
        type: [String]
    },
    biasedType: {
        type: String,
        autoform: {
            type: "select",
            options: function() {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    }
});

Tasks.attachSchema(TasksSchema);

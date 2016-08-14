Scores = new Mongo.Collection('Scores');
Arguments = new Mongo.Collection('Arguments');

Voters = new Mongo.Collection('Voters');

VotersSchema = new SimpleSchema({
    name: {
        type: String,
        label: "name"
    },
    scores: {
        type: [[Number]],
        label: "scores"
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

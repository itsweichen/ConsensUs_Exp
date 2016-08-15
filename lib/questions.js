Questions = new Mongo.Collection('Questions');

QuestionsSchema = new SimpleSchema({
    q1: {
        type: String,
        label: "This is the first question"
    }
});

Questions.attachSchema(QuestionsSchema);

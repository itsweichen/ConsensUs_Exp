Questions = new Mongo.Collection('Questions');

QuestionsSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "userId",
        autoValue: function() {
            return this.userId;
        },
        autoform: {
            type: "hidden"
        }
    },
    q1:{
        type: Object,
        label: "1. Rank the candidates from best to worst as your committee sees them (1 being the best and 3 being the worst)"
    },
    "q1.Best": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function() {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    "q1.Second": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function() {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    "q1.Third": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function() {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    q2: {
        type: Object,
        label: "2. Who does your committee think is the best in terms of each criterion?"
    },
    "q2.Academic": {
        type: String,
        label: "Who does your committee think is the best in terms of \"Academic\"?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    "q2.Activities": {
        type: String,
        label: "Who does your committee think is best in terms of  \"Activities\"?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    "q2.Recommendation Letter": {
        type: String,
        label: "Who does your committee think is best in terms of  \"Recommendation Letter\"?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    "q2.Readiness for Engineering": {
        type: String,
        label: "5. Who does your committee think is best in terms of \"Readiness for Engineering\"?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    },
    q3: {
        type: [String],
        label: "3. Which two voters seem to have the most disagreement regarding the decision?"
    },
    q4: {
        type: String,
        label: "4. Choose the criteria and candidate where there appears to be the biggest amount of disagreement？"
    },
    q5: {
        type: String,
        label: "4. Which candidate has the biggest range of scores overall?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Sam", value: "Sam"},
                    {label: "Adam", value: "Adam"},
                    {label: "Jim", value: "Jim"}
                ];
            }
        }
    }
});

Questions.attachSchema(QuestionsSchema);

Questions = new Mongo.Collection('Questions');

QuestionsSchema = new SimpleSchema({
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
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
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
                ];
            }
        }
    },
    q3: {
        type: Object,
        label: "3. Which two voters seem to have the most disagreement regarding the decision?"
    },
    "q3. ": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
                ];
            }
        }
    },
    q4: {
        type: Object,
        label: "4. Name the criteria and candidate where there appears to be the biggest amount of disagreement？"
    },
    "q4. ": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
                ];
            }
        }
    },
    q5: {
        type: Object,
        label: "4. Which candidate has the biggest range of scores overall?"
    },
    "q5. ": {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Jim", value: "Jim"},
                    {label: "Adam", value: "Adam"},
                    {label: "Sam", value: "Sam"}
                ];
            }
        }
    }
});

Questions.attachSchema(QuestionsSchema);

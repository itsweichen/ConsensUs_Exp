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
        type: String,
        label: "2. Who does your committee think is best in terms of “recommendation letters”?",
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
        label: "3. Which two people on your committee have the most disagreement regarding Sam?"
    },
    q4: {
        type: String,
        label: "4. Who on your committee disagrees with you the most regarding Adam?"
    },
    q5: {
        type: String,
        label: "5. Who on your committee agrees with you the most on Jim?"
    },
    q6: {
        type: String,
        label: "6. Name the criteria and candidate where there appears to be the most disagreement between you and the committee?"
    },
    q7: {
        type: String,
        label: "7. Which candidate has the biggest range of scores overall?",
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

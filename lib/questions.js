Questions = new Mongo.Collection('Questions');

var candidatesOptions = [
    {label: "Sam", value: "1"},
    {label: "Adam", value: "2"},
    {label: "Jim", value: "3"}
];

var criteriaOptions = [
    {label: "Overall", value: "1"},
    {label: "Academic", value: "2"},
    {label: "Activities", value: "3"},
    {label: "Recommendation Letter", value: "4"},
    {label: "Readiness for Engineering", value: "5"}
];

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
        type: String,
        label: "1. Which candidate does the committee support most overall?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q2: {
        type: String,
        label: "2. Regarding overall, select the candidate that appears to be creating the biggest point of disagreement between you and the committee?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q3: {
        type: String,
        label: "3. Select the criteria that appears to be creating the biggest point of disagreement between you and the committee?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return criteriaOptions;
            }
        }
    },
    q4: {
        type: String,
        label: "4. Regarding overall, select the candidate that appears to be creating the biggest point of disagreement among the committee members?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q5: {
        type: String,
        label: "5. Select the criteria that appears to be creating the biggest point of disagreement among the committee members?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return criteriaOptions;
            }
        }
    },
    q6: {
        type: [String],
        label: "6. Regarding overall, which two people on the committee appear to have the most disagreement regarding Sam?"
    },
    q7: {
        type: String,
        label: "7. Regarding activities, who on your committee appears to disagree with you the most regarding Adam?"
    },
    q8: {
        type: String,
        label: "8. Regarding readiness for engineering, who on your committee appears to agree with you the most on Jim?"
    }
});

Questions.attachSchema(QuestionsSchema);

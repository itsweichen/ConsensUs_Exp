Questions = new Mongo.Collection('Questions');

var candidatesOptions = [
    {label: "Sam", value: "1"},
    {label: "Adam", value: "2"},
    {label: "Jim", value: "3"}
];

var criteriaOptions = [
    {label: "Overall", value: "0"},
    {label: "Academic", value: "1"},
    {label: "Activities", value: "2"},
    {label: "Recommendation Letter", value: "3"},
    {label: "Readiness for Engineering", value: "4"}
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
        label: "1. Which candidate does the committee support most OVERALL?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q2: {
        type: String,
        label: "2. Regarding OVERALL, select the candidate that appears to be creating the biggest point of disagreement BETWEEN committee and you?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q3: {
        type: String,
        label: "3. Select the criteria that appears to be creating the biggest point of disagreement BETWEEN committee and you?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return criteriaOptions;
            }
        }
    },
    q4: {
        type: String,
        label: "4. Regarding OVERALL, select the candidate that appears to be creating the biggest point of disagreement WITHIN the committee?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return candidatesOptions;
            }
        }
    },
    q5: {
        type: String,
        label: "5. Select the criteria that appears to be creating the biggest point of disagreement WITHIN the committee?",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return criteriaOptions;
            }
        }
    },
    q6: {
        type: [String],
        label: "6. Regarding OVERALL, which two (2) people on the committee appear to have the most disagreement regarding Sam?"
    },
    q7: {
        type: String,
        label: "7. Regarding ACTIVITIES, who on your committee appears to DISAGREE with you the most regarding Adam?"
    },
    q8: {
        type: String,
        label: "8. Regarding READINESS for engineering, who on your committee appears to AGREE with you the most on Jim?"
    },
    q2w: {
        type: String,
        label: "Why do you think so?"
    }
});

Questions.attachSchema(QuestionsSchema);

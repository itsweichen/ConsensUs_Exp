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
        type: String,
        label: "1. Which candidate is causing the most disagreement regarding the overall criteria within the committee?",
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
    q2: {
        type: [String],
        label: "2. Which two people on the committee have the most disagreement regarding Sam?"
    },
    q3: {
        type: String,
        label: "3. Who on the committee disagrees with you the most regarding Adam?"
    },
    q4: {
        type: String,
        label: "4. Who on the committee agrees with you the most on Jim?"
    },
    q5: {
        type: String,
        label: "5. Choose the criteria and candidate where there appears to be the most disagreement between you and the committee?"
    },
    q6: {
        type: [String],
        label: "6. Pick three committee members from whom you want to see their rationale."
    },
    q7: {
        type: String,
        label: "7. Where is the biggest point of disagreement between you and the committee?",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    q8: {
        type: String,
        label: "8. For the two committee members that seem to disagree the most, what issues should they discuss to solve their disagreement?",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    }
});

Questions.attachSchema(QuestionsSchema);

// Meteor.startup(function() {
//     if (Voters.find().count() === 0) {
//         var voters = [
//             {
//             name: "Mary",
//             scoresSam: [6.4,9.5,6.1,5,5],
//             scoresAdam: [8.3,7.7,8.9,8.6,8],
//             scoresJim: [8,8,8.1,8.5,7.5],
//             argu: "While it would appear that Sam may be the most academically suitable candidate he does not appear to be the most ready for an engineering program. His recommendation letter appears to be the weakest of the three and the alcohol suspension is worrying. Jim appears to be much more suitable of a candidate with very strong recommendation letters and he is possibly targeting an engineering program. However, I would have to say that Adam is the most suitable candidate because of his relevant engineering experience as an intern and his participation in his engineering club.",
//             flag: 2
//             },
//             {
//             name: "Haley",
//             scoresSam: [7.5,9.8,8.7,7.5,4.2],
//             scoresAdam: [8.5,8.8,8.5,8.6,8.3],
//             scoresJim: [9.6,9.5,9.8,9.4,9.6],
//             argu: "I feel like Jim may have the least perfect experience but from his parents divorcing and his studies and his recommendation letters he is the best candidate. I feel like Sam feels like he can gain easy access especially since his parents have close occupations and he attended private school.I also feel that his alcohol suspension is completely unacceptable. I feel like Adam is average. He is the mediocre one and is okay but not better than Jim. Adam would probably succeed but not better than Jim because of tough background.",
//             flag: 3
//             },
//             {
//             name: "Wesley",
//             scoresSam: [5.6,9.8,8.5,2,2],
//             scoresAdam: [7.4,9.5,8,3,9],
//             scoresJim: [8.8,9.6,7.5,9,9.2],
//             argu: "Sam scored the lowest in recommendation, he got a recommendation letter for acting. Adam got a recommendation letter but the letter lacked detail. Jim received a letter claiming he was well prepared for math related subjects.  The most ready student is Jim. Sam doesn’t know what he wants to study. Adam seems to know what he wants and goes for it and is very responsible but isn’t taking the necessary classes. Jim’s teachers see this and have recommended him to the course though he has not chosen what subject he wants to major in and has many choices to choose from.",
//             flag: 3
//             },
//             {
//             name: "Cindy",
//             scoresSam: [7.5,8.2,7,5,10],
//             scoresAdam: [7.8,5,7.8,8.5,10],
//             scoresJim: [7,7,6,7.1,8],
//             argu: "Sam’s application looks best initially but part of that is just having the best high school opportunity. His recommendation letter is irrelevant; well-rounded is good, but I’d rather see a recommendation from someone who knows his ability in STEM classes. He’s also undecided in his major, so engineering school may not be the best place for him. Adam’s academics aren’t as great, but he’s a hard worker with an interest in engineering. He has potential. Jim is also a hard worker. I’m not sure engineering school is the *best* school for maths majors, but it’s good enough and he’s academically ready.",
//             flag: 2
//             },
//             {
//             name: "Amy",
//             scoresSam: [6.5,8.5,5,5,7.5],
//             scoresAdam: [7.5,7,8.5,7,7.5],
//             scoresJim: [8.1,9.5,6.5,8,8.5],
//             argu: "Jim shows the most focus and determination as far as his activities and his academics combined in addition to having decided upon a major.   Adam seems to be following in his family’s footsteps more than actually showing his own interest in engineering.   Sam seems to have a natural ability in math and could do well in engineering but I don’t think he’s a good fit for the program because his major is undecided and none of his activities were math/engineering related.",
//             flag: 3
//             },
//             {
//             name: "Kevin",
//             scoresSam: [6.7,9.4,8.1,1,8.5],
//             scoresAdam: [7,5.9,9,8.9,4.3],
//             scoresJim: [6,8.4,2.6,8,5.1],
//             argu: "sam is taking ap classes , he does well academically, he is involved  and taking engineering classes. however, was suspended for consuming alcohol on a field trip. He got a recommendation letter from his teacher though, stating that he was a well rounded student.  adam is involved and has a great recommendation letter. he isn’t taking engineering classes and has the lowest gpa of the other two students. however he is the leader of the engineering club. jim does well academically , taking ap classes. he is not very involved with actives, but he does have a great recommendation letter.",
//             flag: 2
//             }
//         ];
//         _.each(voters, function(voter) {
//             Voters.insert(voter);
//             console.log("inserted voter " + voter);
//         });
//     }
// });

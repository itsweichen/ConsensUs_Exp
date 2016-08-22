Meteor.startup(function() {
    if (Voters.find().count() === 0) {
        var voters = [
    		{
    		name: "Sierra",
    		scoresSam: [9.9,7.9,4.3,8.4,7.6],
    		scoresAdam: [8.5,7.3,9.4,8.5,8.4],
    		scoresJim: [9.2,7.4,9.3,8.8,8.6],
    		argu: "I feel like it was tough to decide on these scores.  I think Sam is taking better, tough classes to prepare him, but then Jim actually has experience working for an engineering company.  I would like to say that Sam is the best candidate, but I think due to his poor letter of recommendation, undecided major, and school suspension, I would have to get the nod to Jim. ",
    		flag: 3
    	   },
    		{
    		name: "Mike",
    		scoresSam: [8.9,8.3,9,8,8.6],
    		scoresAdam: [8.3,8.9,9.5,8.7,8.9],
    		scoresJim: [7.7,9.5,8.3,9.4,8.7],
    		argu: "Sam Smith  is taking three Science/Engineering related AP classes including Calculus, Statistics and Computer Science. Both of Adam Adam’s parents are senior engineers in a big technology company. Jim’s  high school principal has written a letter of recommendation saying that her high school has a strong academic reputation, and describes him as a hard working student. Jim’s math teacher has written a letter of recommendation saying that Jim is extremely good at math and he is well prepared for any math-related majors. ",
    		flag: 2
    	   },
    	      {
    		name: "Wesley",
    		scoresSam: [9.8,8.5,2,2,5.6],
    		scoresAdam: [9.5,8,3,9,7.4],
    		scoresJim: [9.6,7.5,9,9.2,8.8],
    		argu: "Sam scored the lowest in recommendation, he got a recommendation letter for acting. Adam got a recommendation letter but the letter lacked detail. Jim received a letter claiming he was well prepared for math related subjects.  The most ready student is Jim. Sam doesn’t know what he wants to study. Adam seems to know what he wants and goes for it and is very responsible but isn’t taking the necessary classes. Jim’s teachers see this and have recommended him to the course though he has not chosen what subject he wants to major in and has many choices to choose from.",
    		flag: 3
        	},
        	{
    		name: "Cindy",
    		scoresSam: [8.2,7,5,10,7.5],
    		scoresAdam: [5,7.8,8.5,10,7.8],
    		scoresJim: [7,6,7.1,8,7],
    		argu: "Sam’s application looks best initially but part of that is just having the best high school opportunity. His recommendation letter is irrelevant; well-rounded is good, but I’d rather see a recommendation from someone who knows his ability in STEM classes. He’s also undecided in his major, so engineering school may not be the best place for him. Adam’s academics aren’t as great, but he’s a hard worker with an interest in engineering. He has potential. Jim is also a hard worker. I’m not sure engineering school is the *best* school for maths majors, but it’s good enough and he’s academically ready.",
    		flag: 2
        	},
        	{
    		name: "Mary",
    		scoresSam: [9.5,6.1,5,5,6.4],
    		scoresAdam: [7.7,8.9,8.6,8,8.3],
    		scoresJim: [8,8.1,8.5,7.5,8],
    		argu: "While it would appear that Sam may be the most academically suitable candidate he does not appear to be the most ready for an engineering program. His recommendation letter appears to be the weakest of the three and the alcohol suspension is worrying. Jim appears to be much more suitable of a candidate with very strong recommendation letters and he is possibly targeting an engineering program. However, I would have to say that Adam is the most suitable candidate because of his relevant engineering experience as an intern and his participation in his engineering club.",
    		flag: 2
    	   },
    		{
    		name: "Kim",
    		scoresSam: [9.9,9.9,5.6,7.6,8.2],
    		scoresAdam: [8.6,9.9,6.6,9.3,8.6],
    		scoresJim: [9.5,10,9.9,8.2,9.4],
    		argu: "Adam seemed to be the most ready for engineering due to his membership in the engineering club and the jobs of his parents. His two summers working in engineering also help. The other two have great statistics as well but not as geared toward engineering as Adam. Sam’s note on the transcript detract from his good evaluation. In addition, his letter of recommendation came from a drama teacher. If he’s applying for an engineering program, then his recommendation should have come from a related field.",
    		flag: 3
        	},
        	{
    		name: "Kevin",
    		scoresSam: [9.4,8.1,1,8.5,6.7],
    		scoresAdam: [5.9,9,8.9,4.3,7],
    		scoresJim: [8.4,2.6,8,5.1,6],
    		argu: "sam is taking ap classes , he does well academically, he is involved  and taking engineering classes. however, was suspended for consuming alcohol on a field trip. He got a recommendation letter from his teacher though, stating that he was a well rounded student.  adam is involved and has a great recommendation letter. he isn’t taking engineering classes and has the lowest gpa of the other two students. however he is the leader of the engineering club. jim does well academically , taking ap classes. he is not very involved with actives, but he does have a great recommendation letter.",
    		flag: 2
        	},
        	{
    		name: "John",
    		scoresSam: [9.8,5.2,5.4,3.1,5.9],
    		scoresAdam: [8,8.9,8.9,8.7,8.6],
    		scoresJim: [8.4,8.1,8.4,8.3,8.3],
    		argu: "Sam is the least suitable. He has not really done anything in his high school career to prepare him for an engineering program. He is also unsure what he wants to do and should take some pre-req classes before entering a program to be sure he wants to do it. Adam is probably the most suitable. He seems to be preparing himself the most for a career in engineering, and has the activities supporting that. Jim would be my second choice. He has the math skills necessary, and seems to be sure of the direction he wants to go with his education.",
    		flag: 2
        	},
        	{
    		name: "Amy",
    		scoresSam: [8.5,5,5,7.5,6.5],
    		scoresAdam: [7,8.5,7,7.5,7.5],
    		scoresJim: [9.5,6.5,8,8.5,8.1],
    		argu: "Jim shows the most focus and determination as far as his activities and his academics combined in addition to having decided upon a major.   Adam seems to be following in his family’s footsteps more than actually showing his own interest in engineering.   Sam seems to have a natural ability in math and could do well in engineering but I don’t think he’s a good fit for the program because his major is undecided and none of his activities were math/engineering related.",
    		flag: 3
        	},
        	{
    		name: "Haley",
    		scoresSam: [9.8,8.7,7.5,4.2,7.5],
    		scoresAdam: [8.8,8.5,8.6,8.3,8.5],
    		scoresJim: [9.5,9.8,9.4,9.6,9.6],
    		argu: "I feel like Jim may have the least perfect experience but from his parents divorcing and his studies and his recommendation letters he is the best candidate. I feel like Sam feels like he can gain easy access especially since his parents have close occupations and he attended private school.I also feel that his alcohol suspension is completely unacceptable. I feel like Adam is average. He is the mediocre one and is okay but not better than Jim. Adam would probably succeed but not better than Jim because of tough background.",
    		flag: 3
        	},
        	{
    		name: "George",
    		scoresSam: [9,7.5,9,7.5,8.2],
    		scoresAdam: [6.5,8,5,7.5,6.8],
    		scoresJim: [7.5,8.5,9.5,8,8.4],
    		argu: "Sam’s test scores, GPA, & coursework are better than Jim or Adam’s. Sam & Adam have family in the field of engineering, which gives them advantages over Jim. Adam’s information causes me to question motivation - his work experience seems biased. The only thing that hurts Sam is being caught drinking, which may have been an isolated incident. Jim’s only disadvantage being his family’s lack of experience in engineering. Jim seems the most motivated. I highly question Adam’s motivation and ability.",
    		flag: 3
    	   },
           {
    		name: "Tom",
    		scoresSam: [9.7,9.3,9.2,5.1,8.3],
    		scoresAdam: [6.8,8.8,9.8,9.8,8.8],
    		scoresJim: [8.3,7.2,7.9,8.2,7.9],
    		argu: "Overall Adams I feel is most prepared to excel the farthest in an engineering curriculum due to his activities. JIm is also very strong academically and would also do very well. Sam has a good background but appears to be least qualified of the candidates due to lack of strong experience and recommendation for engineering aptitude despite doing well academically.",
    		flag: 2
    	   }
        ];
        _.each(voters, function(voter) {
            Voters.insert(voter);
            console.log("inserted voter " + voter);
        });
    }
});

Meteor.startup(function() {
    if (Voters.find().count() === 0) {
        var voters = [
		   {
    		name: "Mary",
    		scoresSam: [9.7,9.5,9.6,9.8,9.8],
    		scoresAdam: [8.2,7.3,7.3,8.9,9.2],
    		scoresJim: [8.2,7.9,8,8.4,8.6],
    		argu: "Sam is definitely more qualified than either Jim or Adam with strong academic skills and high SAT math scores. His parents occupations and activities outside of the classroom indicate a well rounded individual as his drama teacher has written. Jim and Adam are similar in their academic scores although Jim has taken more challenges than Adam, and comes from a completely different social situation, leading me to believe along with his principle that he will work extremely hard and would also be well suited in the engineering program. Adam’s background would indicate he too could be a successful engineering student.",
    		flag: 1,
    		gender: 2
    	   },
    	   {
    		name: "James",
    		scoresSam: [9,9,9,9,9],
    		scoresAdam: [7.3,7,8,7,7],
    		scoresJim: [6,8,6,4,6],
    		argu: "I felt that Sam was well prepared and had a wide range of experiences. Adam had some practical experience and knows what path he wants to be on. Jim seems a little lost, not from a very good school and may have trouble keeping up with other students. Jim might also not be able to focus on school full time because he may be working to pay for his education. His principle also lied in his recommendation letter by saying it was a good high school when it had proven not to be.",
    		flag: 1,
    		gender: 1
    	   },
    	   {
    		name: "Lisa",
    		scoresSam: [8.7,9,7.3,9,9.4],
    		scoresAdam: [7.3,6.6,8.5,5.9,8.1],
    		scoresJim: [8,8.5,6.7,9.1,7.9],
    		argu: "It seems that I would rank Sam Smith as the most qualified and Adam Adams to be the least qualified. I want to say that Jim Jones would be the ideal candidate but it came down to the SAT scores and GPA. Clearly Sam Smith has better grades and has is taking courses I would associate with engineering. Although Adam is interested in engineering and he doesn't qualify academically in my opinion. I would have liked to pick Jim Jones because Sam seems like he is affluent and Jim could really use the opportunity I had to go with the more qualified one.",
    		flag: 1,
    		gender: 2
    	   },
    	   {
    		name: "George",
    		scoresSam: [8.9,9.5,9.5,8.5,8],
    		scoresAdam: [6.5,6.5,7,5,7.3],
    		scoresJim: [7.9,8.5,6.4,9,7.6],
    		argu: "Sam's high test scores and grades, his AP level classes, his interest in STEM fields, and his well roundedness indicate that he would work very hard in school and be successful. Jim is a close second; he is an exceptionally hard worker, but his lack of roundedness is a concern. If he comes from a socioeconomically disadvantaged background, he might have a hard time adjusting to a demanding college. Adam comes in last place because he has not shown that he has the work ethic to be successful in a challenging program. He hasn't taken difficult AP classes, and he still doesn't have outstanding grades. He might be a better candidate to start out at a community college and then reapply after he gets his AA.",
    		flag: 1,
    		gender: 1
    	   },
    	   {
    		name: "Sandra",
    		scoresSam: [8.6,8.7,9.5,6.5,9.5],
    		scoresAdam: [6.5,6.4,7.3,5.6,6.7],
    		scoresJim: [6.6,7.6,4.3,7,7.6],
    		argu: "Sam clearly should have the highest academic ranking. He has high SAT scores and is taking engineering AP exams. Sam without a doubt will be prepared for an engineering major. Jim has pretty good scores and appears ready for engineering. Adam's academic profile is fine but he has no AP classes. He did win a California Science Fair and is part of the engineering club, so he's probably ready for engineering. Sam's activities show he has a wide range, playing football and debating. His recommendations are ok filling out his character, but don't speak about his academics. Don't think alcohol is a big deal for someone entering college. Jim has good recommendations from his math teacher and principal. Overall, Sam is a clear number 1. I'd probably rank Jim a clear #2, as I'd put more weight in Academics and Engineering Readiness than activities. Adam would probably do fine, but I'd put my money on Sam and Jim first.",
    		flag: 1,
    		gender: 2
    	   },
    	   {
    		name: "Kevin",
    		scoresSam: [8.4,9.5,9,6,9],
    		scoresAdam: [8,7.5,9.5,8,7],
    		scoresJim: [8.3,8.5,8,8.5,8],
    		argu: "Sam's SAT scores are extremely impressive. I liked that he was taking tough classes, and that his high school has a good academic reputation. I would have preferred that his recommendation letters have come from science or math teachers, but based on his grades and SAT scores, I mostly overlooked his suspension. Adam's SAT scores could have been better, but at least he did pretty well on the SAT Math side of it. I took into account his high school's reputation for hard grading, and I was extremely impressed with his State-wide award. I also like that he has some practical experience in the field, which allowed me to mostly overlook his short recommendation letter. Jim was an overall strong candidate that didn't seem to excel past the other candidates in any area, but also seemed to lack any major weaknesses. If this was a strictly math program, he would probably be the best candidate.",
    		flag: 1,
    		gender: 1
    	   },
    	   {
    		name: "Donna",
    		scoresSam: [9.8,9.6,10,10,9.7],
    		scoresAdam: [9.4,9.3,9.7,9.3,9.4],
    		scoresJim: [9.5,8.8,9.4,9.7,9.9],
    		argu: "I think sam is a better candidate i like his classes though his undecided of his major he has great notes so he can be a good engineer, I put Jim second cause he was raised in a middle to low neighborhood, went to a public school but he is good in math in his sat's he did it great, and even when he doesn’t have the privileges of a dad working in a great firm (like Adam) or a sister in a big university, he works hard to be where he is.",
    		flag: 1,
    		gender: 2
    	   },
    	   {
    		name: "Jason",
    		scoresSam: [9.4,10,10,8,9.7],
    		scoresAdam: [9,7.4,8.6,10,10],
    		scoresJim: [7,7.7,6.4,9.4,4.6],
    		argu: "Out of the three candidates I feel Sam displays the most readiness for engineering program. Although he states he does not know yet what he would like to major in, his GPA along with his SAT scores, particularly in the math portion, suggests he would have the intelligence to remain focused in the engineering program. He is already prepared, having taken several engineering and science related courses as well as participated in extracurricular activities that has given him enough confidence to feel as though he could be successful in the engineering field. He also has parents that both work in the technology field so he's probably been around engineering and technology related business most of his life.",
    		flag: 1,
    		gender: 1
    	   },
    	   {
    		name: "Laura",
    		scoresSam: [8.8,8.3,8.7,9.1,9.1],
    		scoresAdam: [7.7,9,5.8,7.8,8.1],
    		scoresJim: [7.1,8,5.2,6.8,8.5],
    		argu: "Sam is academically well prepared for engineering. The other two candidates are well qualified academically also, just not to the extent as Sam. Adam has some internship experience in engineering which is helpful experience. Sam has participated in more extracurricular activities at school than the other two. Sam and Adam both attended schools with good academic reputations, where Jim's school was less rigorous by virtue of other students struggling at college. All have good potential to do well, but Sam will probably have a little easier time of the academic experience. The others may struggle a little more to get through college, but should do well as working engineers.",
    		flag: 1,
    		gender: 2
    	   },
    	   {
    		name: "Brian",
    		scoresSam: [8.7,9.7,9.5,7.3,8.3],
    		scoresAdam: [4.2,4.3,3,4.3,5.2],
    		scoresJim: [7.6,5.7,7.1,9,8.6],
    		argu: "Sam is the best all-around; highest scores, and is the most well-rounded. His family seems to be generally successful. Jim has okay scores, but has only focused on math. He's the first in his family looking at college. Jim has okay scores, but hasn't taken any AP courses. His parents are in the engineering field, however, so that's a plus in his favor.",
    		flag: 1,
    		gender: 1
    	   },
    	   {
    		name: "Jennifer",
    		scoresSam: [7.4,7.1,8.1,7.8,6.4],
    		scoresAdam: [9.7,9.3,9.8,9.7,9.8],
    		scoresJim: [5.9,6.6,6,5.2,5.9],
    		argu: "Adam is the most prepared for engineering in general.  His home life and his major is focused on engineering.  Sam is more into sports than academics, so I don’t know how well he would do with an engineering program. Jim I don’t think is prepared for engineering.  He hands homework in late, and is not interested in non academic pursuits.",
    		flag: 2,
    		gender: 2
    	   },
    	   {
    		name: "Thomas",
    		scoresSam: [5.2,9,9,2,1],
    		scoresAdam: [7.8,7,6,9,9],
    		scoresJim: [7.1,8.5,3,9,8],
    		argu: "On academic, Adam had the least impressive scores/GPA, while Jim did very well, especially coming from a broken home. Sams recommendation letter was about sports... which doesn’t speak to suitability as an engineering student. Likewise, Sam doesn’t seem to care specifically about engineer, while Adam definitely does (with his parental background) and Jim feasibly does (with his love of math). Overall, I anticipate that Jim might be a little underwhelmed by engineering and might succeed better in straight math, provided he takes care of non-essential courses appropriately. Sam should provide more evidence that he is truly engaged with higher education.",
    		flag: 2,
    		gender: 1
    	   },
    	   {
    		name: "Helen",
    		scoresSam: [5.9,9.8,5.2,5.4,3.1],
    		scoresAdam: [8.6,8,8.9,8.9,8.7],
    		scoresJim: [8.3,8.4,8.1,8.4,8.3],
    		argu: "Sam is the least suitable. He has not really done anything in his high school career to prepare him for an engineering program. He is also unsure what he wants to do and should take some pre-req classes before entering a program to be sure he wants to do it. Adam is probably the most suitable. He seems to be preparing himself the most for a career in engineering, and has the activities supporting that. Jim would be my second choice. He has the math skills necessary, and seems to be sure of the direction he wants to go with his education.",
    		flag: 2,
    		gender: 2
    	   },
    	   {
    		name: "Robert",
    		scoresSam: [7.4,9.6,7,5.4,7.4],
    		scoresAdam: [8.7,7.9,8.8,9,9.2],
    		scoresJim: [5.7,5.8,5.8,7.3,4],
    		argu: "I think that the fact that Adam seems the most ready to be an engineer that he would be the person that is best for the position. Sam has excellent grades and an exclusive life, but overall I do not think that he wants to go ahead and become an engineer at all. I think Jim does not really have enough skills and experience at all, so overall Adam would be best.",
    		flag: 2,
    		gender: 1
    	   },
    	   {
    		name: "Betty",
    		scoresSam: [8.1,9,8.5,7,7.8],
    		scoresAdam: [9.1,9.4,9.5,8,9.3],
    		scoresJim: [8.2,8,8,8,8.6],
    		argu: "I give my rank as below: 1. Adam Adams - He has the most relevant experience and has expressed an explicit interest in engineering. His grades certainly suggest he can handle the academic rigor of the engineering program. Overall his application consistently indicates a strong background and interest in engineering. 2. Jim Jones - He appears to have the academic ability to successfully complete an engineering program. Some academic shortcomings but strong in the relevant field (math). I think he has done very well if you factor in his socioeconomic background. 3. Sam Smith - He is certainly academically capable. His experience is a mixed bag of somewhat relevant to irrelevant experiences. I think he would do well in the program and would accept him, but I rank him last because of experience and commitment concerns (undeclared) and to be frank I believe a man of his higher socioeconomic background has a large enough safety net to handle a rejection from this program.",
    		flag: 2,
    		gender: 2
    	   },
    	   {
    		name: "Richard",
    		scoresSam: [5.6,7.2,5.6,3.9,5.8],
    		scoresAdam: [8.4,8,8.3,9.9,7.7],
    		scoresJim: [8.3,9,7.6,7.4,9.4],
    		argu: "While Sam has the highest GPA, he is not necessarily dedicated to pursuing a degree in engineering. He also has minor disciplinary marks on his record. Adam, while not having as high a GPA, has taken more courses related directly to engineering and would make an excellent candidate. Jim is also a good candidate, having received letters of recommendation from his math teacher. He may face more difficulties than Adam, but also has the potential to do very well.",
    		flag: 2,
    		gender: 1
    	   },
    	   {
    		name: "Ruby",
    		scoresSam: [8.9,9.2,9.4,8.4,8.7],
    		scoresAdam: [9,8,8.9,9.3,9.6],
    		scoresJim: [8.2,8.3,8.4,7.2,9],
    		argu: "Although Sam has the highest SAT scores he isn’t really interested in engineering. Adam is far more advanced in the field of engineering than Sam. Jim seems to have a problem with turning his homework in late. Sam is active in football but Adampps extra activities are associated with science. I think Adam is probably the best choice overall. Jim seems to be very good at math but falls short in other areas.",
    		flag: 2,
    		gender: 2
    	   },
    	   {
    		name: "Daniel",
    		scoresSam: [3,4,4,2,2],
    		scoresAdam: [8.5,8,8,9,9],
    		scoresJim: [7.8,8,6,9,8],
    		argu: "I think that overall, Adam is the most prepared.  He seems to have it all--good recommendations, a clear major, engineering background, and internships.  Jim also seems qualified, though he may have to work a bit harder.  His background is less well off than the others, but his recommendations are outstanding and his scores are exceptional.  Sam seems like the least qualified.  He is undecided in his major, and his recommendations are from extracurricular activities.  He may not be mature enough or focused enough for this program.",
    		flag: 2,
    		gender: 1
    	   },
    	   {
    		name: "Barbara",
    		scoresSam: [6.4,9.5,6.1,5,5],
    		scoresAdam: [8.3,7.7,8.9,8.6,8],
    		scoresJim: [8,8,8.1,8.5,7.5],
    		argu: "While it would appear that Sam may be the most academically suitable candidate he does not appear to be the most ready for an engineering program. His recommendation letter appears to be the weakest of the three and the alcohol suspension is worrying. Jim appears to be much more suitable of a candidate with very strong recommendation letters and he is possibly targeting an engineering program. However, I would have to say that Adam is the most suitable candidate because of his relevant engineering experience as an intern and his participation in his engineering club.",
    		flag: 2,
    		gender: 2
    	   },
    	   {
    		name: "John",
    		scoresSam: [7.6,9.5,9,5,7],
    		scoresAdam: [8.8,8,8,10,9],
    		scoresJim: [6.1,8.5,7,4,5],
    		argu: "I think Adams is the most well rounded candidate for the engineering program, his academics might fall a little behind Smith's and Jones, but he seems to excel in all of the other areas I think would be important. He also worked at two electrical engineering firms and has good recommendations from them. Adam just seems more focused on becoming an engineer. Whereas the other students, though capable, don't seem that dedicated to becoming an engineer themselves.",
    		flag: 2,
    		gender: 1
    	   },
    	   {
    		name: "Carol",
    		scoresSam: [4.9,9.5,2,2,6],
    		scoresAdam: [6.5,7,6.5,5.4,7],
    		scoresJim: [8.5,8.5,8.5,9,8],
    		argu: "Sam doesn’t seem to be overly interested in engineering compared to either Adam or Jim. His scores are very high but he just doesn’t seem passionate about the program. Although Adam has lower scores than both Sam and Jim he has a passion for engineering which should carry him a long way. He also has strong recommendations. Jim is the best candidate of the three. He has the high scores, the passion for engineering, the recommendation. Of the three candidates I would pick Jim with Adam second and Ippd pass on Sam.",
    		flag: 3,
    		gender: 2
    	   },
    	   {
    		name: "William",
    		scoresSam: [5.6,9.8,8.5,2,2],
    		scoresAdam: [7.4,9.5,8,3,9],
    		scoresJim: [8.8,9.6,7.5,9,9.2],
    		argu: "Sam scored the lowest in recommendation, he got a recommendation letter for acting. Adam got a recommendation letter but the letter lacked detail. Jim received a letter claiming he was well prepared for math related subjects. The most ready student is Jim. Sam doesn’t know what he wants to study. Adam seems to know what he wants and goes for it and is very responsible but isn’t taking the necessary classes. Jim’s teachers see this and have recommended him to the course though he has not chosen what subject he wants to major in and has many choices to choose from.",
    		flag: 3,
    		gender: 1
    	   },
    	   {
    		name: "Kimberly",
    		scoresSam: [6.8,9,8,5.5,4.9],
    		scoresAdam: [5.5,4.3,7.5,4.8,5.5],
    		scoresJim: [8.1,8.6,8,8,8],
    		argu: "Adam is the worst performer in terms of academic in terms of scores. All are pretty active in school. The recommendations are the ones that set them apart. Sam & Adam are the usual relatively well-off students but they aren’t highly recommended. Jim is the only one who scores well in others’ evaluations of him although hepps from a low-income environment. Jim has more motivation & determination to do well than the other 2.",
    		flag: 3,
    		gender: 2
    	   },
    	   {
    		name: "Wesley",
    		scoresSam: [7.5,9.8,8.7,7.5,4.2],
    		scoresAdam: [8.5,8.8,8.5,8.6,8.3],
    		scoresJim: [9.6,9.5,9.8,9.4,9.6],
    		argu: "I feel like Jim may have the least perfect experience but from his parents divorcing and his studies and his recommendation letters he is the best candidate. I feel like Sam feels like he can gain easy access especially since his parents have close occupations and he attended private school.I also feel that his alcohol suspension is completely unacceptable. I feel like Adam is average. He is the mediocre one and is okay but not better than Jim. Adam would probably succeed but not better than Jim because of tough background.",
    		flag: 3,
    		gender: 1
    	   },
    	   {
    		name: "Cindy",
    		scoresSam: [6.5,8.5,5,5,7.5],
    		scoresAdam: [7.5,7,8.5,7,7.5],
    		scoresJim: [8.1,9.5,6.5,8,8.5],
    		argu: "Jim shows the most focus and determination as far as his activities and his academics combined in addition to having decided upon a major.  Adam seems to be following in his family’s footsteps more than actually showing his own interest in engineering.  Sam seems to have a natural ability in math and could do well in engineering but I don’t think hepps a good fit for the program because his major is undecided and none of his activities were math/engineering related.",
    		flag: 3,
    		gender: 2
    	   },
    	   {
    		name: "Jacob",
    		scoresSam: [7.3,9,8,6,6],
    		scoresAdam: [8.7,7.5,9.5,9,9],
    		scoresJim: [9.1,8.8,9,9.8,9],
    		argu: "Sam has a high GPA, however; he does not show much interest in engineering. His major is undecided and his recommendations do not have anything to do with engineering. Adam seems interested, however; it may be due to his parents. Regardless, his recommendations seem good despite one of the letters being short. His academics is average.Although Sam’s GPA is higher, Jim is also involved in AP courses and is taking courses at a local community college. His recommendations are good and pertain to engineering. While he hasn’t declared engineering as his major, he seems interested. Seems promising.",
    		flag: 3,
    		gender: 1
    	   },
    	   {
    		name: "Susan",
    		scoresSam: [8.5,9.3,8.8,8.9,7.1],
    		scoresAdam: [7.6,7.1,8.6,5.4,9.3],
    		scoresJim: [9.3,8.4,9.3,9.6,9.9],
    		argu: "Despite Sam’s stellar academic performance, he doesn’t have as much readiness in Engineering as Adam and Jim. Jim has a comparable academic record that is at least as rigorous as Sam’s and Jim has the best balance between a strong background in an engineering related topic, math. Jim’s overall suitability, as exemplified by a recommendation later written by his school principal, makes him the candidate I would choose.",
    		flag: 3,
    		gender: 2
    	   },
    	   {
    		name: "Steven",
    		scoresSam: [7.8,8.8,8.1,6.3,7.9],
    		scoresAdam: [8.3,8.5,8.4,7.3,8.8],
    		scoresJim: [8.8,8.3,8.8,8.9,9.1],
    		argu: "While Jim has the lowest overall GPA, he seems to be better prepared for an Engineering Program of the three, and seems to be more focused and dedicated according to the available information. Adam is a close second but there is some doubt cast by the lack of recommendations from his summer internship in a related field. Sam seems unsuitable in temperament as he has not selected a major and shows something of a history of possible bad judgement.",
    		flag: 3,
    		gender: 1
    	   },
    	   {
    		name: "Margaret",
    		scoresSam: [9.7,10,9.5,9.6,9.5],
    		scoresAdam: [8.9,9,8.5,9,9],
    		scoresJim: [9.8,9.8,10,9.5,10],
    		argu: "Out of all three candidates, Jim demonstrates the most discipline in his academic pursuits despite coming from a disadvantaged household and studying at a mediocre school. He took the necessary AP classes, excelled academically despite challenges and lack of role models (including his brother and coming from a single parents household), won first place in Math competition and knows what he wants to major in which is in line with what the college offers. He is an excellent candidate for these reasons. Sam doesn't know what he wants to major in, so his choice of college is in question. Although he has the highest SAT and overall test scores, his achievements do not surpass those of Jim who worked past challenging circumstances and who may have achieved equal tests scores were he to attend a similar school or encounter fewer challenges. He is the second choice here because of the reasons I listed as well as the listed disciplinary issues he encountered. Adam has the lowest test scores of the three despite studying at a better school than Jim and having good role models and a good environment to learn in. He has not demonstrated an interest in challenging himself and is only an okay candidate compared to the other two. He would be my third choice.",
    		flag: 3,
    		gender: 2
    	   },
    	   {
    		name: "Michael",
    		scoresSam: [7,8.1,5.4,7,7.5],
    		scoresAdam: [7.9,7.1,7.7,8.1,8.6],
    		scoresJim: [9.1,8.8,9.8,7.9,9.8],
    		argu: "I think either Jim Jones or Adam Adams are the best candidates for the program. Sam Smith shows some innate talent and good family environment but hasn't had as much experience and recommendations in engineering as Sam and Jim. If I had to choose between Sam or Jim I'd likely pick Jim since he is so advanced at math and it is one of the most crucial components of engineering, regardless of the type.",
    		flag: 3,
    		gender: 1
    	   }
        ];
        _.each(voters, function(voter) {
            Voters.insert(voter);
            console.log("inserted voter " + voter);
        });
    }
});

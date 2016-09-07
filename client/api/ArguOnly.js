Template.ArguOnly.onRendered(function() {
    this.autorun(function() {
    var height = 400, width = 750;
    var i, j, k;

    //data

    // backend code
    var taskId = FlowRouter.getParam("taskId");
    var taskInfo = Tasks.findOne({"_id": taskId});
    var chairScores = Scores.findOne({"userId": Meteor.userId()});
    var votersInfo = Meteor.users.findOne({_id: Meteor.userId()});

    // TODO: change to subscribe ready later
    if (!taskInfo || !chairScores || !votersInfo) {
        return;
    }

    taskInfo.voters = votersInfo.profile.voters;

    var criteria_num = taskInfo.criteriaNum, candidate_num = taskInfo.candidateNum, user_num = taskInfo.voterNum + 1;

    var voters = new Array(user_num + 1);

    for (var i = 1; i < user_num; i++) {
        var voterName = taskInfo.voters[i-1];
        voters[i] = Voters.findOne({"name": voterName});
    }


    var voter = new Array(criteria_num + 1);
    for (var i = 0; i < criteria_num + 1; i++) {
        voter[i] = new Array(candidate_num + 1);
        for (var j = 0; j < candidate_num + 1; j++) {
            voter[i][j] = new Array(user_num + 1).fill(0);
        }
    }

    for (var i = 0; i <= criteria_num; i++) {
        for (var j = 1; j <= candidate_num; j++) {
            voter[i][j][1] = chairScores.score[i][j];
        }
    }

    for (var i = 0; i <= criteria_num; i++) {
        for (var k = 2; k <= user_num; k++) {
            voter[i][1][k] = voters[k-1].scoresSam[i];
            voter[i][2][k] = voters[k-1].scoresAdam[i];
            voter[i][3][k] = voters[k-1].scoresJim[i];
        }
    }

    var voter_info = new Array(user_num - 1);
    for (var i = 0; i < user_num - 1; i++) {
        voter_info[i] = {code: i+1, name: taskInfo.voters[i]};
    }

    // arguments
    var argu = new Array(user_num + 1);
    for (var i = 1; i < user_num; i++) {
        argu[i] = voters[i].argu;
    }

    // end backend

    $("#div-vis").empty();
    $("#div-vis").html('<svg class="col-md-1 col-sm-1 col-xs-1"></svg><svg class="side_panel col-md-2 col-sm-2 col-xs-2"></svg><div class="argument_panel col-md-5 col-sm-4 col-xs-6"></div>');

                        var height = 400, width = 750;
                        var i, j, k;

    //data


                        var data1 = [{rect:0, name:"Overall"},{rect:1, name:"Academic"},{rect:2, name:"Activities"},{rect:3, name:"Recommendation Letter"},{rect:4, name:"Readiness for Engineering"}];


                        var overall = new Array(criteria_num + 1);
                        var conflict1 = new Array(criteria_num + 1);
                        var conflict2 = new Array(criteria_num + 1);

                        for(i = 0; i <=criteria_num; i++){
                            overall[i]=new Array(candidate_num + 1);
                            conflict1[i]=new Array(candidate_num + 1);
                            conflict2[i]=new Array(candidate_num + 1);
                        }

                        calculateAvg();
                        calculateConflict1();
                        calculateConflict2();



                        var candidate_info = [{code:1, name:" "}, {code:2, name: "Sam"}, {code:3, name: "Adam"}, {code:4, name: "Jim"}];


                        //indivudial page hover

                        var left_padding_x = 30;
                        var left_padding_y = 20;
                        var svg = d3
                            .select(".side_panel")
                            .attr("width", 100)
                            .attr("height", height);

                        var voter_list_all =
                            svg
                                .append("g")
                                .attr("id", "v0");

                        voter_list_all
                            .append("text")
                            .attr("x", function(d){ return  left_padding_x + 25;})
                            .attr("y", function(d, i) {
                                return 14;
                            })
                            .text(function(d){
                                return "other members";
                            })
                            .style("text-anchor", "middle");
                        var voter_list =
                            svg
                                .append("g")
                                .selectAll("rect")
                                .data(voter_info)
                                .enter()
                                .append("g")
                                .attr("id", function(d, i){
                                    return "v" + (i + 1).toString();
                                })
                            ;

                        voter_list
                            .append("rect")
                            .attr("x", function(d){
                                return left_padding_x + 25 - d.name.length * 10 / 2;
                            })
                            .attr("y", function(d, i){
                                return 2 + left_padding_y * (i + 1);
                            })
                            .attr("height", left_padding_y)
                            .attr("width", function(d){
                                return d.name.length * 10;
                            })
                            .style("opacity", 0)
                            .style("border-radius", "100px")
                        ;

                        d3.select(".argument_panel").html("argument</br>" + argu[1]);

                        voter_list
                            .append("text")
                            .attr("x", function(d){ return  left_padding_x + 25;})
                            .attr("y", function(d, i) {
                                return 17 + left_padding_y * (i + 1);
                            })
                            .text(function(d){
                                return d.name;
                            })
                            .style("text-anchor", "middle")
                            .style("fill", "grey")
                            .style("font-size", "15px")
                            .on("mouseover", function(d){
                                if(this.parentNode.id != "v1"){
                                d3.select(this).style("fill", "white");
                                var id = "#v" + d.code.toString();
                                d3.selectAll(id).select("rect").style("fill", "grey").style("opacity", 1);

                                d3.select("#v1").select("rect").style("opacity", 0);
                                d3.select("#v1").select("text").style("fill", "grey");
                                for(i = 0; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        var score = voter[i][j][d.code];
                                        d3.select("#td" + i.toString() + j.toString()).html(score);
                                    }
                                d3.select(".argument_panel").html("argument</br>" + argu[d.code]);
                            }
                            })
                            .on("mouseout", function(d){

                                d3.select(this).style("fill", "grey");
                                var id = "#v" + d.code.toString();
                                d3.selectAll(id).select("rect").style("opacity", 0);

                                d3.select("#v1").select("rect").style("fill", "grey").style("opacity", 1);
                                d3.select("#v1").select("text").style("fill", "white");

                                for(i = 0; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        var score = overall[i][j];
                                        d3.select("#td" + i.toString() + j.toString()).html(score);
                                    }
                                d3.select(".argument_panel").html("argument</br>" + argu[1]);

                            });

                    d3.select("#v1").select("rect").style("fill", "grey").style("opacity", 1);
                    d3.select("#v1").select("text").style("fill", "white");



                    function calculateAvg(){
                        for(i = 0; i <= criteria_num; i++)
                        for(j = 1; j <= candidate_num; j++){

                            var sum = 0;
                            for(k = 1; k <= user_num; k++){
                                sum += voter[i][j][k];
                            }

                            sum /= user_num;
                            overall[i][j] = sum;
                        }
                    }

                    function calculateConflict1(){
                            var max = 0, max_j = 0, tmp = 0, sum = 0;

                            for(i = 0; i<=criteria_num; i++)
                                for(j = 0; j<=candidate_num; j++) {
                                    for(k = 1; k<=user_num; k++) {
                                        tmp =  (voter[i][j][k] - overall[i][j]) * (voter[i][j][k] - overall[i][j]);
                                        sum += tmp;
                                    }
                                    conflict1[i][j] = tmp;
                                }

                            for(i = 0; i<=criteria_num; i++){
                                max = 0, max_j = 0;
                                for(j = 0; j<=candidate_num; j++){
                                    if(conflict1[i][j] > max)
                                        max = conflict1[i][j], max_j = j;
                                }
                                for(j = 0; j <= candidate_num; j++){
                                    if(j != max_j)
                                        conflict1[i][j] = 0;
                                }
                            }

                    }

                    function calculateConflict2(){
                        var max = 0, max_j = 0;
                        for(i = 0; i<=criteria_num; i++)
                            for(j = 0; j<=candidate_num; j++){
                                conflict2[i][j] = Math.abs(overall[i][j] - voter[i][j][1]);
                            }

                        for(i = 0; i<=criteria_num; i++){
                            max = 0, max_j = 0;
                            for(j = 0; j<=candidate_num; j++){
                                if(conflict2[i][j] > max)
                                    max = conflict2[i][j], max_j = j;
                            }
                            for(j = 0; j <= candidate_num; j++){
                                    if(j != max_j)
                                        conflict2[i][j] = 0;
                                }
                        }

                    }

                            function q1(){
                                //multiple answers
                                var ans = new Array(0);
                                var max = 0;

                                for(i = 1; i <= candidate_num; i++){
                                    if(overall[0][i] > max)
                                        max = overall[0][i];
                                }

                                for(i = 1; i <= candidate_num; i++){
                                    if(overall[0][i] == max)
                                        ans.push(i);
                                }
                                return ans;
                            }

                            function q2(){
                                for(i = 1; i <= candidate_num; i++){
                                    if(conflict2[0][i] != 0)
                                        return [i];
                                }
                            }

                            function q3(){
                            //multiple answers
                                var max = 0, ans = new Array(0);
                                for(i = 1; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        if(conflict2[i][j] > max)
                                            max = conflict2[i][j];
                                    }
                                for(i = 1; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        if(conflict2[i][j] == max)
                                            ans.push(i.toString());
                                    }
                                return ans;
                            }

                            function q4(){
                                for(i = 1; i <= candidate_num; i++){
                                    if(conflict1[0][i] != 0)
                                        return [i];
                                }
                            }

                            function q5(){
                            //multiple answers
                                var max = 0, ans = new Array(0);
                                for(i = 1; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        if(conflict1[i][j] > max)
                                            max = conflict1[i][j];
                                    }
                                for(i = 1; i <= criteria_num; i++)
                                    for(j = 1; j <= candidate_num; j++){
                                        if(conflict1[i][j] == max)
                                            ans.push(i.toString());
                                    }
                                return ans;
                            }

                            function q6(){
                            //multiple answers
                                var max = 0, ans = new Array(0);
                                for(i = 1; i <= user_num; i++)
                                    for(j = 1; j < i; j++){
                                        if(Math.abs(voter[0][1][i] - voter[0][1][j]) > max)
                                            max = Math.abs(voter[0][1][i] - voter[0][1][j]);
                                    }
                                for(i = 1; i <= user_num; i++)
                                    for(j = 1; j < i; j++){
                                        if(Math.abs(voter[0][1][i] - voter[0][1][j]) == max)
                                            ans.push(j.toString() + i.toString());
                                    }
                                return ans;
                            }

                            function q7(){
                            //multiple answers
                                var max = 0, ans = new Array(0);
                                for(i = 2; i <= user_num; i++){
                                        if(Math.abs(voter[2][2][i] - voter[2][2][1]) > max)
                                            max = Math.abs(voter[2][2][i] - voter[2][2][1]);
                                    }
                                for(i = 2; i <= user_num; i++){
                                        if(Math.abs(voter[2][2][i] - voter[2][2][1]) == max)
                                            ans.push(i.toString());
                                    }
                                return ans;
                            }

                            function q8(){
                            //multiple answers
                                var min = 0x3f3f3f3f, ans = new Array(0);
                                for(i = 2; i <= user_num; i++){
                                        if(Math.abs(voter[4][3][i] - voter[4][3][1]) < min)
                                            min = Math.abs(voter[4][3][i] - voter[4][3][1]);
                                    }
                                for(i = 2; i <= user_num; i++){
                                        if(Math.abs(voter[4][3][i] - voter[4][3][1]) == min)
                                            ans.push(i.toString());
                                    }
                                return ans;
                            }


                                var q1A = q1();
                                var q2A = q2();
                                var q3A = q3();
                                var q4A = q4();
                                var q5A = q5();
                                var q6A = q6();
                                var q7A = q7();
                                var q8A = q8();

                                if (QuestionsR.findOne({userId: Meteor.userId()}) === undefined){
                                    QuestionsR.insert({q1: q1A, q2: q2A, q3: q3A, q4: q4A, q5: q5A, q6: q6A, q7: q7A, q8: q8A,userId: Meteor.userId()});
                                }

                                if ( Meteor.users.findOne({_id: Meteor.userId(), 'profile.group': {$exists: true}}) === undefined) {
                                    Meteor.users.update(
                                        {_id: Meteor.userId()},
                                        {$set:
                                            {
                                                "profile.group": overall,
                                            }
                                        }
                                    );
                                }

});
});

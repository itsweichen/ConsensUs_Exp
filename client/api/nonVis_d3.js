Template.NonVis.onRendered(function() {
    var height = 400, width = 750;
    var i, j, k;

    //data

    // backend code
    var taskId = FlowRouter.getParam("taskId");
    var taskInfo = Tasks.findOne({"_id": taskId});
    var chairScores = Scores.findOne({"userId": Meteor.userId()});

    // TODO: change to subscribe ready later
    if (!taskInfo || !chairScores) {
        return;
    }

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

    var voter_info = new Array(user_num);
    voter_info[0] = {code: 1, name: Meteor.user().username};

    for (var i = 1; i < user_num; i++) {
        voter_info[i] = {code: i+1, name: taskInfo.voters[i-1]};
    }

    // arguments
    var argu = new Array(user_num + 1);
    argu[1] = "";
    for (var i = 2; i <= user_num; i++) {
        argu[i] = voters[i-1].argu;
    }

    // end backend





    var data1 = [{rect:0, name:"Overall"},{rect:1, name:"Academic"},{rect:2, name:"Activities"},{rect:3, name:"Recommendation Letter"},{rect:4, name:"Readiness for Engineering"}];

    var overall = new Array(criteria_num + 1);
    for(i = 0; i <=criteria_num; i++){
        overall[i]=new Array(candidate_num + 1);
    }

    calculateAvg();


    var candidate_info = [{code:1, name:" "}, {code:2, name: "Sam"}, {code:3, name: "Adam"}, {code:4, name: "Jim"}];

    //data
    var table = d3.select('.main_panel')
    .append('table')
    .style("margin-top", "40px")
    ;
    var tr = table.selectAll('tr')
    .data(data1)
    .enter()
    .append('tr')
    .html(function(d){ return d.name;})
    .attr("id", function(d, i){ return "tr" + i.toString();})
    .style("border", "1px solid black");

    tr.selectAll("td")
    .data(d3.range(0, candidate_num))
    .enter()
    .append('td')
    .attr('id', function(d, i){
        return "td" + this.parentNode.id[2] + (i + 1).toString();})
        .style("border", "1px solid black")
        .html(function(d) {
            return overall[this.id[2]][this.id[3]].toString() + "&nbsp"; });

            table.insert('tr', ":first-child")
            .selectAll('td')
            .data(candidate_info)
            .enter()
            .append('td')
            .style("border", "1px solid black")
            .html(function(d){ return d.name; })


            //indivudial page hover

            var left_padding_x = 70;
            var left_padding_y = 20;
            var svg = d3
            .select(".side_panel")
            .attr("width", 100)
            .attr("height", height);

            svg
            .append("text")
            .text("Voters")
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + (left_padding_x + 25) + ", 50)");

            var voter_list_all =
            svg
            .append("g")
            .attr("id", "v0");

            voter_list_all
            .append("rect")
            .attr("x", left_padding_x + 25 - 15)
            .attr("y", function(d, i){
                return 63;
            })
            .attr("height", 20)
            .attr("width", 30)
            .attr("fill", "grey")
            .style("border-radius", "100px")
            ;
            voter_list_all
            .append("text")
            .attr("x", function(d){ return  left_padding_x + 25;})
            .attr("y", function(d, i) {
                return 78;
            })
            .text(function(d){
                return "ALL";
            })
            .style("text-anchor", "middle")
            .style("fill", "White")
            .style("font-size", "15px");

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
                return 63 + left_padding_y * (i + 1);
            })
            .attr("height", left_padding_y)
            .attr("width", function(d){
                return d.name.length * 10;
            })
            .style("opacity", 0)
            .style("border-radius", "100px")
            ;
            voter_list
            .append("text")
            .attr("x", function(d){ return  left_padding_x + 25;})
            .attr("y", function(d, i) {
                return 78 + left_padding_y * (i + 1);
            })
            .text(function(d){
                return d.name;
            })
            .style("text-anchor", "middle")
            .style("fill", "grey")
            .style("font-size", "15px")
            .on("mouseover", function(d){
                d3.select(this).style("fill", "white");
                var id = "#v" + d.code.toString();
                d3.selectAll(id).select("rect").style("fill", "grey").style("opacity", 1);

                d3.select("#v0").select("rect").style("opacity", 0);
                d3.select("#v0").select("text").style("fill", "grey");
                for(i = 0; i <= criteria_num; i++)
                for(j = 1; j <= candidate_num; j++){
                    var score = voter[i][j][d.code];
                    d3.select("#td" + i.toString() + j.toString()).html(score);
                }
                d3.select(".argument_panel").html("argument</br>" + argu[d.code]);

            })
            .on("mouseout", function(d){

                d3.select(this).style("fill", "grey");
                var id = "#v" + d.code.toString();
                d3.selectAll(id).select("rect").style("opacity", 0);

                d3.select("#v0").select("rect").style("fill", "grey").style("opacity", 1);
                d3.select("#v0").select("text").style("fill", "white");

                for(i = 0; i <= criteria_num; i++)
                for(j = 1; j <= candidate_num; j++){
                    var score = overall[i][j];
                    d3.select("#td" + i.toString() + j.toString()).html(score);
                }
                d3.select(".argument_panel").html("");

            });




            function calculateAvg(){
                for(i = 0; i <= criteria_num; i++)
                for(j = 1; j <= candidate_num; j++){
                    var sum = 0;
                    for(k = 1; k <= user_num; k++){
                        sum += voter[i][j][k];
                    }
                    sum /= user_num;
                    overall[i][j] = d3.round(sum, 1);
                }
            }
});

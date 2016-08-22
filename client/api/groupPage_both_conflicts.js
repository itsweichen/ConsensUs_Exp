Template.GroupPageBothConflicts.onRendered(function() {
    this.autorun(function() {

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
        voter_info[0] = {code: 1, name: Meteor.user().profile.nickname};

        for (var i = 1; i < user_num; i++) {
            voter_info[i] = {code: i+1, name: taskInfo.voters[i-1]};
        }

        // arguments
        var argu = new Array(user_num + 1);
        argu[1] = "";
        for (var i = 2; i <= user_num; i++) {
            argu[i] = voters[i-1].argu;
        }

        // end backend code

        $("#div-vis").empty();
        $("#div-vis").html('<svg id="left_side_panel"></svg><svg id="main_panel"></svg><div id ="right_side_div"></div><div id= "checkbox1_div"></div>');


        var height = 400, width = 750;
        var r = 10;
        var i, j, k;




        var svg = d3
        .select('#main_panel')
        .attr("height", height)
        .attr("width", width)
        .style("position", "absolute")
        //                       .style("margin-left", "300px")
        //                        .attr("transform", "translate(100, 0)")
        ;

        svg.append("text")
        .text("Not suitable")
        .attr("transform", "translate(180, 50)");

        svg.append("text")
        .text("Suitable")
        .style("text-anchor", "end")
        .attr("transform", "translate(580, 50)");

        svg.append("text")
        .text("Candidates")
        .attr("transform", "translate(605, 50)");



        var g = svg.append('g')
        .attr("height", height)
        .attr("width", width);

        var data1 = [{rect:0, name:"Overall"},{rect:1, name:"Academic"},{rect:2, name:"Activities"},{rect:3, name:"Recommendation Letter"},{rect:4, name:"Readiness for Engineering"}];



        var title_width = 170;
        var rect_height = 2, rect_width=400;

        var padding_x = 10;
        var padding_y = 70;

        var rect = g
        .selectAll('rect')
        .data(data1)
        .enter()
        .append('g')
        .classed("bar", true)
        .attr("id", function(d) { return "a" + d.rect.toString();})
        ;

        rect
        .append("text")
        .attr("x", title_width)
        .attr("y", function(d){return (d.rect + 1) * padding_y + 5})
        .attr("text-anchor", "end")
        .text(function(d){return d.name;});
        rect
        .append('rect')
        .attr("x", title_width + padding_x)
        .attr("width", rect_width)
        .attr("fill", "#C0C0C0")
        .attr('y', function(d, i){
            if(i == 0)
            return (d.rect + 1) * padding_y - r;
            else
            return (d.rect + 1) * padding_y;
        })
        .attr("height", function(d, i){
            if(i == 0)
            return r * 2;
            return rect_height;
        })
        .attr("rx", function(d, i){
            if(i == 0)
            return r;
            return 0;
        })
        .attr("ry", function(d, i){
            if(i == 0)
            return r;
            return 0;
        })
        ;

        //php
        //("#d27676", "#32b68b", "#3d8ee4"

        var color = new Array("#43a853", "#4285f4", "#fbbc05", "BlueViolet", "brown", "Chartreuse", "Cyan");
        // var criteria_num = 4, candidate_num = 3, user_num = 4;
        // var voter = [
        //     [[0,0,0,0,0],[0,7.84375,3,5.5,4.75],[0,8.45625,6,4.5,6.5],[0,7.906249999999999,5.5,7.75,6.75]],
        //     [[0,0,0,0,0],[0,8.475,2,1,2],[0,6.275,2,4,7],[0,7.425,8,9,5]],
        //     [[0,0,0,0,0],[0,7.725,3,8,4],[0,8.4,9,3,6],[0,6.775,7,7,8]],
        //     [[0,0,0,0,0],[0,8.45,5,6,9],[0,9.325,7,6,7],[0,8.85,5,6,6]],
        //     [[0,0,0,0,0],[0,6.725,2,7,4],[0,9.825,6,5,6],[0,8.575,2,9,8]]];


            var overall = new Array(criteria_num + 1);
            var conflict = new Array(criteria_num + 1);
            for(i = 0; i <=criteria_num; i++){
                overall[i]=new Array(candidate_num + 1);
                conflict[i]=new Array(candidate_num + 1);
            }

            // var argu = new Array(user_num + 1);
            //
            // argu[1] = "This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see others' votes. Hover over voters to see their score and arguments.Your task is to answer the questions below the visualization.This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see others' votes. Hover over voters to see their score and arguments.Your task is to answer the questions below the visualization.Your task is to answer the questions below the visualization.This is an average of everyone's scoreThis is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see others' votes. Hover over voters to see their others' votes. Hover over voters to see their score and arguments.Your task is to answer the questions below the visualization."
            // argu[2] = "score and arguments.Your task is to answer the questions below the visualization.This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see others' votes. Hover over voters to see their score and arguments.Your task is to answer the questions below the visualization.Your task is to answer the questions below the visualization.This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see ";
            // argu[3] = "score and arguments.Your task is to answer the questions below the visualization.This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see others' votes. Hover over voters to see their score and arguments.Your task is to answer the questions below the visualization.Your task is to answer the questions below the visualization.This is an average of everyone's score.Difference between committee and you indicates the amount of disagreement between you and other voters.Click on the dots to see ";
            //
            calculateAvg();
            calculateConflict();

            Conflict.insert({userId: Meteor.userId(), conflict: conflict});


            var str = "[";

            for(i = 0; i <= criteria_num; i++){
                for(j = 1; j <=candidate_num; j++){
                    str += "{row: ";
                    str += i;
                    str += ", col: ";
                    str += j;
                    str += ", score: ";
                    str += overall[i][j];
                    str += ", conflict: ";
                    str += conflict[i][j];
                    str += ", id:\""
                    str += i;
                    str += j;
                    str += "\""

                    if(i == criteria_num && j == candidate_num)
                    str += "}";
                    else
                    str += "},";
                }
            }
            str = str + "]";



            var data2 = eval('(' + str + ')');


            var circle = g
            .selectAll("circle")
            .data(data2)
            .enter()
            .append("g")
            .classed("handler", true)
            .attr("id", function(d) {return "a" + d.id.toString(); });

            circle
            .append("circle")
            .classed("large_dot", true)
            .attr("r", r)
            .attr("cx", function(d) { return d.x = title_width + padding_x + rect_width / 10 * d.score; })
            .attr("cy", function(d) { return d.y = padding_y * (d.row + 1); })
            .attr("fill", function(d) {return color[d.col - 1];})
            .attr("stroke", "black")
            .attr("stroke-width", "0.5")
            ;

            circle
            .append("circle")
            .classed("small_dot", true)
            .attr("r", 4)
            .attr("cx", function(d) {
                return title_width + padding_x + rect_width / 10 * voter[d.id[0]][d.id[1]][1]; })
                .attr("cy", function(d) { return d.y = padding_y * (d.row + 1); })
                .attr("fill", function(d) {return color[d.col - 1];})
                .attr("stroke", "black")
                .attr("stroke-width", "0.5")
                ;




                circle
                .append("text")
                .attr("x", function(d){return title_width + padding_x + rect_width / 10 * d.score;})
                .attr("y", function(d){return padding_y * (d.row + 1) - 9;})
                .text('');

                var path_max_length = 60;


                var defs = svg.append("defs");

                var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height", "130%");

                filter.append("feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 0.9)
                .attr("result", "blur");

                filter.append("feOffset")
                .attr("in", "blur")
                .attr("dx", 1)
                .attr("dy", 1)
                .attr("result", "offsetBlur");

                var feMerge = filter.append("feMerge");

                feMerge.append("feMergeNode")
                .attr("in", "offsetBlur")
                feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");
                //php

                // var voter_info  = [{ code:1,  name:"Yuan"}, { code:2,  name:"Brian"},
                //                     { code:3,  name:"Tom"}, { code:4,  name:"Rose"},
                //                     { code:5,  name:"Cindy"}, { code:6,  name:"Jake"}];
                // var voter_info  = [{ code:1,  name:"Yuan"}, { code:2,  name:"Brian"},
                // { code:3,  name:"Tom"}, { code:4,  name:"Rose"}];

                var refNode = d3.select("#a01").node();
                //revote panel part
                circle.on("click", function(d){
                    this.parentNode.insertBefore(this, refNode);
                    refNode = this;

                    if (d3.event.defaultPrevented) return;

                    d3.selectAll(".bar").classed("faded", true);
                    d3.selectAll(".handler").classed("faded", true);
                    d3.selectAll(".checkbox1").classed("faded", true);
                    d3.selectAll(".score_variance").classed("faded", true);
                    var a = d.id[0], b = d.id[1], id ="#a" + a.toString();
                    d3.select(id).classed("faded", false);

                    var score_bar = new Array(0, 0, 0, 0);
                    for(var i = 1; i <= user_num; i++)
                    {
                        score_bar[i] = voter[a][b][i];
                    }

                    var voter_circle =
                    g
                    .append("g")
                    .classed("voter_panel", true)
                    .selectAll("circle")
                    .data(voter_info)
                    .enter()
                    .append("g")
                    .classed("voter_dot", true)
                    .attr("id", function(d) {
                        return "b" + a.toString() + b.toString() + d.code.toString(); })
                        .attr("x", function(d, i){
                            d.x = title_width + padding_x + rect_width / 10 * score_bar[i + 1];
                            return d.x;
                        })
                        .attr("y", function(){
                            d.y = padding_y * (+a + 1);
                            return d.y;
                        })

                        ;

                        //enable drag




                        //php voter_who
                        var voter_who = 1;
                        var str = "#b" + a.toString() + b.toString() + voter_who.toString();


                        //let the red dot on top

                        d3.select(".voter_panel").node().appendChild(d3.select(str).node());



                        voter_circle
                        .append("circle")
                        .attr("r", 7)
                        .attr("cx", function(d, i) {
                            return d.x = title_width + padding_x + rect_width / 10 * score_bar[i + 1]; })
                            .attr("cy", function(d, i) { return d.y = padding_y * (+a + 1); })
                            .attr("fill", color[+b - 1])
                            .attr("opacity", 0.5)
                            ;
                            var refNode1_id = str[0] + str[1] + str[2] + str[3] + "1";
                            var refNode1 = d3.select(refNode1_id).node().parentNode.firstChild;
                            d3.selectAll(".voter_dot")
                            .on("mouseover", function(d){

                                d3.select("#argument_div")
                                .classed("argument", true)
                                .html(argu[d.code]);

                                if(this.id[3] == str[4]){
                                    d3.select(this).select("circle")
                                    .attr("stroke-width", "2px")
                                    .attr("stroke", function(d){
                                        return color[+b-1];
                                    })
                                    .attr("opacity", 1);
                                }
                                else{
                                    d3.select(this)
                                    .append("text")
                                    .attr("class", "voter_name_1")
                                    .text(function(d) {
                                        return d.name;})
                                        .style("text-anchor", "end")
                                        .attr("transform", function(d, i){
                                            return "translate(" + d.x + "," + (d.y + r + 4) + ") rotate(-40)";
                                        });
                                    }
                                })
                                .on("mouseout", function(d){
                                    d3.select(".voter_name_1").remove();

                                    d3.select(".argument").html("");

                                    this.parentNode.insertBefore(this, refNode1);
                                    refNode1 = this;
                                    if(this.id[3] == str[4]){

                                        d3.select(this).select("circle")
                                        .attr("stroke-width", 0)
                                        .attr("opacity", 0.5)
                                        ;}
                                    })
                                    ;

                                    var drag1 = d3.behavior.drag()
                                    .origin(Object)
                                    .on("dragstart", function(d){
                                        d3.select(this)
                                        .append("svg:image")
                                        .attr('x',function(d){ return d.x + 5;})
                                        .attr('y',function(d){ return d.y + 5;})
                                        .attr('width', 20)
                                        .attr('height', 24)
                                        .attr("xlink:href","../forbidden-sign.png");
                                    })
                                    .on('dragend', function(d){
                                        d3.select(this).select("image").remove();
                                    });

                                    d3.selectAll(".voter_dot").each(function(d){
                                        if(this.id!= str)
                                        d3.select(this).call(drag1);
                                    });


                                    if(str[2] != 0){

                                        d3.select(".voter_panel")
                                        .append("circle")
                                        .attr("r", 1)
                                        .attr("cx", function(d, i) {
                                            return d3.select(str).select("circle").attr("cx"); })
                                            .attr("cy", function(d, i) {
                                                return d3.select(str).select("circle").attr("cy"); })
                                                .attr("fill", "black")
                                                .attr("id", "voter_original_vote");
                                            }


                                            //ballon
                                            voter_circle
                                            .append("path")
                                            .attr("class", "float_path")
                                            .attr("d", function(d) {
                                                return "M " + d.x.toString() + " " + d.y.toString() + "L " + d.x.toString() + " " + d.y.toString();
                                            })
                                            .attr("stroke", "grey")
                                            .attr("stroke-width", "2")
                                            .attr("opacity", 0.6)
                                            ;
                                            //text: voter_name

                                            d3.select(str)
                                            .append("text")
                                            .attr("class", "voter_name")
                                            .text(function(d) {return d.name;})
                                            .style("text-anchor", "end")
                                            .attr("transform", function(d, i){
                                                d.x = title_width + padding_x + rect_width / 10 * score_bar[i + 1];
                                                d.y = padding_y * (+a + 1);
                                                return "translate(" + d.x + "," + (d.y + r + 4) + ") rotate(-40)";
                                            })
                                            ;
                                            //text: voter_score
                                            voter_circle
                                            .append("text")
                                            .attr("class", "voter_score")
                                            .text("")
                                            .attr("x", function(d) { return d.x;})
                                            .attr("y", function(d) { return d.y - 10;})
                                            .style("text-anchor", "middle")
                                            .style("font-size", "14px")
                                            .text('')
                                            ;
                                            //button1
                                            var button1 = d3.select(".voter_panel")
                                            .append("g")
                                            .attr("id", "r1");


                                            button1
                                            .append("rect")
                                            .attr("height", 20)
                                            .attr("width", 20)
                                            .attr("stroke-width", 1)
                                            .attr("stroke", "grey")
                                            .attr("fill", "grey")
                                            .style("filter", "url(#drop-shadow)")
                                            .style("border-radius", "100px")
                                            .attr("x", function(d){ return title_width + padding_x + rect_width + padding_x;})
                                            .attr("y", function(d) {return padding_y * (+a + 1) - 10;})
                                            .attr("rx", "3px")
                                            .attr("ry", "3px")
                                            ;

                                            button1
                                            .append("text")
                                            .attr("x", function(d){ return title_width + padding_x + rect_width + padding_x + 10;})
                                            .attr("y", function(d) {return padding_y * (+a + 1) + 7;})
                                            .text("X")
                                            .style("font-size", "18px")
                                            .style("text-anchor", "middle")
                                            .style("fill", "white")
                                            .on("mousedown", recover1)
                                            .on("mouseover", function(d){
                                                d3.select(this).style("fill", "grey");
                                                d3.select("#r1").select("rect").attr("fill", "white");
                                            })
                                            .on("mouseout", function(d){
                                                d3.select(this).style("fill", "white");
                                                d3.select("#r1").select("rect").attr("fill", "grey");

                                            })
                                            ;


                                            d3.selectAll(".legend").attr("opacity", function(d, i){
                                                if((i+1)!=b)
                                                return 0.07;
                                                return 1;
                                            });


                                            d3.selectAll(".checkbox").style("visibility", "hidden");


                                        });

                                        function recover1(){
                                            d3.select(".voter_panel").select("rect").style("filter", undefined);
                                            d3.selectAll(".bar").classed("faded", false);
                                            d3.selectAll(".handler").classed("faded", false);
                                            d3.selectAll(".checkbox1").classed("faded", false);
                                            d3.selectAll(".score_variance").classed("faded", false);
                                            d3.selectAll(".voter_panel").remove();
                                            d3.selectAll(".legend").attr("opacity", 1);
                                            d3.selectAll(".checkbox").style("visibility", "visible");

                                        }




                                        var float_height = 15;





                                        var drag1 = d3.behavior.drag()
                                        .origin(Object)
                                        .on("dragstart", function(d){
                                            d3.event.sourceEvent.preventDefault();


                                            d3.select(this)
                                            .append("svg:image")
                                            .attr('x',function(d){ return d.x + 5;})
                                            .attr('y',function(d){ return d.y + 5;})
                                            .attr('width', 20)
                                            .attr('height', 24)
                                            .attr("xlink:href","../forbidden-sign.png")
                                            .attr("opacity", 0);

                                        })
                                        .on("drag", function(d){
                                            d3.select(this).select("image")
                                            .attr("opacity", 1);
                                        })
                                        .on('dragend', function(d){
                                            d3.select(this).select("image").remove();
                                        });

                                        d3.selectAll(".handler").call(drag1);

                                        d3.selectAll(".handler")
                                        .on("mouseover", function(d){
                                            //do it on purpose: in order to click small dot behind big dot. The problem only exist in two conflicts condition.
                                            //                            this.parentNode.appendChild(this);

                                            d3.select(this).append("text")
                                            .text(function(d){
                                                return candid[d.col-1].candid;})
                                                .style("text-anchor", "end")
                                                .attr("transform", function(d, i){
                                                    return "translate(" + d.x + "," + (d.y + r + 4) + ") rotate(-40)";
                                                });

                                                d3.select(this).select(".large_dot")
                                                .attr("stroke-width", 1);
                                                d3.select(this).select(".small_dot")
                                                .attr("stroke-width", 1);
                                            })
                                            .on("mouseout", function(d){

                                                this.parentNode.insertBefore(this, refNode);
                                                refNode = this;

                                                d3.select(this).selectAll("text").remove();

                                                d3.select(this)
                                                .select("path")
                                                .style("stroke", "red")
                                                .style("stroke-width", "2px")
                                                ;

                                            })
                                            ;

                                            d3.selectAll(".large_dot")
                                            .on("mouseover", function(d){
                                                d3.select(this.parentNode)
                                                .append("path")
                                                .classed("conflict_bar", true)
                                                .attr("d", function(d){
                                                    var x1 = title_width + padding_x + rect_width / 10 * d.score - d.conflict * 15 / 2;
                                                    var x2 = title_width + padding_x + rect_width / 10 * d.score + d.conflict  * 15 / 2;
                                                    var y = padding_y * (d.row + 1) - 20;
                                                    return "M " + x1.toString() + " " + y.toString() +
                                                    "L " + x2.toString() + " " + y.toString();
                                                })
                                                .attr("stroke", "orangeRed")
                                                .attr("stroke-width", "2");

                                                d3.select(this.parentNode)
                                                .append("path")
                                                .classed("conflict_bar", true)
                                                .attr("d", function(d){
                                                    var x = title_width + padding_x + rect_width / 10 * d.score;
                                                    var y1 = padding_y * (d.row + 1);
                                                    var y2 = padding_y * (d.row + 1) - 20;
                                                    return "M " + x.toString() + " " + y1.toString() +
                                                    "L " + x.toString() + " " + y2.toString();
                                                })
                                                .attr("stroke", "orangeRed")
                                                .attr("stroke-width", "0.5");
                                            })
                                            .on("mouseout", function(d){
                                                d3.selectAll(".conflict_bar").remove();
                                                d3.select(this).select(".large_dot")
                                                .attr("stroke-width", 0.5);
                                                d3.select(this).select(".small_dot")
                                                .attr("stroke-width", 0.5);
                                            });

                                            d3.selectAll(".small_dot")
                                            .on("mouseover", function(d){
                                                d3.select(this.parentNode)
                                                .append("path")
                                                .classed("conflict_bar", true)
                                                .attr("d", function(d){
                                                    var x1 = title_width + padding_x + rect_width / 10 * d.score;
                                                    var x2 = title_width + padding_x + rect_width / 10 * voter[d.id[0]][d.id[1]][1];
                                                    var y = padding_y * (d.row + 1) - 20;
                                                    return "M " + x1.toString() + " " + (y).toString() +
                                                    "L " + x2.toString() + " " + (y).toString();
                                                })
                                                .attr("stroke", "orangeRed")
                                                .attr("stroke-width", "2");

                                                d3.select(this.parentNode)
                                                .append("path")
                                                .classed("conflict_bar", true)
                                                .attr("d", function(d){
                                                    var x = title_width + padding_x + rect_width / 10 * d.score;
                                                    var y1 = padding_y * (d.row + 1);
                                                    var y2 = padding_y * (d.row + 1) - 20;

                                                    return "M " + x.toString() + " " + (y1).toString() +
                                                    "L " + x.toString() + " " + (y2).toString();
                                                })
                                                .attr("stroke", "orangeRed")
                                                .attr("stroke-width", "2");

                                                d3.select(this.parentNode)
                                                .append("path")
                                                .classed("conflict_bar", true)
                                                .attr("d", function(d){
                                                    var x = title_width + padding_x + rect_width / 10 * voter[d.id[0]][d.id[1]][1];
                                                    var y1 = padding_y * (d.row + 1);
                                                    var y2 = padding_y * (d.row + 1) - 20;

                                                    return "M " + x.toString() + " " + (y1).toString() +
                                                    "L " + x.toString() + " " + (y2).toString();
                                                })
                                                .attr("stroke", "orangeRed")
                                                .attr("stroke-width", "2");
                                            })
                                            .on("mouseout", function(d){
                                                d3.selectAll(".conflict_bar").remove();
                                                d3.select(this).select(".large_dot")
                                                .attr("stroke-width", 0.5);
                                                d3.select(this).select(".small_dot")
                                                .attr("stroke-width", 0.5);
                                            });



                                            /* legend */
                                            var candid = [{candid: "Sam"}, {candid: "Adam"}, {candid: "Jim"}];
                                            var legend_height = 15;
                                            var legend_padding = 17;
                                            var legend = d3
                                            .select("#main_panel")
                                            .append("g")
                                            .selectAll("g")
                                            .data(candid)
                                            .enter()
                                            .append('g')
                                            .attr('class', 'legend')
                                            .classed("side_panel", true)
                                            .attr("x", 0)
                                            .attr("y", function(d, i) {return i * legend_height + 0;})
                                            .attr("transform", "translate(" + (title_width + rect_width + 50) + "," + 65 + ")");


                                            legend.append('circle')
                                            .attr('cx', 10)
                                            .attr('cy', function(d, i) {
                                                return i * legend_height;
                                            })
                                            .attr("r", 5)
                                            .style('fill', function(d, i) { return color[i];})
                                            .style('stroke', function(d, i) {return color[i];});

                                            legend.append('text')
                                            .attr('x', 25)
                                            .attr('y', function(d, i) {
                                                return i * legend_height + 5;})
                                                .text(function(d) { return d.candid; });

                                                //little circle and large circle

                                                var little_and_large_circle = d3
                                                .select("#main_panel")
                                                .append("g")
                                                .attr("transform", "translate(" + (title_width + rect_width + 50) + "," + 65 + ")");

                                                little_and_large_circle
                                                .append("circle")
                                                .attr('cx', -5)
                                                .attr('cy', function(d, i) {
                                                    return 125;
                                                })
                                                .attr("r", 9.5)
                                                .style('fill', "Lightgrey")
                                                .style('stroke', "black")
                                                .style("stroke-width", 1);

                                                little_and_large_circle
                                                .append('text')
                                                .attr('x', 7)
                                                .attr('y', 129)
                                                .style("font-size", "12px")
                                                .text("Committee");

                                                little_and_large_circle
                                                .append("circle")
                                                .attr('cx', -5)
                                                .attr('cy', 143)
                                                .attr("r", 4)
                                                .style('fill', "Lightgrey")
                                                .style('stroke', "black")
                                                .style("stroke-width", 1);

                                                little_and_large_circle
                                                .append('text')
                                                .attr('x', 8)
                                                .attr('y', 146)
                                                .style("font-size", "12px")
                                                .text("You")

                                                var score_variance_image =
                                                d3
                                                .select("#main_panel")
                                                .append("g")
                                                .attr("transform", "translate(" + (title_width + rect_width + 50) + "," + 105 + ")")
                                                .classed("side_panel", true)
                                                .classed("score_variance", true)
                                                ;


                                                score_variance_image
                                                .append("image")
                                                .attr('x',function(d){ return -14;})
                                                .attr('y',function(d){ return candidate_num * legend_height + legend_padding * 4 - 9;})
                                                .attr('width', 80)
                                                .attr('height', 80)
                                                .attr("xlink:href","../conflict between committee and you.png");

                                                score_variance_image
                                                .append("text")
                                                .attr("x", -14)
                                                .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 58;})
                                                .style("font-size", "12px")
                                                .text("Conflict between");
                                                score_variance_image
                                                .append("text")
                                                .attr("x", -14)
                                                .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 70;})
                                                .style("font-size", "12px")
                                                .text("committee & you")

                                                score_variance_image
                                                .append("image")
                                                .attr('x',function(d){ return -14;})
                                                .attr('y',function(d){ return candidate_num * legend_height + legend_padding * 4 + 73;})
                                                .attr('width', 65)
                                                .attr('height', 65)
                                                .attr("xlink:href","../conflict among committee.png");

                                                score_variance_image
                                                .append("text")
                                                .attr("x", -14)
                                                .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 132;})
                                                .style("font-size", "12px")
                                                .text("Conflict among");
                                                score_variance_image
                                                .append("text")
                                                .attr("x", -14)
                                                .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 147;})
                                                .style("font-size", "12px")
                                                .text("committee")



                                                /* checkbox */
                                                var check_box = d3
                                                .select("#right_side_div")
                                                .append("div")
                                                .selectAll("div")
                                                .data(d3.range(0, candidate_num))
                                                .enter()
                                                .append("div")
                                                .classed("side_panel", true)
                                                .style("position", "absolute")
                                                .style("left", 720 +"px")
                                                .style("top", function(d, i) {
                                                    return  (55 +  legend_height * i).toString() + "px";})
                                                    .append('input')
                                                    .attr("type", "checkbox")
                                                    .property("checked", true)
                                                    .classed("checkbox", true)

                                                    .attr("id", function(d, i) { return "c" + (i + 1).toString()});



                                                    //axis
                                                    var xScale = d3.scale.linear().domain([0, 10]).range([title_width + padding_x, title_width + padding_x + rect_width]);

                                                    var xAxis = d3.svg.axis()
                                                    .scale(xScale)
                                                    //            .innerTickSize([8])
                                                    .outerTickSize([3])
                                                    //               .tickSize([6, 100])
                                                    .tickPadding([5])
                                                    .orient("bottom")
                                                    .ticks(11)
                                                    //     .tickValues([" "," "," "," "," "," "," "," "," "," "," "])
                                                    ;

                                                    d3.selectAll(".bar").append("g")
                                                    .attr("transform", function(d, i){
                                                        var y = (i + 1) * padding_y;
                                                        return "translate(" + 0 + "," + y + ")"

                                                    })
                                                    .classed("axis",true).call(xAxis).style("visibility", "hidden");

                                                    check_box.on("click", function(d){

                                                        var id = new Array(0, 0, 0, 0);
                                                        var candid = d3.select(this).node();
                                                        for(var i = 0; i <= criteria_num; i++)
                                                        {
                                                            id[i] = "#a" + i + candid.id[1];
                                                            if(this.checked == true) {
                                                                d3.select(id[i]).style("visibility", "visible");
                                                            }
                                                            else {
                                                                d3.select(id[i]).style("visibility", "hidden");
                                                            }

                                                        }




                                                    });

                                                    var check_box1 = d3
                                                    .select("#checkbox1_div")
                                                    .classed("checkbox1", true)
                                                    .classed("side_panel", true)
                                                    .style("position", "absolute")
                                                    .style("left", (720).toString() + "px")
                                                    .style("top", function() { return (80 + legend_height * candidate_num).toString() + "px";})
                                                    .append('input')
                                                    .attr('type','checkbox')
                                                    .property("checked", false);

                                                    d3.select(".checkbox1")
                                                    .append("text")
                                                    .text("Scale");

                                                    check_box1.on("click", function(d){

                                                        if(this.checked == true){
                                                            d3.selectAll(".axis").style("visibility", "visible");
                                                        }
                                                        else{
                                                            d3.selectAll(".axis").style("visibility", "hidden");
                                                        }
                                                    });


                                                    //indivudial page hover

                                                    var left_padding_x = 35;
                                                    var left_padding_y = 20;
                                                    var svg1 = d3
                                                    .select("#left_side_panel")
                                                    .attr("width", 100)
                                                    .attr("height", height);
                                                    svg1
                                                    .append("text")
                                                    .text("Voters")
                                                    .style("text-anchor", "middle")
                                                    .attr("transform", "translate(" + (left_padding_x + 25) + ", 50)");

                                                    var voter_list_all =
                                                    svg1
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
                                                    svg1
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

                                                        d3.selectAll(".handler").style("visibility", "hidden");

                                                        //if it's side page, we don't want the voter's dot to show
                                                        if(d3.select(".checkbox").style("visibility") == "visible"){
                                                            for(var i = 0; i <= criteria_num; i++)
                                                            for(var j = 1; j <= candidate_num; j++)
                                                            {
                                                                g.
                                                                append("circle")
                                                                .attr("class", "indivudial_vote")
                                                                .attr("id", "v" + i.toString() + j.toString())
                                                                .attr("r", r)
                                                                .attr("cx", function(){
                                                                    return title_width + padding_x + rect_width / 10 * (voter[i][j][d.code]);
                                                                })
                                                                .attr("cy", padding_y * (i + 1))
                                                                .attr("fill", function(d) {return color[j - 1];});

                                                            }
                                                        }

                                                        d3.select("#argument_div")
                                                        .classed("argument", true)
                                                        .html("argument</br>" + argu[d.code]);

                                                    })
                                                    .on("mouseout", function(d){
                                                        d3.selectAll(".indivudial_vote").remove();

                                                        d3.select(this).style("fill", "grey");
                                                        var id = "#v" + d.code.toString();
                                                        d3.selectAll(id).select("rect").style("opacity", 0);

                                                        d3.select("#v0").select("rect").style("fill", "grey").style("opacity", 1);
                                                        d3.select("#v0").select("text").style("fill", "white");

                                                        d3.selectAll(".handler").style("visibility", "visible");

                                                        d3.select(".argument").html("");

                                                    })
                                                    ;


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
                                                    // function calculateConflict(){
                                                    //     var conflict_max = 0;

                                                    //     for(i = 0; i<=criteria_num; i++){
                                                    //         for(j = 0; j<=candidate_num; j++){
                                                    //             var conflict_val = 0;

                                                    //             for(k = 2; k<=user_num; k++){
                                                    //                 conflict_val = conflict_val + Math.abs(parseFloat(voter[i][j][k]) - parseFloat(voter[i][j][1]));
                                                    //             }

                                                    //             conflict_val = conflict_val / (user_num - 1);
                                                    //             conflict[i][j] = conflict_val;

                                                    //             if(conflict_val > conflict_max)
                                                    //                 conflict_max = conflict_val;
                                                    //         }
                                                    //     }


                                                    //     for(i = 0; i<=criteria_num; i++) {
                                                    //         for (j = 1; j <= candidate_num; j++) {
                                                    //             conflict[i][j] = conflict[i][j] / conflict_max;
                                                    //         }
                                                    //     }


                                                    // }

                                                    function calculateConflict(){
                                                        var criteria_id = 0;
                                                        var candidate_id = 0;
                                                        var user_id = 0;

                                                        var data = 0.00;
                                                        var avg = 0.00;
                                                        var max = 0.00;

                                                        for(criteria_id = 0; criteria_id<=criteria_num; criteria_id++){
                                                            for(candidate_id = 0; candidate_id<=candidate_num; candidate_id++){
                                                                var temp = 0.00;
                                                                data = 0.00;
                                                                avg = 0.00;

                                                                for(user_id = 1; user_id<=user_num; user_id++){

                                                                    data = parseFloat(voter[criteria_id][candidate_id][user_id]);
                                                                    avg = parseFloat(overall[criteria_id][candidate_id]);
                                                                    temp = temp + (data - avg) * (data - avg);


                                                                }
                                                                temp = temp/user_num;

                                                                conflict[criteria_id][candidate_id] = temp;

                                                            }
                                                        }
                                                    }

    function q1(){
       var scores = new Array(candidate_num + 1);
       for(var i = 1; i <= candidate_num; i++){
           scores[i] = overall[0][i];
       }
       return scores;
    }

    function q2(){
       var scores = new Array(candidate_num + 1);
       for(var i = 1; i <= candidate_num; i++){
           scores[i] = overall[3][i];
       }
       return scores;
    }

    function q3(){
   var scores = new Array(candidate_num + 1);
   for(var i = 1; i <= user_num; i++)
       scores[i] = voter[0][1][i];
   return scores;
   }

function q4(){
   var scores = new Array(candidate_num + 1);
   for(var i = 1; i <= user_num; i++) {
       scores[i] = voter[0][2][i];
   }
   return scores;
}

function q5(){
   var scores = new Array(candidate_num + 1);
   for(var i = 1; i <= user_num; i++) {
       scores[i] = voter[0][3][i];
   }
   return scores;
}

function q6(){
   var scores = new Array(criteria_num + 1);
   for(var i = 0; i <= criteria_num; i++){
       scores[i] = new Array(candidate_num + 1);
   }

   for(var i = 1; i <= criteria_num; i++)
       for(var j = 1; j <= candidate_num; j++){
           scores[i][j] = Math.abs(voter[i][j][0] - overall[i][j]);
       }
   return scores;
}

function q7(){
   return overall[0];
}

var q1A = q1();
var q2A = q2();
var q3A = q3();
var q4A = q4();
var q5A = q5();
var q6A = q6();
var q7A = q7();
console.log("q1A" + q1A);
if (QuestionsR.findOne({userId: Meteor.userId()}) === undefined){
    QuestionsR.insert({q1: q1A, q2: q2A, q3: q3A, q4: q4A, q5: q5A, q6: q6A, q7: q7A, userId: Meteor.userId()});
}




                                                });
                                            });

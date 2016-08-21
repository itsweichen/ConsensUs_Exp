Template.GroupPage.onRendered(function() {
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


        // $("#vis-row").empty();
        // $("#vis-row").html("<div class='col-md-9'><svg id='left_side_panel'></svg><svg id='main_panel'></svg><div id ='right_side_div'></div><div id= 'checkbox1_div'></div></div><div class='col-md-3'><div id ='argument_div' style='margin-top: 37px;'></div></div>");

        var height = 450, width = 750;
        var r = 10;
        var i, j, k;

        var svg = d3
        .select('#main_panel')
        .attr("height", height)
        .attr("width", width)
        .style("position", "absolute");

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

        var color = new Array("green", "blue", "orange", "BlueViolet", "brown", "Chartreuse", "Cyan");

        var overall = new Array(criteria_num + 1);
        var conflict = new Array(criteria_num + 1);
        for(i = 0; i <=criteria_num; i++){
            overall[i]=new Array(candidate_num + 1);
            conflict[i]=new Array(candidate_num + 1);
        }

        calculateAvg();
        calculateConflict();


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
        .attr("r", r)
        .attr("cx", function(d) { return d.x = title_width + padding_x + rect_width / 10 * d.score; })
        .attr("cy", function(d) { return d.y = padding_y * (d.row + 1); })
        .attr("fill", function(d) {return color[d.col - 1];});




        circle
        .append("text")
        .attr("x", function(d){return title_width + padding_x + rect_width / 10 * d.score;})
        .attr("y", function(d){return padding_y * (d.row + 1) - 9;})
        .text('');

        var path_max_length = 75;
        circle
        .append("path")
        .classed("middle-path", true)
        .classed("conflict_bar", true)
        .attr("d", function(d){
            var x = title_width + padding_x + rect_width / 10 * d.score;
            var y = padding_y * (d.row + 1);
            return "M " + x.toString() + " " + (y - d.conflict/2 * path_max_length).toString() +
            "L " + x.toString() + " " + (y + d.conflict/2 * path_max_length).toString();
        })
        .attr("stroke", "Crimson")
        .attr("stroke-width", "2")
        ;



        circle
        .append("path")
        .classed("upper-path", true)
        .classed("conflict_bar", true)
        .attr("d", function(d){
            var x = title_width + padding_x + rect_width / 10 * d.score;
            var y = padding_y * (d.row + 1) - d.conflict/2 * path_max_length;
            return "M " + (x - r/2).toString() + " " + y.toString() +
            "L " + (x + r/2).toString() + " " + y.toString();
        })
        .attr("stroke", "Crimson")
        .attr("stroke-width", "2");


        circle
        .append("path")
        .classed("lower-path", true)
        .classed("conflict_bar", true)
        .attr("d", function(d){
            var x = title_width + padding_x + rect_width / 10 * d.score;
            var y = padding_y * (d.row + 1) + d.conflict/2 * path_max_length;
            return "M " + (x - r/2).toString() + " " + y.toString() +
            "L " + (x + r/2).toString() + " " + y.toString();
        })
        .attr("stroke", "Crimson")
        .attr("stroke-width", "2");
        circle
        .append("circle")
        .classed("middle-dot", true)
        .classed("conflict_bar", true)
        .attr("cx", function(d){ return d.x;})
        .attr("cy", function(d){ return d.y;})
        .attr("r", 2)
        .attr("fill", "Crimson");

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
                                    .attr("id", "r1")
                                    .on("mousedown", recover1);


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

                                    d3.select(this).select("circle")
                                    .attr("stroke-width", "2px")
                                    .attr("stroke", function(d){
                                        return color[this.parentNode.id[2]-1];
                                    });

                                    d3.select(this).append("text")
                                    .text(function(d){
                                        return candid[d.col-1].candid;})
                                        .style("text-anchor", "end")
                                        .attr("transform", function(d, i){
                                            return "translate(" + d.x + "," + (d.y + r + 4) + ") rotate(-40)";
                                        });

                                        d3.select(this)
                                        .select("path")
                                        .style("stroke", "OrangeRed")
                                        .style("stroke-width", "3px")
                                        ;
                                    })
                                    .on("mouseout", function(d){
                                        this.parentNode.insertBefore(this, refNode);
                                        refNode = this;

                                        d3.select(this).select("circle")
                                        .attr("stroke-width", 0);
                                        d3.select(this).selectAll("text").remove();

                                        d3.select(this)
                                        .select("path")
                                        .style("stroke", "red")
                                        .style("stroke-width", "2px")
                                        ;

                                    })
                                    ;




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
                                        .attr('x',function(d){ return -17;})
                                        .attr('y',function(d){ return candidate_num * legend_height + legend_padding * 4 -10;})
                                        .attr('width', 20)
                                        .attr('height', 50)
                                        .attr("xlink:href","../score_variance.png");

                                        score_variance_image
                                        .append("text")
                                        .attr("x", 5)
                                        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 8;})
                                        .text("Difference");
                                        score_variance_image
                                        .append("text")
                                        .attr("x", 5)
                                        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 20;})
                                        .text("between");
                                        score_variance_image
                                        .append("text")
                                        .attr("x", 5)
                                        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 32;})
                                        .text("committee & you");



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
                                            return  (53 +  legend_height * i).toString() + "px";})
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
                                            .style("top", function() { return (100 + legend_height * candidate_num).toString() + "px";})
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
                                                .html(argu[d.code]);

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

                                            function calculateConflict(){
                                                var conflict_max = 0;

                                                for(i = 0; i<=criteria_num; i++){
                                                    for(j = 0; j<=candidate_num; j++){
                                                        var conflict_val = 0;

                                                        for(k = 2; k<=user_num; k++){
                                                            conflict_val = conflict_val + Math.abs(parseFloat(voter[i][j][k]) - parseFloat(voter[i][j][1]));
                                                        }

                                                        conflict_val = conflict_val / (user_num - 1);
                                                        conflict[i][j] = conflict_val;

                                                        if(conflict_val > conflict_max)
                                                        conflict_max = conflict_val;
                                                    }
                                                }


                                                for(i = 0; i<=criteria_num; i++) {
                                                    for (j = 1; j <= candidate_num; j++) {
                                                        conflict[i][j] = conflict[i][j] / conflict_max;
                                                    }
                                                }
                                            }

    });


});

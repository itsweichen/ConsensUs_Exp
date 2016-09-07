Template.VisExampleArguOnly.onRendered(function() {
    var height = 400, width = 750;
    var i, j, k;

    //data

    var voter_info  = [{ code:1,  name:"Member1"}, { code:2,  name:"Member2"},
                                    { code:3,  name:"Member3"}];

    var criteria_num = 4, candidate_num = 3, user_num = 4;
    var voter = [
        [[0,0,0,0,0],[0,7.84375,3,5.5,4.75],[0,8.45625,6,4.5,6.5],[0,7.9,5.5,7.75,6.75]],
        [[0,0,0,0,0],[0,8.475,2,1,2],[0,6.275,2,4,7],[0,7.425,8,9,5]],
        [[0,0,0,0,0],[0,7.725,3,8,4],[0,8.4,9,3,6],[0,6.775,7,7,8]],
        [[0,0,0,0,0],[0,8.45,5,6,9],[0,9.325,7,6,7],[0,8.85,5,6,6]],
        [[0,0,0,0,0],[0,6.725,2,7,4],[0,9.825,6,5,6],[0,8.575,2,9,8]]];



    // arguments
    var argu = new Array(user_num + 1);
    argu[1] = "This is the arguments written by Member1 for why s/he prefer the candidate.";
    argu[2] = "Arguments written by Member2 for why s/he prefer the candidate.";
    argu[3] = "You will see the true arguments in the next page.";

    // end backend



                        var height = 400, width = 750;
                        var i, j, k;

    //data


                        var data1 = [{rect:0, name:"Overall"},{rect:1, name:"Academic"},{rect:2, name:"Activities"},{rect:3, name:"Recommendation Letter"},{rect:4, name:"Readiness for Engineering"}];


                        var overall = new Array(criteria_num + 1);
                        for(i = 0; i <=criteria_num; i++){
                                overall[i]=new Array(candidate_num + 1);
                        }

                        calculateAvg();


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





Template.VisExampleVis.onRendered(function() {

        // backend code

        var voter_info  = [{ code:1,  name:"You"}, { code:2,  name:"Member1"},
                                        { code:3,  name:"Member2"}, { code:4,  name:"Member3"}];
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
        .style("position", "absolute");

        svg.append("text")
        .text("Not suitable")
        .style("fill", "#c0c0c0")
        .attr("transform", "translate(180, 50)");

        svg.append("text")
        .text("Suitable")
        .style("fill", "#c0c0c0")
        .style("text-anchor", "end")
        .attr("transform", "translate(580, 50)");

        svg.append("text")
        .text("Candidates")
        .attr("transform", "translate(610, 50)");



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
        var criteria_num = 4, candidate_num = 3, user_num = 4;
        var voter = [
            [[0,0,0,0,0],[0,7.84375,3,5.5,4.75],[0,8.45625,6,4.5,6.5],[0,7.9,5.5,7.75,6.75]],
            [[0,0,0,0,0],[0,8.475,2,1,2],[0,6.275,2,4,7],[0,7.425,8,9,5]],
            [[0,0,0,0,0],[0,7.725,3,8,4],[0,8.4,9,3,6],[0,6.775,7,7,8]],
            [[0,0,0,0,0],[0,8.45,5,6,9],[0,9.325,7,6,7],[0,8.85,5,6,6]],
            [[0,0,0,0,0],[0,6.725,2,7,4],[0,9.825,6,5,6],[0,8.575,2,9,8]]];


        var overall = new Array(criteria_num + 1);
        var conflict1 = new Array(criteria_num + 1);
        var conflict2 = new Array(criteria_num + 1);

        for(i = 0; i <=criteria_num; i++){
            overall[i]=new Array(candidate_num + 1);
            conflict1[i]=new Array(candidate_num + 1);
            conflict2[i]=new Array(candidate_num + 1);
        }

        var argu = new Array(user_num + 1);

        argu[1] = "";
        argu[2] = "Arguments written by Member2 for why s/he prefer the candidate.";
        argu[3] = "You will see the true arguments in the next page.";
        argu[4] = "You will see the true arguments in the next page.";

        calculateAvg();
        calculateConflict1();
        calculateConflict2();


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
                str += conflict1[i][j];
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
        .attr("r", 4.5)
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
//cursor
            d3.selectAll(".handler").style("cursor", "initial");
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
            });

        //enable drag

        //php voter_who
        var voter_who = 1;
        var str = "#b" + a.toString() + b.toString() + voter_who.toString();


        //let the red dot on top

        d3.select(".voter_panel").node().appendChild(d3.select(str).node());



        voter_circle
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d, i) {
            return d.x = title_width + padding_x + rect_width / 10 * score_bar[i + 1]; })
            .attr("cy", function(d, i) { return d.y = padding_y * (+a + 1); })
            .attr("fill", color[+b - 1])
            .attr("opacity", 0.5);

        var refNode1_id = str[0] + str[1] + str[2] + str[3] + "1";
        var refNode1 = d3.select(refNode1_id).node().parentNode.firstChild;
        d3.selectAll(".voter_dot")
            .on("mouseover", function(d){

                d3.select("#argument_div")
                .classed("argument", true)
                .html(argu[d.code]);


                    d3.select(this).select("circle")
                    .attr("stroke-width", "1px")
                    .attr("stroke", function(d){
                        return "black";
                    })
                    .attr("opacity", 1);

                if(("#" + this.id) != str){
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
                d3.select(this).select("circle")
                    .attr("stroke-width", 0)
                    .attr("opacity", 0.5)
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


        // if(str[2] != 0){

        //     d3.select(".voter_panel")
        //     .append("circle")
        //     .attr("r", 1)
        //     .attr("cx", function(d, i) {
        //         return d3.select(str).select("circle").attr("cx"); })
        //         .attr("cy", function(d, i) {
        //             return d3.select(str).select("circle").attr("cy"); })
        //             .attr("fill", "black")
        //             .attr("id", "voter_original_vote");
        // }


        //text: voter_name

        d3.select(str)
        .append("text")
        .attr("class", "voter_name")
        .text(function(d) {return d.name;})
        .style("text-anchor", "end")
        .style("fill", "grey")
        .attr("transform", function(d, i){
            d.x = title_width + padding_x + rect_width / 10 * score_bar[i + 1];
            d.y = padding_y * (+a + 1);
            return "translate(" + d.x + "," + (d.y + r + 4) + ") rotate(-40)";
        })
        ;

        d3.select(str)
        .select("circle")
        .attr("r", 5)
        .style("stroke", function(d){
            //return color[this.parentNode.id[2] - 1];
            return "black";
        })
        .style("stroke-width", "1px")
        .style("opacity", 1);

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
        //cursor
        d3.selectAll(".handler").style("cursor", "zoom-in");
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
    if(d3.select(".checkbox").style("visibility") == "visible"){
        d3.select(this).style("cursor", "zoom-in");
    }
    d3.select(this).append("text")
        .attr("id", "current_name")
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

            d3.select("#current_name").remove();

            d3.select(this)
            .select("path")
            .style("stroke", "red")
            .style("stroke-width", "2px")
            ;

        })
        ;

    d3.selectAll(".large_dot")
        .each(function(d){
            if(d.conflict != 0){
            d3.select(this.parentNode)
            .append("path")
            .classed("conflict_bar", true)
            .classed("large_dot_path", true)
            .attr("d", function(d){
                var x1 = title_width + padding_x + rect_width / 10 * d.score - d.conflict * 15 / 2;
                var x2 = title_width + padding_x + rect_width / 10 * d.score + d.conflict  * 15 / 2;
                var y = padding_y * (d.row + 1) - 20;
                return "M " + x1.toString() + " " + y.toString() +
                "L " + x2.toString() + " " + y.toString();
            })
            .attr("stroke", "orangeRed")
            .attr("stroke-width", 2);

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
            .attr("stroke-width", 0.5);

            // d3.select(this.parentNode)
            // .append("text")
            // .classed("conflict_bar", true)
            // .attr("x", function(d) { return title_width + padding_x + rect_width / 10 * d.score; })
            // .attr("y", function(d) { return padding_y * (d.row + 1) - 22; })
            // .style("text-anchor", "middle")
            // .style("font-size", "10px")
            // .style("fill", "orangeRed")
            // .text(function(d) { return d3.round(d.conflict, 1);});
        }
        });

    d3.selectAll(".small_dot")
        .each(function(d){
            if(conflict2[d.id[0]][d.id[1]]!= 0){
            d3.select(this.parentNode)
            .append("path")
            .classed("conflict_bar", true)
            .classed("small_dot_path", true)
            .attr("d", function(d){
                var x1 = title_width + padding_x + rect_width / 10 * d.score;
                var x2 = title_width + padding_x + rect_width / 10 * voter[d.id[0]][d.id[1]][1];
                var y = padding_y * (d.row + 1) + 15;
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
                var y2 = padding_y * (d.row + 1) + 15;

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
                var y2 = padding_y * (d.row + 1) + 15;

                return "M " + x.toString() + " " + (y1).toString() +
                "L " + x.toString() + " " + (y2).toString();
            })
            .attr("stroke", "orangeRed")
            .attr("stroke-width", "2");

            // d3.select(this.parentNode)
            // .append("text")
            // .classed("conflict_bar", true)
            // .attr("x", function(d) {
            //     var x1 = title_width + padding_x + rect_width / 10 * d.score;
            //     var x2 = title_width + padding_x + rect_width / 10 * voter[d.id[0]][d.id[1]][1];
            //     var x = (x1 + x2) / 2;
            //     return x;
            //  })
            // .attr("y", function(d) { return padding_y * (d.row + 1) + 40; })
            // .style("text-anchor", "middle")
            // .style("font-size", "10px")
            // .style("fill", "orangeRed")
            // .text(function(d) {
            //     console.log(d3.round(Math.abs(d.score - voter[d.id[0]][d.id[1]][1]), 1));
            //     return d3.round(Math.abs(d.score - voter[d.id[0]][d.id[1]][1]), 1);
            // });
        }
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
        .attr('cx', 0)
        .attr('cy', function(d, i) {
            return 125;
        })
        .attr("r", 9.5)
        .style('fill', "Lightgrey")
        .style('stroke', "black")
        .style("stroke-width", 1);

        little_and_large_circle
        .append('text')
        .attr('x', 12)
        .attr('y', 129)
        .style("font-size", "10px")
        .text("Committee Average");

        little_and_large_circle
        .append("circle")
        .attr('cx', 0)
        .attr('cy', 143)
        .attr("r", 4)
        .style('fill', "Lightgrey")
        .style('stroke', "black")
        .style("stroke-width", 1);

        little_and_large_circle
        .append('text')
        .attr('x', 13)
        .attr('y', 146)
        .style("font-size", "10px")
        .text("You")

        var score_variance_image =
        d3
        .select("#main_panel")
        .append("g")
        .attr("transform", "translate(" + (title_width + rect_width + 55) + "," + 105 + ")")
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
        .attr("x", -12)
        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 58;})
        .style("font-size", "10px")
        .text("Biggest point of disagreement");
        score_variance_image
        .append("text")
        .attr("x", -12)
        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 70;})
        .style("font-size", "10px")
        .text("between committee & you")

        score_variance_image
        .append("image")
        .attr('x',function(d){ return -9;})
        .attr('y',function(d){ return candidate_num * legend_height + legend_padding * 4 + 73;})
        .attr('width', 65)
        .attr('height', 65)
        .attr("xlink:href","../conflict among committee.png");

        score_variance_image
        .append("text")
        .attr("x", -12)
        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 132;})
        .style("font-size", "10px")
        .text("Biggest point of disagreement");
        score_variance_image
        .append("text")
        .attr("x", -12)
        .attr("y", function(d, i){ return candidate_num * legend_height + legend_padding * 4 + 147;})
        .style("font-size", "10px")
        .text("within the committee")



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
        .style("left", 725 +"px")
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
        d3.selectAll(".axis").selectAll("text").style("font-size", "10px");

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
        .style("left", (725).toString() + "px")
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
        .text("Committee")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + (left_padding_x + 25) + ", 50)");

        var voter_name_max_length = 7; //length of the word "average"
        for(i = 0; i < voter_info.length; i++){
            if((voter_info[i].name).length > voter_name_max_length)
                voter_name_max_length = (voter_info[i].name).length;
        }

        var voter_list_all =
        svg1
        .append("g")
        .attr("id", "v0");

        voter_list_all
        .append("rect")
        .attr("x", left_padding_x + 25 - (voter_name_max_length * 10) / 2)
        .attr("y", function(d, i){
            return 63;
        })
        .attr("height", 20)
        .attr("width", voter_name_max_length * 10)
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
            return "Average";
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
            return left_padding_x + 25 - voter_name_max_length * 10 / 2;
        })
        .attr("y", function(d, i){
            return 63 + left_padding_y * (i + 1);
        })
        .attr("height", left_padding_y)
        .attr("width", function(d){
            return voter_name_max_length * 10;
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
        .style("font-size", "15px");

        voter_list
        .on("mouseover", function(d){
            d3.select(this).select("text").style("fill", "white");
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
                    .attr("r", 5)
                    .attr("cx", function(){
                        return title_width + padding_x + rect_width / 10 * (voter[i][j][d.code]);
                    })
                    .attr("cy", padding_y * (i + 1))
                    .attr("fill", function(d) {return color[j - 1];})
                    .attr("stroke", "black")
                    .attr("stroke-width", "0.5px")
                    ;

                }
            }

            d3.select("#argument_div")
            .classed("argument", true)
            .html("argument</br>" + argu[d.code]);

        })
        .on("mouseout", function(d){
            d3.selectAll(".indivudial_vote").remove();

            d3.select(this).select("text").style("fill", "grey");
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
                                            });

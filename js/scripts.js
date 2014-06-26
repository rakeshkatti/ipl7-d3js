d3.json('data.json', function(err, data) {
    var width = 10,
        height = 30;
    marginTop = 25;
    marginLeft = 80;
    teams_array = ["KKR", "MI", "RCB", "DD", "KXIP", "CSK", "RR", "SRH"];

    var chart = d3.select(".chart")
        .attr("width", width * 80)
        .attr("height",55 * data.length);

    var path = {};

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g");

    for (var i = 0; i < teams_array.length; i++) {
        var teamName = teams_array[i];
        path[teamName] = [];

        var path1 = {}, path2 = {};
        bar.append("text")
            .text(function(d, i) {
                return d["MATCH"];
            })
            .attr("x", 0)
            .attr("y", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                return (i * (marginTop + height)) + height / 2;
            })
        bar.append("text")
            .text(function(d, i) {
                return d["MATCH-TEAMS"];
            })
            .attr("x", 0)
            .attr("y", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                return (i * (marginTop + height)) + height;
            })

        bar.append("rect")
            .attr("x", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                return d[teamName] * (width + marginLeft);
            })
            .attr("y", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                path1.i = {}
                path2.i = {}
                path1.i.x = d[teamName] * (width + marginLeft) + (width / 2);
                path2.i.x = d[teamName] * (width + marginLeft) + (width / 2);
                path1.i.y = i * (height + marginTop);
                path2.i.y = (i * (height + marginTop)) + height;
                path[teamName].push(path1.i);
                path[teamName].push(path2.i);
                return i * (marginTop + height);
            })
            .attr("width", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                return width;
            })
            .attr("height", function(d, i) {
                if (d[teamName] == null) {
                    return;
                }
                return height;
            })
        .attr("class", teamName);
        // bar.append("svg:image")
        //         .attr("xlink:href", "http://www.e-pint.com/epint.jpg")
        //         .attr("width", 150)
        //         .attr("x", 0)
        //         .attr("y", function(d, i) {
        //             if (d[teamName] == null) {
        //                 return;
        //             }
        //             return (i * (marginTop + height)) + height / 2;
        //         })
        //         .attr("height", 200);

        var lineFunction = d3.svg.line()
            .x(function(d) {
                return d.x;
            })
            .y(function(d) {
                return d.y;
            })
            .interpolate("monotone");

        //The line SVG Path we draw
        var lineGraph = chart.append("path")
            .attr("d", lineFunction(path[teamName]))
            .attr("class", teamName + "path")
            .attr("stroke-width", 2)
            .attr("fill", "none");
    };

    // $(".RCB,.RCBpath").on("mouseover",function(e){
    //     $(".RCB").attr("width",15);
    //     $(".RCBpath").attr("stroke-width",4);
    // });

});

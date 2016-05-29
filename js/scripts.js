d3.json('data.json', function(err, data) {
	var width = 30,
	height = 8;
	marginTop = 45;
	marginLeft = 80;
	teams_array = ["RPS", "MI", "KKR", "DD", "GL", "KXIP", "RCB", "SRH"];

	var chart = d3.select(".chart")
	.attr("width",111 * data.length)
	.attr("height", height * 60);

	var path = {};

	var bar = chart.selectAll("g")
	.data(data)
	.enter().append("g");

	bar.append("text")
	.text(function(d, i) {
		return d["MATCH"];
	})
	.attr("y", 10)
	.attr("x", function(d, i) {
		return ((i * (marginLeft + width)) + width / 2) - 15;
	})
	bar.append("text")
	.text(function(d, i) {
		return d["MATCH-TEAMS"];
	})
	.attr("y", 25)
	.attr("x", function(d, i) {
		return ((i * (marginLeft + width)) + width / 2) - 15;
	})

	for (var i = 0; i < teams_array.length; i++) {
		var teamName = teams_array[i];
		path[teamName] = [];

		var path1 = {}, path2 = {};

		bar.append("rect")
		.attr("y", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			return d[teamName] * (height + marginTop);
		})
		.attr("x", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			path1.i = {}
			path2.i = {}
			path1.i.x = d[teamName] * (height + marginTop) + (height / 2);
			path2.i.x = d[teamName] * (height + marginTop) + (height / 2);
			path1.i.y = i * (width + marginLeft);
			path2.i.y = (i * (width + marginLeft)) + width;
			path[teamName].push(path1.i);
			path[teamName].push(path2.i);
			return i * (marginLeft + width);
		})
		.attr("height", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			return height;
		})
		.attr("width", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			return width;
		})
		.attr("class", function(d, i) {
			var teams = d["MATCH-TEAMS"].split(" ").join("").split("vs");
			if (teams[0] == teamName) {
				return teamName + " team current winner";
			} else if (teams[1] == teamName) {
				return teamName + " team current looser";
			} else {
				return teamName + " team";
			}
		})
		.attr("data-team-name", teamName)

		var lineFunction = d3.svg.line()
		.y(function(d) {
			return d.x;
		})
		.x(function(d) {
			return d.y;
		})
		.interpolate("monotone");

		//The line SVG Path we draw
		var lineGraph = chart.append("path")
		.attr("d", lineFunction(path[teamName]))
		.attr("class", teamName + "path path")
		.attr("stroke-width", 2)
		.attr("data-team-name", teamName)
		.attr("fill", "none");

		$("." + teamName + ", ." + teamName + "path").on("click",function(e){
			e.stopPropagation();
			$(".path, .team").addClass("lighten");
			var currentTeam = $(this).data('team-name');
			$("." + currentTeam + ", ." + currentTeam + "path").removeClass("lighten");
		});

		$(document).on("click", function(e) {
			$(".path, .team").removeClass("lighten");
		})

		bar.append("svg:image")
		.attr("y", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			return (d[teamName] * (height + marginTop)) - 10;
		})
		.attr("x", function(d, i) {
			if (d[teamName] == null) {
				return;
			}
			return (i * (marginLeft + width)) + 10;
		})
		.attr("xlink:href", function(d, i) {
			var teams = d["MATCH-TEAMS"].split(" ").join("").split("vs");
			if (teams[0] == teamName) {
				return "../img/trophy.png";
			}
		})
		.attr('width', 10)
		.attr('height', 10)
	};

});

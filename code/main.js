"usestrict";


var q = queue(1);
// q.defer(d3.json, "sky.json");
// q.defer(d3.json, "planets.json");
// q.awaitAll(drawMap);

var showPopup, dataset = [];
var body = d3.select("body");
var skyMap = body.selectAll("#skyMapDiv");
var orbit = body.selectAll("#orbitDivS");

var svg = d3.select("body")
            .append("svg")
            .attr("width", 800)
            .attr("height", 400);

var projection = d3.geo.mollweide()
    // .clipAngle(90 - 1e-3)
    // .scale(237)
    .translate([800 / 2, 400 / 2]);


dataset = d3.csv("planets.csv", function(d){
	console.log(d)
	
	svg.selectAll("circle")
	.data(d)
	.enter()
	.append("circle")
	.attr("class", "dot")
	.attr("cx", function(d) {
        return (d.pl_radj * 100)  ;
   	})
  	.attr("cy", function(d) {
        return (d.pl_massj * 100) ;
  	})
   	.attr("r", 2);
});




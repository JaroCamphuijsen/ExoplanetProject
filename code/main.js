"usestrict";

// var q = queue(1);
// q.defer(d3.json, "sky.json");
// q.defer(d3.json, "planets.json");
// q.awaitAll(drawMap);

var showPopup, dataset = [];
var body = d3.select("body");
var mpvDiv = body.selectAll("#mpvDiv");
var spvDiv = body.selectAll("#spvDiv");

var mpvWidth = 800, mpvHeight = 400;
var spvWidth = 400, spvHeight = 400;

var mpvX = d3.scale.linear().range([20, mpvWidth]);
var mpvY = d3.scale.linear().range([mpvHeight-20, 0]);

var mpvSvg = mpvDiv.append("svg")
            .attr("width", mpvWidth + "px")
            .attr("height", mpvHeight + "px")
            .attr("class", "mpvSvg");

var spvSvg = spvDiv.append("svg")
            .attr("width", spvWidth + "px")
            .attr("height", spvHeight + "px")
            .attr("class", "spvSvg");

var button = body.selectAll("#button")
            .style("background-color", "white");



var mpvTransform = [];

var projection = d3.geo.mollweide()
    .translate([mpvWidth / 2, mpvHeight / 2]);


dataset = d3.csv("planets.csv", function(d){
	var xAttr = "pl_radj", yAttr = "pl_massj";

	mpvX.domain(d3.extent(d, function(d) { return d.pl_massj; }));
  mpvY.domain(d3.extent(d, function(d) { return d.pl_orbsmax; }));
  
	mpvSvg.selectAll("circle")
	.data(d, function(d) {return d.pl_name})
	.enter()
	.append("circle")
	.attr("class", "dot")
	.attr("cx", function(d) {
        return (mpvX(d.pl_massj))
   	})
  .attr("cy", function(d) {
        return (mpvY(d.pl_orbsmax))
  	})
  .attr("r", 2)
  .on("mouseover", function(d,i){
      toSpv(d,i)
    });

  button.on("click", function(d, i){
    scatterTransition(d, mpvSvg, xAttr, yAttr);});

});

function toSpv(planet, index){
  spvSvg.selectAll("*")
    .remove();
  var rx = planet.pl_orbsmax;
  var ecc = planet.pl_orbeccen;

  // spvSvg.append()

  if(planet.pl_orbsmax < 1){
    spvSvg.append("ellipse")
      .attr("class", "orbit")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("rx", rx * 150)
      .attr("ry", rx * ecc * 150);
      
    spvSvg.append("circle")
      .attr("class", "au")
      .style("stroke-dasharray", ("10,3"))
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r",  150);
  }
  else{
    spvSvg.append("circle")
      .attr("class", "orbit")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", 150)
      .attr("ry", 150 * ecc );
    
    spvSvg.append("circle")
      .attr("class", "au")
      .style("stroke-dasharray", ("10,3"))
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", Math.round(150/(planet.pl_orbsmax)));
  }
}

function scatterTransition(data, svg, xVar, yVar){
  mpvSvg.selectAll("*")
    .remove();
  // console.log(data[0].xVar)
  // console.log(data[0].yVar)
  // mpvX.domain(d3.extent(data, function(d) { return d.xVar; }));
  // mpvY.domain(d3.extent(data, function(d) { return d.yVar; }));

  // mpvSvg.selectAll("circle")
  // .attr("cx", function(d) {
  //       return (mpvX(d.xVar))
  //   })
  // .attr("cy", function(d) {
  //       return (mpvY(d.yVar))
  //   })
  // .attr("r", 2)
  // .on("mouseover", function(d,i){
  //     toSpv(d,i)
  //   });
  dataset = d3.csv("planets.csv", function(d){
    var xAttr = "pl_radj", yAttr = "pl_massj";

    mpvX.domain(d3.extent(d, function(d) { return d.pl_radj; }));
    mpvY.domain(d3.extent(d, function(d) { return d.pl_massj; }));
    
    mpvSvg.selectAll("circle")
    .data(d, function(d) {return d.pl_name})
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) {
          return (mpvX(d.pl_radj))
      })
    .attr("cy", function(d) {
          return (mpvY(d.pl_massj))
      })
    .attr("r", 2)
    .on("mouseover", function(d,i){
        toSpv(d,i)
      });

    button.on("click", function(d, i){
      scatterTransition(d, mpvSvg, xAttr, yAttr);});
  });
  console.log("hello");

}

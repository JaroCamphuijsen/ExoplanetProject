"usestrict";
var showPopup, dataset = [];
var body = d3.select("body");
var mpvDiv = body.selectAll("#mpvDiv");
var spvDiv = body.selectAll("#spvDiv");
var spInfoDiv = body.selectAll("#spInfoDiv")

var mpvWidth = 800, mpvHeight = 400;
var spvWidth = 400, spvHeight = 400;

var mpvXTransform = d3.scale.linear().range([20, mpvWidth]);
var mpvYTransform = d3.scale.linear().range([mpvHeight-20, 0]);

var mpvSvg = mpvDiv.append("svg")
            .attr("width", mpvWidth + "px")
            .attr("height", mpvHeight + "px")
            .attr("class", "mpvSvg");

var spvSvg = spvDiv.append("svg")
            .attr("width", spvWidth + "px")
            .attr("height", spvHeight + "px")
            .attr("class", "spvSvg");

var button = body.selectAll("#button");
            // .style("background-color", "white");
var nCols = 3;
for (i = 1; i <= nCols; i++) {

spInfoDiv.append("div")
  .attr("class", "infoCol" + i)
  .style("width", Math.round(100/nCols) + "%")
};


var mpvTransform = [];

var projection = d3.geo.mollweide()
    .translate([mpvWidth / 2, mpvHeight / 2]);


dataset = d3.csv("planets.csv", function(data){
	var xAttr = "pl_massj", yAttr = "pl_orbsmax";
  var dataXRange = d3.extent(data, function(p) { return p[xAttr]; });
  var dataYRange = d3.extent(data, function(p) { return p[yAttr]; });

	mpvXTransform.domain(dataXRange);
  mpvYTransform.domain(dataYRange);

  for(p = 0; p < data.length; p++) {
    console.log(data[p][xAttr]," and ", data[p][yAttr])
  };

	mpvSvg.selectAll("circle")
	.data(data, function(d) {return d.pl_name})
	.enter()
	.append("circle")
	.attr("class", "dot")
  .style("visibility", function(d) {
    if (d[xAttr] == "" || d[yAttr] == "") {return "hidden"}
    else {return "visible"}
    } )
	.attr("cx", function(d) {return (mpvXTransform(d[xAttr]))})
  .attr("cy", function(d) {return (mpvYTransform(d[yAttr]))})
  .attr("r", 2)
  .on("mouseover", function(d,i){
    toSpv(d,i)
    });


  for (p = 0; p < data.length; p++) {
    if (p[xAttr] >= 0 || p[yAttr] >= 0){
  }}

  var xAxis= d3.svg.axis()
    .orient("bottom");

  button.on("click", function(d, i){
    scatterTransition(d, mpvSvg, xAttr, yAttr);});

});

function toSpv(planet, index){
  var rx = planet.pl_orbsmax, rStar = planet.st_rad;
  if (planet.pl_orbeccen == 0 || planet.pl_orbeccen == "") {ecc = 0 }
  else {ecc = planet.pl_orbeccen}
  if (planet.st_rad == 0 || planet.st_rad == "") {console.log(planet.st_rad); rStar = (695500/149597871) *  150;}
  else {rStar = (695500/149597871) * planet.st_rad * 150}

  var ry = rx * Math.sqrt(1-Math.pow(ecc,2))
  
  // var 695500 / 149597871
  // console.log(rx, ecc, ry);

  spvSvg.selectAll("*")
    .remove();

  if(rx < 1){
    spvSvg.append("circle")
      .attr("class", "star")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", rStar);

    spvSvg.append("ellipse")
      .attr("class", "orbit")
      .attr("cx", Math.sqrt(Math.pow((rx * 150) ,2) - Math.pow((ry * 150),2)) + 200)
      .attr("cy", 200)
      .attr("rx", rx * 150)
      .attr("ry", ry * 150);
      
    spvSvg.append("circle")
      .attr("class", "au")
      .style("stroke-dasharray", ("10,3"))
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r",  150);
  }
  else{
    spvSvg.append("circle")
      .attr("class", "star")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", rStar );

    console.log(rx / ry)

    spvSvg.append("ellipse")
      .attr("class", "orbit")
      .attr("cx", Math.sqrt(Math.pow((150) ,2) - Math.pow(((ry/rx) * 150),2)) + 200)
      .attr("cy", 200)
      .attr("rx", 150)
      .attr("ry", 150 * Math.sqrt(1-Math.pow(ecc,2)));
    
    spvSvg.append("circle")
      .attr("class", "au")
      .style("stroke-dasharray", ("10,3"))
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", Math.round(150/(rx)));

  }
}

function scatterTransition(data, svg, xVar, yVar){
  mpvSvg.selectAll("*")
    .remove();
  // console.log(data[0].xVar)
  // console.log(data[0].yVar)
  // mpvXTransform.domain(d3.extent(data, function(d) { return d.xVar; }));
  // mpvYTransform.domain(d3.extent(data, function(d) { return d.yVar; }));

  // mpvSvg.selectAll("circle")
  // .attr("cx", function(d) {
  //       return (mpvXTransform(d.xVar))
  //   })
  // .attr("cy", function(d) {
  //       return (mpvYTransform(d.yVar))
  //   })
  // .attr("r", 2)
  // .on("mouseover", function(d,i){
  //     toSpv(d,i)
  //   });
  dataset = d3.csv("planets.csv", function(d){
    var xAttr = "pl_radj", yAttr = "pl_massj";

    mpvXTransform.domain(d3.extent(d, function(d) { return d.pl_radj; }));
    mpvYTransform.domain(d3.extent(d, function(d) { return d.pl_massj; }));
    
    mpvSvg.selectAll("circle")
    .data(d, function(d) {return d.pl_name})
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) {
          return (mpvXTransform(d.pl_radj))
      })
    .attr("cy", function(d) {
          return (mpvYTransform(d.pl_massj))
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

"usestrict";
/*
Variable declaration.
*/
var showPopup, dataset = [],
    body = d3.select("body"),
    mpvDiv = body.selectAll("#mpvDiv"),
    spvDiv = body.selectAll("#spvDiv"),
    spInfoDiv = body.selectAll("#spInfoDiv"),
    mpvWidth = 800, mpvHeight = 400,
    spvWidth = 400, spvHeight = 400,
    mpvXTransform = d3.scale.linear().range([20, mpvWidth]),
    mpvYTransform = d3.scale.linear().range([mpvHeight-20, 0]),
    nCols = 3;

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

for (i = 1; i <= nCols; i++) {
    spInfoDiv.append("div")
        .attr("class", "infoCol" + i)
        .style("width", Math.round(100/nCols) + "%")
};



dataset = d3.csv("planets.csv", function(data){
	var xAttr = "pl_massj", yAttr = "pl_orbsmax";
  
    mpvSvg.append("g")
        .attr("class", "xAxis")
        .append("line")
        .attr("y1", mpvHeight - 10)
        .attr("y2", mpvHeight - 10)
        .attr("x2", mpvWidth)
    mpvSvg.append("g")
        .attr("class", "yAxis")
        .append("line")
        .attr("x1", 10)
        .attr("x2", 10)
        .attr("y2", mpvHeight)
    mpvSvg.append("text")
        .attr("y", (Math.random() * 20 + 150)+"px")
        .attr("x", (Math.random() * 20 + 150)+"px")
        .text(yAttr);


    updateScatter(data, mpvSvg, xAttr, yAttr);

  
    button.on("click", function(d){
        button.transition()
            .duration(800)
            .style("height", (Math.random() * 20 + 150) + "px")
            .style("width", (Math.random() * 20 + 150) + "px")
            .style("background-color", "rgb("+(Math.round(Math.random() * 255)) + "," +
                (Math.round(Math.random() * 255)) + "," + (Math.round(Math.random() * 255)) + ", 0)");
        var yAttr = pickRandomProperty(data[0]);
        updateScatter(data, mpvSvg, "pl_orbsmax", yAttr);
        mpvSvg.selectAll("text")
            .transition()
            .duration(2000)
            .attr("y", (Math.random() * 200 + 50)+"px")
            .attr("x", (Math.random() * 200 + 50)+"px")
            .text(yAttr);
        });

});

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

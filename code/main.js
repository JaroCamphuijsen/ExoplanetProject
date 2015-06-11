"usestrict";
/*
Variable declaration. 
mpvDiv => multi planet view div, the div for scatterplot or skymap
spvDiv => single planet view div, here we'll see the planet's orbit
spInfoDiv => single planet info div, showing extra information about
the selected planet
*/
var dataset = [],
    body = d3.select("body"),
    mpvDiv = body.selectAll("#mpvDiv"),
    spvDiv = body.selectAll("#spvDiv"),
    spInfoDiv = body.selectAll("#spInfoDiv"),
    mpvWidth = 800, mpvHeight = 400,
    spvWidth = 400, spvHeight = 400,
    mpvPadding = 30,
    mpvXScale = d3.scale.linear().range([mpvPadding, mpvWidth]),
    mpvYScale = d3.scale.linear().range([mpvHeight-mpvPadding, 0]),
    nCols = 3;
/*
Initiating the visualization windows and the plot axes.
*/
var mpvSvg = mpvDiv.append("svg")
    .attr("width", mpvWidth + "px")
    .attr("height", mpvHeight + "px")
    .attr("class", "mpvSvg");

var spvSvg = spvDiv.append("svg")
    .attr("width", spvWidth + "px")
    .attr("height", spvHeight + "px")
    .attr("class", "spvSvg");
var xAxis = mpvSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (mpvHeight - mpvPadding) + ")");
var yAxis = mpvSvg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(30,0)");


var button = body.select("#button");


/* 
dividing the infodiv in nCols collumns
*/
for (i = 1; i <= nCols; i++) {
    spInfoDiv.append("div")
        .attr("class", "infoCol" + i)
        .style("width", Math.round(100/nCols) + "%")
};

/*
the data loading function, which encapsulates the rest of the code
planets.csv is the dataset downloaded from http://exoplanetarchive.ipac.caltech.edu
*/
dataset = d3.csv("planets.csv", function(data){
	var dimensions = Object.keys(data[0]);
    // spInfoDiv.select()


    button.on("click", function(d){
        button.transition()
            .duration(800)
            .style("height", (Math.random() * mpvPadding + 150) + "px")
            .style("width", (Math.random() * mpvPadding + 150) + "px")
            .style("background-color", "rgb("+(Math.round(Math.random() * 255)) + "," +
                (Math.round(Math.random() * 255)) + "," + (Math.round(Math.random() * 255)) + ", 0)");
        var xAttr = pickRandomProperty(data[0]);
        var yAttr = pickRandomProperty(data[0]);
        updateScatter(data, mpvSvg, "pl_orbsmax", yAttr);
        });
});

/* 
Googled for "pick random property js"
*/
function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
}

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
    mpvWidth = 800, mpvHeight = 400,
    spvWidth = 400, spvHeight = 400,
    mpvPadding = 50,
    mpvXScale = d3.scale.linear().range([mpvPadding, mpvWidth]),
    mpvYScale = d3.scale.linear().range([mpvHeight - mpvPadding, 0]),
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



/*
the data loading function, which encapsulates the rest of the code
planets.csv is the dataset downloaded from http://exoplanetarchive.ipac.caltech.edu
*/
dataset = d3.csv("planets.csv", function(data){
    // spInfoDiv.select()
    buildMpv(mpvSvg);
    updateScatter(data, mpvSvg, "ra", "dec");

    // button.on("click", function(d){
    //     button.transition()
    //         .duration(800)
    //         .style("height", (Math.random() * mpvPadding + 150) + "px")
    //         .style("width", (Math.random() * mpvPadding + 150) + "px")
    //         .style("background-color", "rgb("+(Math.round(Math.random() * 255)) + "," +
    //             (Math.round(Math.random() * 255)) + "," + (Math.round(Math.random() * 255)) + ", 0)");
    //     var xAttr = pickRandom(dimensions);
    //     var yAttr = pickRandom(dimensions);
    //     updateScatter(data, mpvSvg, xAttr, yAttr);
    //     });
});

/* 
Googled for "pick random property js"
*/
function pickRandom(arr) {
    var result;
    var count = 0;
    for (var e in arr) {
        if (Math.random() < 1/++count) {result = e; }
        }
    return arr[result];
}

"usestrict";
/*
Variable declaration. 
mpvDiv => multi planet view div, the div for scatterplot or skymap
spvDiv => single planet view div, here we'll see the planet's orbit
spInfoDiv => single planet info div, showing extra information about
the selected planet
*/
var body = d3.select("body"),
    mpvDiv = body.select("#mpvDiv"),
    spvDiv = body.select("#spvDiv"),
    spInfoDiv = body.select("#spInfoDiv"),
    storyDiv = body.select("#storyDiv"),
    mpvWidth = 800, mpvHeight = 400,
    spvWidth = 400, spvHeight = 400,
    mpvSize = function() {return mpvDiv.node().getBoundingClientRect();}
    spvSize = function() {return spvDiv.node().getBoundingClientRect();}
    spInfoSize = function() {return spInfoDiv.node().getBoundingClientRect();}
    storySize = function() {return storyDiv.node().getBoundingClientRect();}
    mpvPadding = 70, DIMDICT = [],
    nCols = 3, rDot = 2.4, rRect = 5;

var introText = "Hello there, welcome to the Interactive Exoplanet Encyclopedia. Have fun exploring the universe!" +
    "The skymap over there is interactive, try clicking one of the axis titles. You can choose a dimension for yourself" +
    "and watch the planets fly into place. It's also possible to select a planet in the scatterplot, this text will make" +
    "make place for an orbital model and below this window you'll find some detailed information about the planet. Good luck!";
/*
Initiating the visualization windows and the plot axes.
*/

var mpvSvg = mpvDiv.append("svg")
    .attr("width", mpvWidth + "px")
    .attr("height", mpvHeight + "px")
    .attr("class", "mpvSvg")

var spvSvg = spvDiv.append("svg")
    // .attr("width", spvWidth + "px")
    .attr("height", spvHeight + "px")
    .attr("class", "spvSvg");



var spInfoSvg = spInfoDiv.append("svg")
    .attr("width", mpvWidth + "px")
    .attr("height", 200 + "px")
    .attr("class", "spInfoSvg");

// body.append("div")
//     .attr("width", spvWidth)
//     .attr("class","intro")
//     .append("p")
//     .attr("class","intro")
//     .html(introText)  


/*
the data loading function, which encapsulates the rest of the code
planets.csv is the dataset downloaded from http://exoplanetarchive.ipac.caltech.edu
*/
d3.csv("planets.csv", function(data){
    d3.csv("dim_scraper/exoplanetDimensions.csv", function(d){
        DIMDICT = d;
        buildMpv(mpvSvg);
        updateScatter(data, mpvSvg, "ra", "dec","lin");
    });
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

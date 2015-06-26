"usestrict";
/*
Variable declaration. 
    mpvDiv          => Multi Planet View div, the div for scatterplot or skymap
    spvDiv          => Single Planet View div, here we'll see the planet's orbit
    spInfoDiv       => Single Planet Info div, showing extra information about
                        the selected planet
    explainDimDiv   => explain dimensions div, with a short description of 
                        the selected dimension
*/
var body = d3.select("body"),
    mpvDiv = body.select("#mpvDiv"),
    spvDiv = body.select("#spvDiv"),
    spInfoDiv = body.select("#spInfoDiv"),
    explainDimDiv = body.select("#explainDimDiv"),
    mpvWidth = 800, mpvHeight = 400,
    spvWidth = 400, spvHeight = 400,
    mpvSize = function() {return mpvDiv.node().getBoundingClientRect();},
    spvSize = function() {return spvDiv.node().getBoundingClientRect();},
    spInfoSize = function() {return spInfoDiv.node().getBoundingClientRect();},
    explainDimSize = function() {return explainDimDiv.node().getBoundingClientRect();},
    mpvPadding = 70, DIMDICT = [],
    nCols = 3, rDot = 2.4; 


/*
Initiating the visualization svg's
*/

var mpvSvg = mpvDiv.append("svg")
    .attr("width", mpvWidth + "px")
    .attr("height", mpvHeight + "px")
    .attr("class", "mpvSvg");

//The spv Svg will get the size of the parent div.
var spvSvg = spvDiv.append("svg")
    .attr("height", spvHeight + "px")
    .attr("class", "spvSvg");

var spInfoSvg = spInfoDiv.append("svg")
    .attr("width", mpvWidth + "px")
    .attr("height", 200 + "px")
    .attr("class", "spInfoSvg");



/*
the data loading function, which encapsulates the rest of the code
planets.csv is the dataset downloaded from 
    "http://exoplanetarchive.ipac.caltech.edu"
exoplanetDimensions.csv is information about the dimensions scraped from
    "http://exoplanetarchive.ipac.caltech.edu/docs/API_exoplanet_columns.html" 
using description scraper.py
*/
d3.csv("planets.csv", function(data){
    d3.csv("dim_scraper/exoplanetDimensions.csv", function(d){
        DIMDICT = d;
        buildMpv(mpvSvg);
        updateScatter(data, mpvSvg, "ra", "dec");
        intro(data);
    });
});


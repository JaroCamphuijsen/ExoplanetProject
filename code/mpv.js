function filterData(data, xAttr, yAttr) {
    var d, newData = [];
        for (d = 0; d < data.length; d++) {
            if (data[d][xAttr] != "" && data[d][yAttr] != "") {
                newData.push(data[d]);
                // console.log("point", data[d], data[d][xAttr], data[d][yAttr]);

            }
        }
    return newData;
}

function updateScatter(data, svg, xAttr, yAttr){
    /*
    Updates the scatterplot to scatterplot with new dimensions xAttr and yAttr
    in the multiplanetview. Using sexy transitions.
    */

    var selData = filterData(data, xAttr, yAttr)
    var dataXRange = d3.extent(data, function(p) { return p[xAttr]; });
    var dataYRange = d3.extent(data, function(p) { return p[yAttr]; });
    mpvXScale.domain(dataXRange);
    mpvYScale.domain(dataYRange);
    var xAxis = d3.svg.axis().scale(mpvXScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(mpvYScale).orient("left");
    var dimensions = Object.keys(data[0]);
   

    svg.selectAll("g.x.axis")
        .on("mouseover", function(p){d3.select(d3.event.target).attr("class", "x axis highlight");})
        .on("mouseout", function(p){d3.select(d3.event.target).attr("class", "x axis");})
        .on("click", function(p){chooseDim(dimensions);})
        .transition()
        .call(xAxis);
    svg.selectAll("g.y.axis")
        .on("mouseover", function(p){d3.select(d3.event.target).attr("class", "y axis highlight");})
        .on("mouseout", function(p){d3.select(d3.event.target).attr("class", "y axis");})
        .on("click", function(p){chooseDim(dimensions);})
        .transition()
        .call(yAxis);    

    // data-join
    var points = mpvSvg.selectAll(".dot")
        .data(selData, function(d) {return d.pl_name});

    // update old data
    points.transition()
        .duration(800)
        .attr("cx", function(d) {return (mpvXScale(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYScale(d[yAttr]))});

    // enter new data
    points.enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", 0)
        .attr("cy", function(d) {return (mpvYScale(d[yAttr]))})
        .on("mouseover", function(p){d3.select(d3.event.target).attr("class", "dot highlight");})
        .on("mouseout", function(p){d3.select(d3.event.target).attr("class", "dot");})
        .on("click", function(p){toSpv(p, spvSvg); d3.select(d3.event.target).attr("class", "selectDot");})
        .transition()
        .duration(800)
        .attr("cx", function(d) {return (mpvXScale(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYScale(d[yAttr]))})
        .attr("r", 2);

    // exit old data
    points.exit()
        .attr("class", "exit")
        .transition()
        .duration(800)
        .attr("cx", 0)
        .style("fill", "rgb(0,0,0,0)")
        .remove();
    
// zoom example from http://bl.ocks.org/mbostock/3680957
    //     svg.call(d3.behavior.zoom().x(mpvXScale).y(mpvYScale).scaleExtent([1, 8]).on("zoom", zoom()))
    // function zoom() {
    //     points.style("transform", transform);
    // }

    // function transform(d) {
    //     // console.log(d)
    //   return "translate(" + mpvXScale(d.xAttr) + "," + mpvYScale(d.yAttr) + ")";
    // }
}

function selectPlanet(planet) {
    d3.select(planet)
        .attr("class", "selectDot")
}

function chooseDim(dimensions, axis) {
    console.log(dimensions)
    console.log("Dropdown menu!")
}
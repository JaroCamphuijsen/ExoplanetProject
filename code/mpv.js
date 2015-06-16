
function buildMpv(svg){
    var mpvDimensions = ["pl_pnum", "pl_orbper", "pl_orbsmax", "pl_orbeccen", "pl_massj", "pl_msinij", "pl_radj", 
    "pl_dens", "pl_orbincl", "ra", "dec", "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", "pl_disc"];
    // Initiate the axis containers first, so they will be at the lowest level in the svg.
    var xContainer = mpvSvg.append("g")
        .attr("class", "x axisContainer")
        .attr("transform", "translate(0," + (mpvHeight - mpvPadding) + ")");

    var yContainer = mpvSvg.append("g")
        .attr("class", "y axisContainer")
        .attr("transform", "translate(" + mpvPadding + ",0)");

    // appending containers for the actual axes
    xContainer.append("g")
        .attr("class", "axis x");

    yContainer.append("g")
        .attr("class", "axis y");

    // appending the axisTitle containers and text element to the axis containers
    xContainer.append("g")
        .attr("class", "axisTitle x")
        .attr("transform", "translate(" + (mpvWidth/2) + "," + 40 + ")")  
        .append("rect")
        .attr("class", "titleButton")
        .attr("width", 200)
        .attr("height", 30)
        .attr("x",-100)
        .attr("y", -15);
    xContainer.select(".axisTitle")
        .append("text")
        .attr("text-anchor", "middle");
 
    yContainer.append("g")
        .attr("class", "axisTitle y")
        .attr("transform", "translate(" + -40 + ", " + (mpvHeight/2) + ") rotate(270)")
        .append("rect")
        .attr("class", "titleButton")
        .attr("width", 200)
        .attr("height", 30)
        .attr("x",-100)
        .attr("y", -15);
    yContainer.select(".axisTitle")
        .append("text")
        .attr("text-anchor", "middle");

    // Initiate the plotcontainer next, so dots are drawn on top of the axes
    svg.append("g")
        .attr("id", "plotContainer")
        
    // Initiate the dropdown menu for choosing the plotted dimension
    svg.append("g")
        .attr("class","plotMenu")
        .attr("transform", "translate(200, 20)")


}

function updateScatter(data, svg, xAttr, yAttr){
    /*
    Updates the old scatterplot to scatterplot with new dimensions xAttr and yAttr
    in the multiplanetview. Using sexy transitions.
    */

    // Filter the data for the chosen dimensions so all datapoints without a value 
    // for x or y will not be drawn.
    var selData = filterData(data, xAttr, yAttr);

    // 
    var dataXRange = d3.extent(data, function(p) { return Number(p[xAttr]); });
    var dataYRange = d3.extent(data, function(p) { return Number(p[yAttr]); });
    mpvXScale.domain(dataXRange);
    mpvYScale.domain(dataYRange);
    var dimensions = Object.keys(data[0]);
    var mpvDimensions = ["pl_pnum", "pl_orbper", "pl_orbsmax", "pl_orbeccen", "pl_massj", "pl_msinij", "pl_radj", 
    "pl_dens", "pl_orbincl", "ra", "dec", "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", "pl_disc"];
    var animationLength = 3000
    var xAxis = d3.svg.axis().scale(mpvXScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(mpvYScale).orient("left");
    var plotContainer = svg.select("#plotContainer")

    svg.select(".x.axisContainer")
        .select(".x.axis")
        .transition()
        .duration(3000)
        .call(xAxis);

    svg.select(".y.axisContainer")
        .select("g.y.axis")
        .transition()
        .duration(3000)
        .call(yAxis);
    
    svg.select("g.x.axisTitle")
        .on("mouseover", function(p){d3.select(d3.event.target).classed("highlight", true);})
        .on("mouseout", function(p){d3.select(d3.event.target).classed("highlight", false);})
        .on("click", function(p){chooseDim(data, svg, xAttr, yAttr, mpvDimensions, "x");})
        .transition()
        .duration(animationLength)
        .select("text")
        .text(xAttr);

    svg.select("g.y.axisTitle")        
        .on("mouseover", function(p){d3.select(d3.event.target).classed("highlight", true);})
        .on("mouseout", function(p){d3.select(d3.event.target).classed("highlight", false);})
        .on("click", function(p){chooseDim(data, svg, xAttr, yAttr, mpvDimensions, "y");})
        .transition()
        .duration(animationLength)
        .select("text")
        .text(yAttr);

        
    // data-join
    var points = plotContainer.selectAll(".dot")
        .data(selData, function(d) {return d.pl_name});

    // update old data
    points.transition()
        .duration(animationLength)
        .attr("cx", function(d) {return (mpvXScale(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYScale(d[yAttr]))});

    // enter new data
    points.enter()
        .append("circle")
        .classed("dot", true)
        .style("fill-opacity", 0)
        .attr("cx", function(d) {return (mpvXScale(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYScale(d[yAttr]))})
        .attr("r", 2)
        .on("mouseover", function(p){d3.select(d3.event.target).classed("highlight", true);})
        .on("mouseout", function(p){d3.select(d3.event.target).classed("highlight", false);})
        .on("click", function(p){
            toSpv(p, spvSvg);
            d3.selectAll(".dot").classed("selDot", false); 
            d3.select(d3.event.target).classed("selDot", true);
            })
        .transition()
        .duration(animationLength)
        .style("fill-opacity", 1);

    // exit old data
    points.exit()
        .attr("class", "exit")
        .transition()
        .duration(animationLength)
        .style("fill-opacity", 0)
        .remove();

    //Easteregg not ready yet
    // if(xAttr === "ra" && yAttr === "dec") {easterEgg(selData, points, mpvXScale, mpvYScale)}
}

// Function to filter the data given two 
function filterData(data, xAttr, yAttr) {
    var d, newData = [];
        for (d = 0; d < data.length; d++) {
            if (Number(data[d][xAttr]) != 0 && Number(data[d][yAttr]) != 0) {
                newData.push(data[d]);
            }
        }
    return newData;
}

function chooseDim(data, svg, xAttr, yAttr, dimensions, axis) {
    // if (axis === "x") { xAttr = pickRandom(dimensions)}
    // if (axis === "y") { yAttr = pickRandom(dimensions)}
    // updateScatter(data, svg, xAttr, yAttr);
    showPlotMenu(data, svg, xAttr, yAttr, dimensions, axis);
}

function showPlotMenu(data, svg, xAttr, yAttr, dimensions, axis) {
    var buttonHeight = 30
    var button = svg.select(".plotMenu")
        .selectAll(".plotMenuButton")
        .data(dimensions)
        
    button.enter()
        .append("g")
        .attr("class", "plotMenuButton")
        .transition()
        .duration(800)
        .attr("transform", function(d, i) { return "translate(0," + i * buttonHeight + ")"; });
    
    button.append("rect")
        .attr("width", 100)
        .attr("height", buttonHeight - 1)
    
    button.append("text")
        // .attr("x", function(d) { return x(d) - 3; })
        .attr("y", buttonHeight / 2)
        .attr("dy", ".35em")
        .text(function(d){return d;})

    button.on("mouseover", function(p){d3.select(d3.event.target).classed("highlight", true);})
        .on("mouseout", function(p){d3.select(d3.event.target).classed("highlight", false);})
        .on("click", function(p){
            clearMenu(svg);
            if (axis === "x") {xAttr = p}
            if (axis === "y") {yAttr = p}
            updateScatter(data, svg, xAttr, yAttr, dimensions, "y");
        })
    
}

function clearMenu(svg){
    // console.log("clear menu");
    svg.select(".plotMenu")
        .selectAll(".plotMenuButton")
        .transition()
        .duration(800)
        .attr("transform", "translate(0,0)")
        .remove()
}

//Easteregg function prototype

// function easterEgg(data, points, mpvXScale, mpvYScale){
//     data = filterData(data, "ra", "st_dist")
//     var pointsL = points
//     var pointsR = mpvSvg.selectAll(".easterR")
//         .data(data, function(d) {return d.pl_name});

//     pointsL.transition()
//         .delay(3000)
//         .duration(3000)
//         .attr("class", "easterL");

//     points.enter()
//         .append("circle")
//         .attr("class", "easterR")
//         .style("fill-opacity", 0)
//         .attr("cx", function(d) {return (mpvXScale(d.ra))})
//         .attr("cy", function(d) {return (mpvYScale(d.dec))})
//         .attr("r", 2)
//         .transition()
//         .duration(3000)
//         .attr("cx", function(d) {
//             if (d.st_dist !== 0 && d. st_dist !== undefined){
//                 var par = Number(300*(1/d.st_dist))
//                 console.log("par", par)
//                 if (par !== Infinity) {
//                     console.log(Number(d.ra) + par)
//                     return Math.round(mpvXScale(Number(d.ra) + par))}
//                 }
//             }
//         )
//         .style("fill-opacity", 1);
     
// }
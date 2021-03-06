"usestrict";

var menuTimeout;

function buildMpv(svg){
/*
The Multi Planet View and all of its parts is initiated 
*/

    // Initiate the axis containers first, so they will be at the lowest 
    // level in the svg, and transform them into place.
    var xContainer = mpvSvg.append("g")
        .attr("class", "x axisContainer")
        .attr("transform", "translate(0," + (mpvHeight - mpvPadding) + ")");

    var yContainer = mpvSvg.append("g")
        .attr("class", "y axisContainer")
        .attr("transform", "translate(" + mpvPadding + ",0)");

    // appending containers for the actual axis scales
    xContainer.append("g")
        .attr("class", "axis x");
    yContainer.append("g")
        .attr("class", "axis y");

    // appending the axis titles and axis scales the axis containers
    xContainer.append("g")
        .attr("class", "axisTitle x")
        .attr("transform", "translate(" + (((mpvWidth - mpvPadding)/2) + 
                mpvPadding) + "," + 40 + ")")  
      .append("rect")
        .attr("class", "titleButton")
        .attr("width", 250)
        .attr("height", 30)
        .attr("x",-125)
        .attr("y", -15)
        .attr("rx", 5)
        .attr("ry", 5);
    xContainer.select(".axisTitle")
      .append("text")
        .attr("text-anchor", "middle");
 
    yContainer.append("g")
        .attr("class", "axisTitle y")
        .attr("transform", "translate(" + -50 + ", " + 
                ((mpvHeight - mpvPadding)/2) + ") rotate(270)")
      .append("rect")
        .attr("class", "titleButton")
        .attr("width", 250)
        .attr("height", 30)
        .attr("x",-125)
        .attr("y", -15)
        .attr("rx", 5)
        .attr("ry", 5);
    yContainer.select(".axisTitle")
      .append("text")
        .attr("text-anchor", "middle");

    // Initiate the plotcontainer next, so dots are drawn on top of the axes
    svg.append("g")
        .attr("id", "plotContainer");
        
    // Initiate the dropdown menu for choosing the plotted dimension last
    // so it will be on top of the scatterplot and axes
    svg.append("g")
        .attr("class","plotMenu")
        .attr("transform", "translate(" + (((mpvWidth - mpvPadding)/2) + 
                mpvPadding) + ", " + ((mpvHeight - mpvPadding)/2) + ")");
}

function updateScatter(data, svg, xAttr, yAttr, scaleX, scaleY){
    /*
    Updates the old scatterplot to scatterplot with new dimensions xAttr and
    yAttr in the multiplanetview. Using sexy transitions.
    */
    // Filter the data for the chosen dimensions so all datapoints without a 
    // value for x or y will not be drawn.
    var selData = filterData(data, xAttr, yAttr);

    var dataXRange = typeof scaleX !== "undefined" ?  scaleX : d3.extent(selData, function(p){return Number(p[xAttr]);});
    var dataYRange = typeof scaleY !== "undefined" ?  scaleY : d3.extent(selData, function(p){return Number(p[yAttr]);});

   
    var scale = "lin";
    // Even though I do not use this functionality at the moment, 
    // updateScatter has a possibility to plot on a logarithmic scale, if log 
    // scale is selected, it will delete all zero values
    if (scale === "lin"){
        var mpvXScale = d3.scale
            .linear()
            .range([mpvPadding, mpvWidth - 10])
            .domain(dataXRange);
        var mpvYScale = d3.scale
            .linear()
            .range([mpvHeight - mpvPadding, 20])
            .domain(dataYRange);
    }
    if (scale === "log"){
        selData = delZeroVal(selData);
        var mpvXScale = d3.scale
            .log()
            .range([mpvPadding, mpvWidth])
            .domain(dataXRange);
        var mpvYScale = d3.scale
            .log()
            .range([mpvHeight - mpvPadding, 0])
            .domain(dataYRange);
    }

    // A selection of the available dimensions in the data is selected, 
    // because many of the original dimensions are to specific or not plottable
    var mpvDimensions = ["pl_pnum", "pl_orbper", "pl_orbsmax", "pl_orbeccen", 
            "pl_massj", "pl_msinij", "pl_radj", "pl_dens", "pl_orbincl", "ra", 
            "dec", "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", 
            "pl_disc"];

    var xAxis = d3.svg.axis().scale(mpvXScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(mpvYScale).orient("left");
    var plotContainer = svg.select("#plotContainer");

    // transitions for the axes to the new scales
    svg.select(".x.axisContainer")
      .select(".x.axis")
        .transition()
        .duration(1500)
        .call(xAxis);

    svg.select(".y.axisContainer")
      .select("g.y.axis")
        .transition()
        .duration(1500)
        .call(yAxis);

    // transition for the axis titles to the new titles
    svg.select("g.x.axisTitle")
        .on("mouseover", function(p){
            svg.select("g.x.axisTitle")
                .select("rect")
                .classed("highlight", true);
            })
        .on("mouseout", function(p){
            svg.select("g.x.axisTitle")
                .select("rect")
                .classed("highlight", false);
            })
        .on("click", function(p){
            showPlotMenu(data, svg, xAttr, yAttr, mpvDimensions, "x");
            })
        .transition()
        .duration(1500)
      .select("text")
        .attr("dy", ".35em")
        .text(findDimAttr(DIMDICT, xAttr, "label"));

    svg.select("g.y.axisTitle")        
        .on("mouseover", function(p){
                svg.select("g.y.axisTitle")
                    .select("rect")
                    .classed("highlight", true);
            })
        .on("mouseout", function(p){
            svg.select("g.y.axisTitle")
                .select("rect")
                .classed("highlight", false);
            })
        .on("click", function(p){
            showPlotMenu(data, svg, xAttr, yAttr, mpvDimensions, "y");
            })
        .transition()
        .duration(1500)
      .select("text")
        .attr("dy", ".35em")
        .text(findDimAttr(DIMDICT, yAttr, "label"));
     
    // data-join with pl_name as keyfunction
    var points = plotContainer.selectAll(".dot")
        .data(selData, function(p) {return p.pl_name});

    // update old data
    points.transition()
        .duration(1500)
        .attr("cx", function(p) {return (mpvXScale(p[xAttr]))})
        .attr("cy", function(p) {return (mpvYScale(p[yAttr]))});

    // select and update the selected point
    plotContainer.selectAll(".selDot")
        .transition()
        .duration(1500)
        .attr("cx", function(p) {
            if (Number(p[xAttr]) != 0){
            return mpvXScale(p[xAttr]);}
            else{ return (mpvPadding - 5);}
        })
        .attr("cy", function(p) {
            if (Number(p[yAttr]) != 0){
            return mpvYScale(p[yAttr]);}
            else{return ((mpvHeight - mpvPadding) + 5);}});

    // enter new data
    points.enter()
        .insert("circle", ".sameVal, .selDot")
        .classed("dot", true)
        .style("fill-opacity", 0)
        .attr("cx", function(p) {return (mpvXScale(p[xAttr]))})
        .attr("cy", function(p) {return (mpvYScale(p[yAttr]))})
        .attr("r", rDot)
        .transition()
        .duration(1500)
        .style("fill-opacity", 1);


    // exit old data
    points.exit()
        .classed("exit", true)
        .transition()
        .duration(1500)
        .style("fill-opacity", 0)
        .remove();

    // highlighting datapoints when hovering and selecting one datapoint on 
    // clicking the selected datapoint is also sent to the Single Planet View 
    // through the "toSpv" function
    points.on("mouseover", function(p){
            d3.select(d3.event.target)
                .classed("highlight", true);
            })
        .on("mouseout", function(p){
            d3.select(d3.event.target)
                .classed("highlight", false);
            })
        .on("click", function(p){
            toSpv(p, spvSvg);
            drawSelDot(p, mpvXScale(p[xAttr]), mpvYScale(p[yAttr]), mpvSvg);
            });

    //Easteregg not ready yet
    // if(xAttr === "ra" && yAttr === "dec") {
    //     easterEgg(selData, points, mpvXScale, mpvYScale)
    // }
}

function drawSelDot(planet, x, y, svg){
    var plotContainer = svg.select("#plotContainer");
    plotContainer.selectAll(".selDot")
        .transition()
        .duration(400)
        .attr("r", 0)
        .remove()

    var selPoint = plotContainer.selectAll(".selDot")
        .data([planet], function(d) {return d.pl_name})
        
    selPoint.enter()
        .append("circle")
        .attr("class", "selDot")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .transition()
        .duration(400)
        .attr("r", 5);
}

function toSpv(planet, svg){
    // sends the selected planet to the svg
    // the size of the svg is matched to the browser window
    var mq = window.matchMedia("(max-width: 1272px)");
    mq.addListener(function(){drawSpv(planet,svg)});
    drawSpv(planet,svg);
}


function filterData(data, xAttr, yAttr) {
    /*
    Function to filter the data given two dimensions. Any data without one of
    the attributes is not returned.
    */
    var d, newData = [];
        for (d = 0; d < data.length; d++) {
            if (Number(data[d][xAttr]) != 0 && Number(data[d][yAttr]) != 0) {
                newData.push(data[d]);
            }
        }
    return newData;
}

function showPlotMenu(data, svg, xAttr, yAttr, dimensions, axis, scale) {
    /*
    Function to show the menu for changing the axis dimension.
    */
    var buttonWidth = 100;
    var buttonHeight = 30;
    //define the contents of the first columns of the menu
    var col = dimensions.slice(0,Math.round(dimensions.length/2));
    
    // for each menu (y and x), the start and end positions are defined
    if (axis === "x"){
        var start1 = function(d,i){return "translate(-101,400)"}; 
        var start2 = function(d,i){return "translate(1,400)"};
        var end1 = function(d, i) { 
            return "translate(-101," + ( i - col.length/2) * buttonHeight + ")"
            };
        var end2 = function(d, i) { 
            return "translate(1," + ((i - col.length) - col.length/2) * 
                buttonHeight + ")"
            };
    }
    if (axis === "y"){
        var start1 = function(d, i) { 
            return "translate(-600," + (i - col.length/2) * buttonHeight + ")"
            };
        var start2 = function(d, i) { 
            return "translate(-600," + ((i - col.length) - col.length/2) * 
                buttonHeight + ")"
            }; 
        var end1 = function(d, i) { 
            return "translate(-351," + (i - col.length/2) * buttonHeight + ")"
            };
        var end2 = function(d, i) { 
            return "translate(-249," + ((i - col.length) - col.length/2) * 
                buttonHeight + ")"
            };
    }

    // button databinding
    var button = svg.select(".plotMenu")
        .selectAll(".plotMenuButton")
        .data(dimensions);

    // button enterselection, appended with starting position and a transition
    // to the end position of each button
    button.enter()
        .append("g")
        .attr("class", "plotMenuButton")
        .attr("transform", function(d,i){
            if(col.indexOf(d) >= 0){return start1(d,i)} 
            else{return start2(d,i)}
            })
        .transition()
        .duration(800)
        .attr("transform", function(d,i){
            if(col.indexOf(d) >= 0){return end1(d,i)} 
            else{return end2(d,i)}
            });
    
    // contents of each button
    button.append("rect")
        .attr("width", 100)
        .attr("height", 0)
        .attr("height", buttonHeight - 1)
    
    button.append("text")
        .attr("dx", ".35em")
        .attr("y", buttonHeight / 2)
        .attr("dy", ".35em")
        .text(function(d){return d;})

    // interactivity of the menubuttons with updateScatter call
    button.on("mouseover", function(p){
            d3.select(d3.event.target.parentNode)
                .classed("highlight", true); 
            explainDim(p, explainDimDiv);
            })
        .on("mouseout", function(p){
            d3.select(d3.event.target.parentNode)
                .classed("highlight", false);
            })
        .on("click", function(p){
            if (axis === "x") {xAttr = p}
            if (axis === "y") {yAttr = p}
            updateScatter(data, svg, xAttr, yAttr, scale);

        });

// When the plotmenu is on screen, clicking anywhere in the svg will make the 
// menu disappear. A timeout is needed, otherwise clicking on the menubutton 
// will simultaneously open and close the menu, so no menu is shown at all.
    menuTimeout = setTimeout(function(d){svg.on("click", function(p){
                clearMenu(svg, col, start1, start2); 

                svg.on("click", function(){});
            });
        }, 5);

}

function clearMenu(svg, col, end1, end2){
    /*
    This funcion clears the menu in a smooth transition.
    */
    
    clearTimeout(menuTimeout);
    svg.select(".plotMenu")
        .selectAll(".plotMenuButton")
        .transition()
        .duration(800)
        .attr("transform", function(d,i){
            if(col.indexOf(d) >= 0){return end1(d,i)} 
            else{return end2(d,i)}
            })
        .remove()
}

function addClass(points, dim, val, newClass, assign){
    /*
    Function to add or remove a class to specific datapoints.
    */
    assign = typeof assign !== "undefined" ?  assign : true;

    points.classed(newClass, function(d){
        if (d[dim] == val){return assign;}
        else{return false}});
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
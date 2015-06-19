"usestrict";

function showInfoBar(planet, dimensions, svg, nCols) {
    /* The showInfoBar function builds the infobar in the given div element. With nCols and 
    the different dimensions that have to be displayed, it calculates the number of 
    dimensions per column. Then it displays for each of the dimensions the given
    planets data in html on the page.*/
    svg.selectAll("*").remove();

    var colLength = (Math.round(dimensions.length/nCols))
    var entryHeight = 22
    var entry = svg.selectAll(".info.entry")
        .data(dimensions);


    entry.enter()
        .append("g")
        .attr("transform", function(d,i){return "translate(" + (10 + (Math.floor(i/colLength) * (mpvWidth/nCols) - 5)) + 
            "," + (((i % colLength) * entryHeight) + 10) + ")"})
        .attr("class", "info entry")

    entry.append("rect")
        .attr("width", ((mpvWidth - 10) /nCols))
        .attr("height", 0)
        .attr("height", entryHeight - 1)
        .attr("rx", rRect)
        .attr("ry", rRect);

    entry.append("text")
        .attr("dx", ".35em")
        .attr("y", entryHeight / 2)
        .attr("dy", ".35em")
        .text(function(d){return d + ": " + planet[d]}) 

    entry.on("mouseover", function(p){d3.select(d3.event.target.parentNode).classed("highlight", true);})
        .on("mouseout", function(p){d3.select(d3.event.target.parentNode).classed("highlight", false);})
        .on("click", function(p){
            story(p, storyDiv)
        })
                


}

function findDimAttr(dimDict, dimension, attr){
    for (d in dimDict){
        if (dimension === dimDict[d]["name"]){
            return dimDict[d][attr]
        }
    }
}


function story(dimension, div){
   div.selectAll("*")
        .remove()
    div.append("h4")
        .html(findDimAttr(DIMDICT, dimension, "label"))
    div.append("p")
        .html(findDimAttr(DIMDICT, dimension, "description"))
}
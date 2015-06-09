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
    var dataXRange = d3.extent(data, function(p) { return p[xAttr]; });
    var dataYRange = d3.extent(data, function(p) { return p[yAttr]; });

    mpvXTransform.domain(dataXRange);
    mpvYTransform.domain(dataYRange);

    var selData = filterData(data, xAttr, yAttr)

    // console.log(selData.length, data.length);
    // data-join
    var points = mpvSvg.selectAll(".dot")
        .data(selData, function(d) {return d.pl_name})

    // update old data
    points.transition()
        .duration(800)
        .attr("cx", function(d) {return (mpvXTransform(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYTransform(d[yAttr]))})

    // enter new data
    points.enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", 0)
        .attr("cy", function(d) {return (mpvYTransform(d[yAttr]))})
        .style("fill", "rgb(0,0,0,0)")
        .on("click", function(p){toSpv(p);})
        .transition()
        .duration(800)
        .attr("cx", function(d) {return (mpvXTransform(d[xAttr]))})
        .attr("cy", function(d) {return (mpvYTransform(d[yAttr]))})
        .attr("r", 2)
        .style("fill", "rgb(0,0,0,1)");

    // exit old data
    points.exit()
        .attr("class", "exit")
        .transition()
        .duration(800)
        .attr("cx", 0)
        .style("fill", "rgb(0,0,0,0)")
        .remove();

}

"usestrict";

function showInfoBar(planet, svg, nCols) {
    /* The showInfoBar function builds the infobar in the given div element. 
    With nCols and the different dimensions that have to be displayed, it 
    calculates the number of dimensions per column. Then it displays for 
    each of the dimensions the given planets data in html on the page.*/

    // infobar is cleaned
    svg.selectAll("*").remove();
    // specification of the dimensions that will be displayed on the infobar
    var dimensions = ["pl_name", "pl_disc", "pl_discmethod", "pl_pnum", 
        "pl_orbper", "pl_orbsmax", "pl_orbeccen", "pl_massj", "pl_msinij", 
        "pl_radj", "pl_dens", "pl_orbincl", "pl_kepflag", "ra", "dec", 
        "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", "hd_name", 
        "hip_name",  "pl_pelink"];
    // column length is calculated from the length of the dimension list and
    // the specified number of columns "nCols"
    var colLength = (Math.round(dimensions.length/nCols));
    var entryHeight = 22;

    // info entry databinding
    var entry = svg.selectAll(".info.entry")
        .data(dimensions);

    // enter selection of info entries
    entry.enter()
        .append("g")
        .attr("transform", function(d,i){
                return "translate(" + (10 + (Math.floor(i/colLength) * 
                    (mpvWidth/nCols) - 5)) + "," + (((i % colLength) * 
                    entryHeight) + 10) + ")"
            })
        .attr("class", "info entry");

    // append content to entries
    entry.append("rect")
        .attr("width", ((mpvWidth - 10) /nCols))
        .attr("height", 0)
        .attr("height", entryHeight - 1)
        .attr("rx", 5)
        .attr("ry", 5);

    entry.append("text")
        .attr("dx", ".35em")
        .attr("y", entryHeight / 2)
        .attr("dy", ".35em")
        .text(function(d){
            if (d === "pl_pelink"){return d;}
            else{return d + ": " + planet[d]}});



    // add functionality to entries
    entry.on("mouseover", function(d){
                d3.select(d3.event.target.parentNode)
                    .classed("highlight", true);
            })
        .on("mouseout", function(d){
                d3.select(d3.event.target.parentNode)
                    .classed("highlight", false);
            })
    // clicking an entry will select all points in the mpv with the same value
    // for this dimension as the selected planet. It also sends the dimension
    // description to the explanation window
        .on("click", function(d){
                entry.classed("sameVal", false);
                d3.select(d3.event.target.parentNode).classed("sameVal", true);
                var points = mpvSvg.select("#plotContainer").selectAll(".dot");
                explainDim(d, explainDimDiv);
                addClass(points, d, planet[d], "sameVal", true);
            })
}

function findDimAttr(dimDict, dimension, attr){
    // find the corresponding entry in the dimDict of a given dimension
    // and select the given attribute
    for (d in dimDict){
        if (dimension === dimDict[d]["name"]){
            return dimDict[d][attr];
        }
    }
}


function explainDim(dimension, div){
    // fill the explanation window
   div.selectAll("*")
        .remove();
    div.append("h4")
        .html(findDimAttr(DIMDICT, dimension, "label"));
    div.append("p")
        .html(findDimAttr(DIMDICT, dimension, "description"));
}
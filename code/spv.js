function toSpv(planet, svg){
    /*
    Function to draw the SinglePLanetView of the selected planet object. Takes
    a planet object as input and draws its orbit and the earth orbit on the svg.
    */
    var spvDimensions = ["pl_name", "pl_disc", "pl_discmethod", "pl_pnum", "pl_orbper", "pl_orbsmax", "pl_orbeccen", "pl_massj", "pl_msinij", "pl_radj", "pl_dens", "pl_orbincl", "pl_kepflag", "ra", "dec", "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", "hd_name", "hip_name",  "pl_pelink"];

    var rx = planet.pl_orbsmax, rStar = planet.st_rad;
    if (planet.pl_orbeccen == 0 || planet.pl_orbeccen == "") {ecc = 0 }
    else {ecc = planet.pl_orbeccen}
    if (planet.st_rad == 0 || planet.st_rad == "") {rStar = (695500/149597871) *  150;}
    else {rStar = (695500/149597871) * planet.st_rad * 150}

    var ry = rx * Math.sqrt(1-Math.pow(ecc,2))
    svg.selectAll("*")
        .remove();

    if(rx < 1){
        svg.append("circle")
            .attr("class", "star")
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", rStar);

        svg.append("ellipse")
            .attr("class", "orbit")
            .attr("cx", Math.sqrt(Math.pow((rx * 150) ,2) - Math.pow((ry * 150),2)) + 200)
            .attr("cy", 200)
            .attr("rx", rx * 150)
            .attr("ry", ry * 150);
          
        svg.append("circle")
            .attr("class", "au")
            .style("stroke-dasharray", ("10,3"))
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r",  150);
        }
    else{
        svg.append("circle")
            .attr("class", "star")
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", rStar );

        svg.append("ellipse")
            .attr("class", "orbit")
            .attr("cx", Math.sqrt(Math.pow((150) ,2) - Math.pow(((ry/rx) * 150),2)) + 200)
            .attr("cy", 200)
            .attr("rx", 150)
            .attr("ry", 150 * Math.sqrt(1-Math.pow(ecc,2)));
        
        svg.append("circle")
            .attr("class", "au")
            .style("stroke-dasharray", ("10,3"))
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", Math.round(150/(rx)));

        }

    svg.append("text")
        .attr("x", 200)
        .attr("y", 20)
        .text(planet.pl_name);

    infoBar(planet, spvDimensions, body.select("#spInfoDiv"), 3);
    
    
}

function infoBar(planet, dimensions, div, nCols) {
    div.selectAll("*").remove();
    for (var n = 1; n <= nCols; n++) {
        div.append("div")
            .attr("class", "infoCol")
            .attr("id", "infoCol" + n)
            .style("width", Math.round(100/nCols) + "%")
            .style("left", (n-1) * Math.round(100/nCols) + "%")
            .append("p")
            .html(function(d) {
                var info = "",
                    colLen = Math.round(dimensions.length / nCols),
                    dims = dimensions.slice( colLen * (n - 1), colLen * (n));
                    
                for (var d in dims)
                    {var key = dims[d];  
                    if (key === "pl_pelink") {info += "<a href=" + planet[key] + ">" + key + "</a>"} 
                    else {info += key + "  :  " + planet[key] + "<br>"}
                }
                return info;
            })
        };

}
function toSpv(planet, svg){
    /*
    Function to draw the SinglePLanetView of the selected planet object. Takes
    a planet object as input and draws its orbit and the earth orbit on the svg.
    */
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
        spvSvg.append("circle")
            .attr("class", "star")
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", rStar );

        spvSvg.append("ellipse")
            .attr("class", "orbit")
            .attr("cx", Math.sqrt(Math.pow((150) ,2) - Math.pow(((ry/rx) * 150),2)) + 200)
            .attr("cy", 200)
            .attr("rx", 150)
            .attr("ry", 150 * Math.sqrt(1-Math.pow(ecc,2)));
        
        spvSvg.append("circle")
            .attr("class", "au")
            .style("stroke-dasharray", ("10,3"))
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", Math.round(150/(rx)));

        }

    spvSvg.append("text")
        .attr("x", 200)
        .attr("y", 20)
        .text(planet.pl_name)
}

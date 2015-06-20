"usestrict";

function drawSpv(planet, svg){
    /*
    Function to draw the SinglePLanetView of the selected planet object. Takes
    a planet object as input and draws its orbit and the earth orbit on the svg.
    */

    // Eventlistener to check wether the window has resized so the model will be
    // redrawn in the center of the resized svg


    console.log("resize")
    // svg.attr("width", )

    var spvDimensions = ["pl_name", "pl_disc", "pl_discmethod", "pl_pnum", "pl_orbper", "pl_orbsmax", "pl_orbeccen", "pl_massj", "pl_msinij", "pl_radj", "pl_dens", "pl_orbincl", "pl_kepflag", "ra", "dec", "st_dist", "st_vj", "st_teff", "st_mass", "st_rad", "hd_name", "hip_name",  "pl_pelink"];
    // console.log(spvSize().width/2, spvSize().height/2);
    var svgCenter = [spvSize().width/2, spvSize().height/2];
    var rx = planet.pl_orbsmax, rStar = planet.st_rad;
    if (planet.pl_orbeccen == 0 || planet.pl_orbeccen == "") {ecc = 0}
    else {ecc = planet.pl_orbeccen}
    if (planet.st_rad == 0 || planet.st_rad == "") {rStar = (695500/149597871) *  150}
    else {rStar = (695500/149597871) * planet.st_rad * 150}

    var ry = rx * Math.sqrt(1-Math.pow(ecc,2))
    svg.selectAll("*")
        .remove();

    if(rx < 1){
        svg.append("circle")
            .attr("class", "star")
            .attr("cx", svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("r", rStar);

        svg.append("ellipse")
            .attr("class", "orbit")
            .attr("cx", Math.sqrt(Math.pow((rx * 150) ,2) - Math.pow((ry * 150),2)) + svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("rx", rx * 150)
            .attr("ry", ry * 150);
          
        svg.append("circle")
            .attr("class", "au")
            .style("stroke-dasharray", ("10,3"))
            .attr("cx", svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("r",  150);
        }
    else{
        svg.append("circle")
            .attr("class", "star")
            .attr("cx", svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("r", rStar );

        svg.append("ellipse")
            .attr("class", "orbit")
            .attr("cx", Math.sqrt(Math.pow((150) ,2) - Math.pow(((ry/rx) * 150),2)) + svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("rx", 150)
            .attr("ry", 150 * Math.sqrt(1-Math.pow(ecc,2)));
        
        svg.append("circle")
            .attr("class", "au")
            .style("stroke-dasharray", ("10,3"))
            .attr("cx", svgCenter[0])
            .attr("cy", svgCenter[1])
            .attr("r", Math.round(150/(rx)));

        }

    svg.append("text")
        .attr("class", "plName")
        .attr("x", svgCenter[0])
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(planet.pl_name);

    // infoBar(planet, spvDimensions, spInfoDiv, 3);
    showInfoBar(planet, spvDimensions, spInfoSvg, 3);
}

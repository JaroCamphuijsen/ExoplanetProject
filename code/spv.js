"usestrict";


var t = 0;
d3.timer(function (){animationStep(1, spvSvg)});

function drawSpv(planet, svg){
    /*
    Function to draw the SinglePLanetView of the selected planet object. Takes
    a planet object as input and draws its orbit and the earth orbit on the given svg.
    */

    //svgcenter and animationspeed 
    var svgcx = spvSize().width/2, svgcy = spvSize().height/2;
    var speed = 1;

    // buildModel returns a new exoplanet and earth object with
    // properties useful for drawing the spv 
    var model = buildModel(planet,svgcx, svgcy);
    var exoPlanet = model[0], earth = model[1]
    
    // the svg is cleaned elements appended
    svg.selectAll("*")
        .remove();

    svg.append("text")
        .attr("class", "plName")
        .attr("x", svgcx)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(planet.pl_name);

    svg.append("circle")
            .attr("class", "star")
            .attr("cx", earth.cx)
            .attr("cy", earth.cy)
            .attr("r", exoPlanet.rstar);

    // orbit of planets are drawn separately
    drawOrbit(earth, svg);
    drawOrbit(exoPlanet, svg);
    // the total model is animated
    planetAnimation(model, speed, svg);
 
    showInfoBar(planet, spInfoSvg, 3);
}

function buildModel(planet, svgcx, svgcy){
    /* 
    takes and mpv planet and turns it into an mpv model
    including the earth
    returns list of spv planetobjects 
    planet:     object      => mpv planet object
    svgcx/
    svgcy:      integer     => center of the svg
    */

    var orbsmax = planet.pl_orbsmax, orbPer = (planet.pl_orbper/365), rStar;
    if (planet.pl_orbeccen == "") {ecc = 0}
    else {ecc = planet.pl_orbeccen}
    var orbsmin = orbsmax * Math.sqrt(1-Math.pow(ecc,2));
    var orbitNorm = 150, starToOrb = 695500/149597871
    
    // because of the large range of exoplanet orbits, I handle orbits larger
    // than the earth orbit differently than those that are smaller
    if (orbsmax < 1) {
        var exoPlanet = {
                cx : Math.round(Math.sqrt(Math.pow((orbsmax * orbitNorm), 2) -
                        Math.pow((orbsmin * orbitNorm), 2)) + svgcx),
                cy : svgcy, 
                rx : orbsmax * orbitNorm, 
                ry : orbsmin * orbitNorm,
                orb: orbPer,
                rpl: 5,
                rstar : function() {
                        if (planet.st_rad == 0 || planet.st_rad == "") 
                            {return (starToOrb) *  orbitNorm;}
                        else {return (starToOrb) * planet.st_rad * orbitNorm;}
                    }
            };
        var earth = {cx : svgcx, 
                cy : svgcy, 
                rx : orbitNorm, 
                ry : orbitNorm,
                orb: 1,
                rpl: 5,
                rstar : function() {return (starToOrb) * orbitNorm;}
            };
    }
    else {
        var exoPlanet = {
                cx : Math.sqrt(Math.pow((orbitNorm) ,2) - 
                        Math.pow(((orbsmin/orbsmax) * orbitNorm),2)) + svgcx,
                cy : svgcy, 
                rx : orbitNorm, 
                ry : orbitNorm * Math.sqrt(1-Math.pow(ecc,2)),
                orb: orbPer,
                rpl: 5,
                rstar : function() {
                        if (planet.st_rad == 0 || planet.st_rad == "") 
                            {return Math.round((starToOrb) *  orbitNorm)}
                        else {return Math.round((starToOrb) * planet.st_rad * 
                                (orbitNorm/(orbsmax)))}
                    }
            };
        var earth = {cx : svgcx, 
                cy : svgcy, 
                rx : Math.round(orbitNorm/(orbsmax)), 
                ry : Math.round(orbitNorm/(orbsmax)),
                orb: 1,                
                rpl: 5,
                rstar : function() {
                        return Math.round((starToOrb) * (orbitNorm/(orbsmax)))
                    }
            };
    }

    // planet name and class properties
    exoPlanet.pl_name = planet.pl_name;
    exoPlanet.pl_class = "exo";
    earth.pl_name = "earth";
    earth.pl_class = "terra";
    
    return [exoPlanet, earth];
}

function drawOrbit(planet, svg){
    // draw orbit of the given planet object
    svg.append("ellipse")
        .attr("class", "orbit " + planet.pl_class)
        .attr("stroke-dasharray","4,1")
        .attr("cx", planet.cx)
        .attr("cy", planet.cy)
        .attr("rx", planet.rx)
        .attr("ry", planet.ry);
 
}

function planetAnimation(planets, speed, svg){
    /* 
    append planet spheres and animate them
    planets:    list of planet objects
    speed:      integer
    svg:        d3 svg selection
    */
    var planets = svg.selectAll(".plContainer")
        .data(planets);

    // enter the planets in the model and given them their starting position
    planets.enter()
        .append("g")
        .attr("class", function(p) {return "plContainer " + p.pl_class;})
        .append("circle")
        .attr("class", "planet")
        .attr("r", function(p){return p.rpl})
        .attr("cx", function(p){return (p.cx - p.rx)})
        .attr("cy", function(p){return p.cy});
}

function animationStep(speed, svg, animCount) {

    var planets = svg.selectAll(".plContainer")

    var resolution = 2000;
    t += 1;
    
    var t_theta = ((2 * Math.PI)/resolution) * speed * t;

     // t_x = planet.rx * Math.cos(t_theta);
     // t_y = planet.ry * Math.sin(t_theta);

    planets.select(".planet")
        .attr('cx', function(p){return p.cx + (p.rx * Math.cos(t_theta/p.orb));})
        .attr('cy', function(p){return p.cy + (p.ry * Math.sin(t_theta/p.orb));});


}
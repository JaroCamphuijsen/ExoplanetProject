"usestrict";

function drawSpv(planet, svg){
    /*
    Function to draw the SinglePLanetView of the selected planet object. Takes
    a planet object as input and draws its orbit and the earth orbit on the given svg.
    */

    //svgcenter, animationspeed and orbital variables are declared
    var svgcx = spvSize().width/2, svgcy = spvSize().height/2;
    var speed = 1;
    var model = buildModel(planet,svgcx, svgcy);
    var exoPlanet = model[0], earth = model[1]
    
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


    drawOrbit(earth, svg);
    drawOrbit(exoPlanet, svg);
    planetAnimation(model, speed, svg);
 
    showInfoBar(planet, spInfoSvg, 3);
}

function buildModel(planet, svgcx, svgcy){

    var orbsmax = planet.pl_orbsmax, orbPer = (planet.pl_orbper/365), rStar;
    if (planet.pl_orbeccen == "") {ecc = 0}
    else {ecc = planet.pl_orbeccen}
    var orbsmin = orbsmax * Math.sqrt(1-Math.pow(ecc,2));
    
    if (orbsmax < 1) {
        var exoPlanet = {cx : Math.round(Math.sqrt(Math.pow((orbsmax * 150), 2) - Math.pow((orbsmin * 150), 2)) + svgcx),
                cy : svgcy, 
                rx : orbsmax * 150, 
                ry : orbsmin * 150,
                orb: orbPer,
                rpl: 5,
                rstar : function() {if (planet.st_rad == 0 || planet.st_rad == "") {return (695500/149597871) *  150;}
                        else {return (695500/149597871) * planet.st_rad * 150;}
                    }
            };
        var earth = {cx : svgcx, 
                cy : svgcy, 
                rx : 150, 
                ry : 150,
                orb: 1,
                rpl: 5,
                rstar : function() {return (695500/149597871) * 150;}
            };
    }
    else {
        var exoPlanet = {cx : Math.sqrt(Math.pow((150) ,2) - Math.pow(((orbsmin/orbsmax) * 150),2)) + svgcx,
                cy : svgcy, 
                rx : 150, 
                ry : 150 * Math.sqrt(1-Math.pow(ecc,2)),
                orb: orbPer,
                rpl: 5,
                rstar : function() {if (planet.st_rad == 0 || planet.st_rad == "") {return Math.round((695500/149597871) *  150)}
                        else {return Math.round((695500/149597871) * planet.st_rad * (150/(orbsmax)))}
                    }
            };
        var earth = {cx : svgcx, 
                cy : svgcy, 
                rx : Math.round(150/(orbsmax)), 
                ry : Math.round(150/(orbsmax)),
                orb: 1,                
                rpl: 5,
                rstar : function() {return Math.round((695500/149597871) * (150/(orbsmax)))}
            };
    }
    exoPlanet.pl_name = planet.pl_name;
    exoPlanet.pl_class = "exo";
    earth.pl_name = "earth";
    earth.pl_class = "terra";
    
    return [exoPlanet, earth];
}

function drawOrbit(planet, svg){
    svg.append("ellipse")
        .attr("class", "orbit " + planet.pl_class)
        .attr("cx", planet.cx)
        .attr("cy", planet.cy)
        .attr("rx", planet.rx)
        .attr("ry", planet.ry);
 
}

function planetAnimation(planets, speed, svg){
    var planets = svg.selectAll(".plContainer")
        .data(planets)

    planets.enter()
        .append("g")
        .attr("class", "plContainer " + function(p){return p.pl_class})
        .append("circle")
        .attr("class", "planet")
        .attr("r", function(p){return p.rpl})
        .attr("cx", function(p){return (p.cx - p.rx)})
        .attr("cy", function(p){return p.cy});
    
    t = 0;
    d3.timer(function() { animationStep(planets, speed, svg)  })           
               
}

function animationStep(planets, speed, svg) {
    var resolution = 500
    t += 1;
    

    var t_theta = ((2 * Math.PI)/resolution) * speed * t;

     // t_x = planet.rx * Math.cos(t_theta);
     // t_y = planet.ry * Math.sin(t_theta);
        // console.log(Math.cos(t_theta))
    // console.log(Math.cos(t_theta))
    planets.select(".planet")
        .attr('cx', function(p){return p.cx + (p.rx * Math.cos(t_theta/p.orb));})
        .attr('cy', function(p){return p.cy + (p.ry * Math.sin(t_theta/p.orb));});
}
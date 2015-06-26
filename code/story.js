"usestrict";


function intro(data){
    var storyDiv = body.append("div")
    .attr("id","story");
    
    var text = storyDiv.style("left", "50%")
        .style("top", "40%")
        .style("width", "400px")
        .append("p")
        .attr("class","intro")
        .html("Hello there, welcome to the Interactive Exoplanet Encyclopedia. Have fun exploring the universe!");

    var button = storyDiv.append("div")
        .attr("class", "storyButton")
        .style("width", "100px")
        .style("float", "left");
     var button2 = storyDiv.append("div")
        .attr("class", "storyButton")
        .style("width", "100px")
        .style("float", "right");

    button2.append("p")
        .html("Go away!");
    button2.on("mouseover", function() { button2.classed("highlight","true")})
        .on("mouseout", function(){button2.attr("class","storyButton")})
        .on("click", function(){storyDiv.transition()
                                    .duration(800)
                                    .style("right", "-500px")
                                    .style("top", "-500px")
                                    .remove()});

    button.append("p")
        .html("Go on!");
    button.on("mouseover", function() { button.classed("highlight","true")})
        .on("mouseout", function(){button.attr("class","storyButton")})
        .on("click", function(){

            storyDiv.transition()
                .duration(800)
                .style("right", "100px")
                .style("top", "100px");
                
            storyDiv.select(".intro")
                .html("The scatterplot over there is interactive, try clicking one of the axis titles. You can choose a " + 
                    "dimension for yourself and watch the planets fly into place. For example lets see if we can visualize " +
                    "Keplers third law of planetary motion.");
            button.select("p")
                .html("Go Kepler!")
            
            button.on("click", function(p){
                updateScatter(data, mpvSvg, "pl_orbper", "pl_orbsmax",[0,8000], [0,8])
                storyDiv.transition()
                    .duration(800)
                    .style("left", "100px")
                    .style("top", "100px");
                                
                storyDiv.select(".intro")
                    .html("What do we see here! Well, Keplers third law says: The square of the orbital period of a planet " + 
                                "is proportional to the cube of the semi-major axis of its orbit. \n It's also possible to select a planet in " + 
                                "the scatterplot, try it! Blue is for the earth we know and red is for the exoplanet " + 
                                "model and below the orbit window you'll find some detailed information about the planet.");
                
                button.select("p")
                    .html("Ok, I did it")
                    
                button.on("click", function(p){
                    storyDiv.select(".intro")
                        .html("Ok so now lets try to click on one of the data values down below, you can use those " + 
                            "to highlight all planets in the scatterplot with that same value and you get a small " + 
                            "description in the other window. I think I explained everything now. Have fun!");
                        
                    button.transition()
                        .duration(800)
                        .remove()
            })    
            })
            }
        )

}




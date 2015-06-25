"usestrict";
function intro(){
    var text = storyDiv.style("right", "50%")
        .style("top", "50%")
        .style("width", "300px")
        .append("p")
        .attr("class","intro")
        .html("Hello there, welcome to the Interactive Exoplanet Encyclopedia. Have fun exploring the universe!");

    var button = storyDiv.append("div")
        .attr("class", "storyButton")
        .style("width", "100px")

    button.append("p")
        .html("Go on!")
        .on("mouseover", function() { button.style("background-color","rgba(196,119,73,.8)")} )
        .on("mouseout", function(){ button.style("background-color","rgba(220,220,220,.8)")})
        .on("click", function(){
            storyDiv.transition()
                .duration(800)
                .style("right", "100px")
                .style("top", "100px");
                
            storyDiv.select(".intro")
                .html("The skymap over there is interactive, try clicking one of the axis titles. You can choose a " + 
                    "dimension for yourself and watch the planets fly into place.");
            
            button.on("click", function(p){
                                
                storyDiv.select(".intro")
                    .html("It's also possible to select a planet in the scatterplot, this text will make place for an orbital " + 
                        "model and below this window you'll find some detailed information about the planet.");
                
                button.on("click", function(p){storyDiv.remove()})
            })
            }
        )

}




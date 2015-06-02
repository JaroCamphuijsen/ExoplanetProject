# Exoplanet Project Proposal
###Jaromir Camphuijsen
This is the proposal of my datavisualization project. My goal with this project is to give a structured and easy to use interactive overview of all known exoplanets. And by some storytelling, explain about the observation and awesomeness of exoplanets.

1. Features
2. Sketch
3. Data
4. Decomposition
5. Platform
6. Potential problems
7. Review

## Features
The user will be able to choose to display all known exoplanets in the sky or in a scatterplot with different possible axes. This enables the user to explore the collection of all discovered exoplanets and look for correlations between different values like planetary mass and time of discovery.
In the sky coordinate system or scatterplot, exoplanets can be selected to give the user detailed information about its values. A model of the planetary system will be displayed and perhaps the original data of discovery or additional measurements. 

## Sketch
![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_1.jpg "Optional title")
The visualization with the nightsky view.

![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_2.jpg "Optional title")
The visualization with the scatterplot view.

## Data
I use [the exoplanet archive from NASA](http://exoplanetarchive.ipac.caltech.edu/) to display all exoplanets in the sky coordinate system or scatterplot and for additional exoplanet or host star information. It is also possible to get the raw observational data like transit lightcurves from the same website although it is not in the same database, it is possible to download the observational data in bulk using the *weGet* tool, offered by [IRSA](http://irsa.ipac.caltech.edu/docs/batch_download_help.html). While the exoplanet archive data is ready to use since it is in CSV format, downloading and using the light curves with this bulk download tool will take more time. 

##Decomposition
I have some clearly distinct problems. First I'll concentrate on the multiplanet view, with the night sky and scatterplots. I would like to try to let them fade over into eachother. So each planet in the nightsky will find its way into the scatterplot. 
If I have a scatterplot or skymap ready I can start with the second part which is the single planet view. The multiplanet view can later be extended to other possible scatterplots or nightsky geometries. 
By clicking one of the datapoints in the multiplanet view the user will be able to select a single planet which will light up. A model of the selected planetary system will be shown and some additional information about the planet.
This can also be extended later with calculation of the habitable zone of the host star and showing this zone in the model. 
Lastly lightcurves and raw observational data for every single exoplanet can be added. 
Also it would be interesting to select two or more planets and show them in the same planetary model to compare them. However this makes things more complicated and will mess up the original design so it will have to wait until the rest is done.

##Platform
I'll mainly use javascript with the D3 library to draw the plots. D3 enables you to easily bind javascript objects to svg objects and animate these svg objects. This enables me to make the smooth transitions in the multiplanet view and maybe a moving planetary model for the single planet view.
There is an API for accessing the NASA exoplanet database, but it may be easier to import use a selection of the full database and paste it in my js script using the D3 csv paster. 
For the raw observational data there is this tool *weGet* of which I have no clue if it is easy to use. 

##Potential problems
Potential problems will lie in making the animated transitions between the different multiplanet views and in the interaction between the multi- and single planet view. Building the planetary model is going to be a challenge since the orbits are in general not circular but elliptical and can range from 0.02 AU to 100 AU. Maybe our own solar system must be shown as reference at all times.
The data is not complete for all entries so I'll have to decide what to do with missing data.

##Review
I looked at several exoplanet visualizations, for example the exoplanet skymap shown in my sketch. This is of course a static visualization and I would like to make it interactive by adding transitions to scatterplots and making the data points clickable.
Another visualization for inspiration was [the interactive multiplanetary model](http://nbremer.github.io/exoplanets/) which is beautiful, but it is hard to select and keep track of individual planets because of the movement. However, since it was made with D3 I think I can use a lot from this visualization for my own model.



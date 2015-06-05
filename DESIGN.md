# Exoplanet Project Framework
###Jaromir Camphuijsen

The exoplanet data is multidimensional, for every planet there are about 50 values. This calls for an interactive visualisation. In my visualisation, these dimensions can all be accessed in a scatterplot. The two axes can be set to any combination of the available dimensions. Also for a single planet selected by the user, all the available information can be made visible. 

![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_1.jpg "Optional title")
The visualization with the nightsky view.

![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_3.jpg "Optional title")
The visualization with the nightsky view.


1. Structure
2. Datasources
3. API's and frameworks
4. Other visualizations



## Structure (html)
There will be a clear separation between the multiplanet (1) and single planet (2) view. The data will be shown in two dimensions so a simple scatterplot or map will suffice. Using div's I can position the different windows on my page. The multiplanet on the left and singleplanet on the right. Both divs contain a svg element where I can draw using D3. 


## Structure (javascript)
To make all of the dimensions easily accessible and let the scatterplots fade into eachother I can use the databinding of D3. As I import the dataset using the D3 csv, the data is pasted as and array of javascript objects. Each "planet object" has a property for each original datavalue. 
For the planet selection I can assign a method to those objects so they will display in the singleplanet view. 
 

##Datasources
[the exoplanet archive from NASA](http://exoplanetarchive.ipac.caltech.edu/)
I will also try to find a skymap in json format to implement in the multiplanet view. This is however for the second stage, when my scatterplot implementation is done. Then I can start working on the skymap. For toggling between the scatterplots and the skymap I can have a look at Thijs Coenen's pulsar visualization which has a similar transition.

## API's and frameworks
I mianly use javascript and its D3 library. Maybe for the processing of the raw observational data I will have to use a separate python program, but that is for the final stage when all other things work according to plan. 

## Other visualizations
I looked at several exoplanet visualizations, for example the exoplanet skymap shown in my first sketch. This is of course a static visualization and I would like to make it interactive by adding transitions to scatterplots and making the data points clickable.
Another visualization for inspiration was [the interactive multiplanetary model](http://nbremer.github.io/exoplanets/) which is beautiful, but it is hard to select and keep track of individual planets because of the movement. However, since it was made with D3 I think I can use a lot from this visualization for my own model.

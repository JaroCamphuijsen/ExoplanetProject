# Exoplanet Project Framework
###Jaromir Camphuijsen

The exoplanet data is multidimensional, for every planet there are about 50 values. This calls for an interactive visualisation. In my visualisation, these dimensions can all be accessed in a scatterplot. The two axes can be set to any combination of the available dimensions. Also for a single planet selected by the user, all the available information can be made visible. 

![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_1.jpg "Optional title")
The visualization with the nightsky view.

![A simple sketch of the visualization](/doc/Sketch_exoplanet_project_3.jpg "Optional title")
The visualization with the nightsky view.


1. Structure (html/javascript)
2. Datasources
3. API's and frameworks
4. Other visualizations
5. Minimum viable product
4. Extensions



## Structure (html)
There will be a clear separation between the multiplanet (1) and single planet (2) view. The data will be shown in two dimensions so a simple scatterplot or map will suffice. Using div's I can position the different windows on my page. The multiplanet on the left and singleplanet on the right. Both divs contain a svg element where I can draw using D3. 


## Structure (javascript)
To make all of the dimensions easily accessible and let the scatterplots fade into eachother I can use the databinding of D3. As I import the dataset using the D3.csv method, the data is pasted as and array of javascript objects. Each "planet object" has a property for each original datavalue. 
For the planet selection I can assign a ".planetDisplay" method to those objects so they will display in the singleplanet view. 
The scatterplot in the multiplanet view will be the main interface. Datapoints can be selected to display them in the extended singleplanet view and the axes of the scatterplot can be changed to any available dimension in the dataset so the user can choose for himself what to display.
Next to that, a story telling component can be added with several preset scatterplots and highlighted planets in the story. 
 

## Datasources
All exoplanet data is from [the exoplanet archive from NASA](http://exoplanetarchive.ipac.caltech.edu/) at this moment. At a later stage when implementing the rawdata display I'll have to extract data from another database. NASA has this data available as well, however this data is much larger (lightcurve for each planet) and will be more difficult to handle.
I will also try to find a skymap in json format to implement in the multiplanet view. This is however for the second stage, when my scatterplot implementation is done. Then I can start working on the skymap. 


## API's and frameworks
I mianly use javascript and its D3 library. Maybe for the processing of the raw observational data I will have to use a separate python program, but that is for the final stage when all other things work according to plan. The website is built in HTML5 with two separate svg elements for the two different data representations. 


## Other visualizations
I looked at several exoplanet visualizations, for example the exoplanet skymap shown in my first sketch. This is of course a static visualization and I would like to make it interactive by adding transitions to scatterplots and making the data points clickable.
Another visualization for inspiration was [the interactive multiplanetary model](http://nbremer.github.io/exoplanets/) which is beautiful, but it is hard to select and keep track of individual planets because of the movement. However, since it was made with D3 I think I can use a lot from this visualization for my own model. For toggling between the scatterplots and the skymap I can have a look at Thijs Coenen's pulsar visualization which has a similar transition. However, 


## Minimum viable product
My main goal will be to build the combination of the two data representations that interact. So the multiplanet view with any possible combination of two dimensions in a scatterplot and the possibility to select a single datapoint and have all (or the most important) of its values displayed. This interface should be easy to use and simple to understand. The transitions between scatter plots are one of the things I would like to have implemented since it is a great visual help in getting a feeling for the data.

## Extensions
In order of implementation:
- A storytelling component. I think that is the most important extension of this visualization.
- A skymap instead of the scatterplot with coordinates
- Moving orbital model instead of the static one
- Extra raw observational data for each single planet like lightcurves. This will be a lot extra work so only possible if the rest is complete.
# Exoplanet Encyclopedia
**by Jaro Camphuijsen**  

## Summary
The goal of the Interactive Exoplanet
Visualization (IEE) is to give users the possibility to view all currently known
exoplanets in a pleasant environment and discover correlations or connections
between their different properties.
It would be nice to have a visualization
which is more attractive to the public. This means less, or better explained
information, all functionality on one screen and an attractive look with smooth
animations. The interface should be intuitive, clear and easy to use.  
  
1. Features  
2. Screenshots   
3. Data  
4. Tasks  
5. Platform  
  
## Features  
The user can choose to display all known exoplanets in any scatterplot with combination of available axes. This enables the user to explore the collection of all discovered exoplanets and look for correlations between different values like planetary mass and time of discovery.
In the sky coordinate system or scatterplot, exoplanets can be selected to give the user detailed information about its values. A model of the planetary system will be displayed and perhaps the original data of discovery or additional measurements.   

## Screenshots  
![Introduction tour](/docs/screenshot1.jpg)
An introduction tour through the visualization with scatterplot showing Keplers third law.  
![Interactivity](/docs/screenshot2.jpg)
All use of interactivity activated.   
![Scalable](/docs/screenshot3.jpg)
The visualization is also usable on portrait oriented devices.   

## Data  
I use [the exoplanet archive from NASA](http://exoplanetarchive.ipac.caltech.edu/) to display all exoplanets in the scatterplot and for additional exoplanet or host star information. For a description of the dimensions of the data one of the documentation pages of the NASA archive had to be scraped.   
  
##Tasks   
The user is introduced to the visualization by a short tour which can be stopped at any moment. 
By clicking one of the datapoints in the multiplanet view the user can select a single planet which will light up. A model of the selected planetary system will be shown and some additional information about the planet.  
This can also be extended later with calculation of the habitable zone of the host star and showing this zone in the model. 
Raw observational data is displayed in the infobar. Any dimension in the infobar can be selected to light up all the planets in the scatterplot with the same value for the corresponding dimension.


##Platform  
The visualization was built in javascript using the [D3 library](http://d3js.org/).
There is an API for accessing the NASA exoplanet database, but it was easier to download a selection of the full database and paste it in the js script using the D3 csv paster.   
The scraper for the documentation page was written in python using the [patter.web library](http://www.clips.ua.ac.be/pages/pattern-web).

##Sources  
The background picture of the surface of mars was taken from the [mavenmission](http://lasp.colorado.edu/home/maven/2014/10/31/maven-status-update-oct-31-2014/).

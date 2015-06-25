#!/usr/bin/env python
# The skeleton of this scraper was copied from the dataprocessing scraping exercise:
# http://data.mprog.nl/homework/week-2-scraping
import csv

from pattern.web import URL, DOM, plaintext, decode_utf8
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://exoplanetarchive.ipac.caltech.edu/docs/API_exoplanet_columns.html"
BACKUP_HTML = 'exoplanetDimensions.html'
OUTPUT_CSV = 'exoplanetDimensions.csv'

def extract_dimensions(dom):
    '''
    Extract a list of all dimensions of the exoplanet database from DOM.

    Each dimension entry should contain the following fields:
    - Database Column Name
    - Table Label
    - Description
    '''

    dimensions=list()
    
    for tr in dom('tr.column'):
        for td in tr('td.name'):
            name = td.content
            name = cleanUpSpaces(name)
            name = cleanUpName(name)
        for td in tr('td.label'):
            label=td.content
        for td in tr('td.description'):
            description = td.content
            description = cleanUpSpaces(description)  
        column=[name,label,description]
        dimensions.append(column)
    return dimensions

# the first part of the data had a dagger sign appended to its name to indicate 
# that it was of a certain importance
def cleanUpName(str):
    if str[-8:] == "&dagger;":
        str = str[:-8]
    return str

# I had some trouble with spaces and "newlines" appended to the name and description
def cleanUpSpaces(str):
    newstr = ""
    for i in range(len(str) - 1):
        if ((str[i] == " ") and (str[i + 1] != " ") and (newstr != "") ) or (str[i] != " "):
            newstr += str[i]
    newstr += str[-1]
    return newstr.strip()
            

def save_csv(f, dimensions):
    '''
    Output a CSV file containing all dimensions.
    '''
    writer = csv.writer(f)
    writer.writerow(['name', 'label', 'description'])
    for d in dimensions:
  
        writer.writerow(d)

    
if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)
    dimensions = extract_dimensions(dom)
        
    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, dimensions)

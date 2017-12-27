//PDFRIPPER README

MODULES:

runmefirst.js - first time setup, creates needed folders in current directory

createscrubdaddy.js - creates scrubdaddy.js from linestodelete.txt

linestodelete.txt - text file to paste any repetitive document lines for removal

scrubdaddy.js - module for PDFRIPPER.js that removes lines before writing to csv

scrubnewlines.js - module for PDFRIPPER that runs after scrubdaddy.js, 
    removes blank lines and replaces \r\n with ,

PDFRIPPER.js - loops over every nested file in specified directory, 
    creates and appends to two unique csv files, PDFRIPPER and datamagnet.
    PDFRIPPER csv - pdf text minus linestodelete
    datamagnet csv - REGEX for phone numbers, emails, and addresses
    After csv write, moves files to designated folders

FOLDERS:

PDFRIPPERDATA is shell folder in which to run everything, program and modules are here
    DOWNLOADING - folder to download batches of unparsed pdfs to move to FILESTODO
    FILESTODO - holds a batch of files to parse
    DONE - once file is parsed and csv data written, file path redirected here
    ERROR - if error in parsing, file path redirected here
    CSVFILES - output csv files written here

    




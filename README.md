node-red-contrib-fastxml
========================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to parse XML strings into JSON and vice-versa. 

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

    npm i node-red-contrib-fastxml

Usage
-----

A function that converts the `msg.payload` to and from XML format.

Uses the fast-xml-parser library.

**NOTE**: it is slightly different from the core XML node in that the default header for tag 
attributes can be left blank which can help flatten some XML docs, but does mean they can't 
be reconstructed 1 for 1 in that case.

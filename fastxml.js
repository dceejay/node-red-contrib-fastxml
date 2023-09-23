
module.exports = function(RED) {
    "use strict";
    const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

    function fastXMLnode(n) {
        RED.nodes.createNode(this,n);
        this.attrkey = n.attr;
        this.charkey = n.chr;
        this.property = n.property||"payload";
        this.outproperty = n.outproperty||n.property||"payload";
        var node = this;
        this.on("input", function(msg) {
            var value = RED.util.getMessageProperty(msg,node.property);
            if (value !== undefined) {
                var options = {};
                if (Buffer.isBuffer(value)) { value = value.toString(); }
                if (typeof value == "string") {
                    options.ignoreAttributes = false;
                    options.attributeNamePrefix = "";
                    if (msg.hasOwnProperty("options") && typeof msg.options === "object") { options = msg.options; }
                    // options.async = true;
                    options.attrNodeName = node.attrkey || options.attrkey || '';
                    options.textNodeName = node.charkey || options.charkey || '_';
                    const parser = new XMLParser(options);
                    value = parser.parse(value);
                    RED.util.setMessageProperty(msg,node.outproperty,value);
                    node.send(msg);
                }
                else if (typeof value === "object") {
                    // options = {renderOpts:{pretty:false}};
                    if (msg.hasOwnProperty("options") && typeof msg.options === "object") { options = msg.options; }
                    options.async = false;
                    const builder = new XMLBuilder(options);
                    value = builder.build(value);
                    RED.util.setMessageProperty(msg,node.outproperty,value);
                    node.send(msg);
                }
                else { node.warn(RED._("xml.errors.xml_js")); }
            }
            else { node.send(msg); } // If no property - just pass it on.
        });
    }
    RED.nodes.registerType("fastxml",fastXMLnode);
}

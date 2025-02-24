document.addEventListener("DOMContentLoaded", function () {
    var inputEditor = CodeMirror.fromTextArea(document.getElementById("xmlInput"), {
        lineNumbers: true,
        theme: "default",
        autoCloseBrackets: true, 
        mode: "xml", 
    });

    var outputEditor = CodeMirror.fromTextArea(document.getElementById("xmlOutput"), {
        mode: "application/json",
        lineNumbers: true,
        theme: "default",
        readOnly: true
    });

    // Function to Validate XML
    window.validateXML = function () {
        let xmlString = inputEditor.getValue();
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlString, "application/xml");
        let errors = xmlDoc.getElementsByTagName("parsererror");

        if (errors.length > 0) {
            alert("Invalid XML: " + errors[0].textContent);
        } else {
            alert("Valid XML!");
        }
    };

    //Clear input text
    window.clearInputText = function () {
        inputEditor.setValue("");
    };

    //Clear output text
    window.clearOutputText = function () {
        outputEditor.setValue("");
    };

   // Download XML function
    window.downloadXML = function () {
    let xml = outputEditor.getValue();
    if (!xml) {
        alert("No XML to download!");
        return;
    }

    let blob = new Blob([xml], { type: "application/xml" });
    let a = document.createElement("a");
    let url = URL.createObjectURL(blob);

    a.href = url;
    a.download = "formatted.xml";
    document.body.appendChild(a); // Append to DOM to ensure proper behavior in some browsers
    a.click();
    document.body.removeChild(a); // Clean up after click
    URL.revokeObjectURL(url); // Free up memory
    };

    //Download JSON
    window.downloadJSON = function () {
    let json = outputEditor.getValue();
    if (!json) {
        alert("No JSON to download!");
        return;
    }
    let blob = new Blob([json], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formatted.json";
    a.click();
    };

    //Download CSV
    window.downloadCSV = function () {
        let csv = outputEditor.getValue();
        if (!csv) {
            alert("No CSV to download!");
            return;
        }
        let blob = new Blob([csv], { type: "text/csv" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "formatted.csv";
        a.click();
        URL.revokeObjectURL(a.href); // Free up memory
    };
    

    //Download YAML
    window.downloadYAML = function () {
        let yaml = outputEditor.getValue();
        if (!yaml) {
            alert("No YAML to download!");
            return;
        }
        let blob = new Blob([yaml], { type: "text/yaml" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "formatted.yaml";
        a.click();
        URL.revokeObjectURL(a.href); // Free up memory
    }; 

    //copy to clipboard
    window.copyToClipboard = function () {
        let xml = outputEditor.getValue(); // Get the output editor's value
    
        if (!xml) {
            alert("Nothing to copy!");
            return;
        }
    
        navigator.clipboard.writeText(xml) // Use Clipboard API
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy:", err);
                alert("Failed to copy!");
            });
    };

    //print xml
    window.printXML = function () {
        let xml = inputEditor.getValue(); // Get the XML content from the editor
    
        if (!xml.trim()) {
            alert("Nothing to print!");
            return;
        }
    
        let printWindow = window.open("", "_blank"); // Open a new print window
        printWindow.document.write("<html><head><title>Print XML</title></head><body>");
        printWindow.document.write("<pre style='font-family: monospace; white-space: pre-wrap; word-wrap: break-word;'>");
        printWindow.document.write(xml.replace(/</g, "&lt;").replace(/>/g, "&gt;")); // Prevents HTML injection
        printWindow.document.write("</pre></body></html>");
        printWindow.document.close();
        printWindow.print(); // Open print dialog
    };

    // Function to Format XML
    window.formatXML = function () {
    try {
        let xmlString = inputEditor.getValue().trim(); // Get XML input and trim spaces
        let indentSize = parseInt(document.getElementById("indentSelect").value, 10);
        console.log("Raw XML Input:", xmlString);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlString, "application/xml");

        // Check for XML Parsing Errors
        let errors = xmlDoc.getElementsByTagName("parsererror");
        if (errors.length > 0) {
            alert("Invalid XML!");
            return;
        }

        let serializer = new XMLSerializer();
        let formattedXml = serializer.serializeToString(xmlDoc);

        // Format XML properly with 3-space indentation
        let formatted = formatXMLWithIndentation(formattedXml, indentSize);
        outputEditor.setValue(formatted); // Set formatted XML to output
    } catch (err) {
        alert("Error formatting XML!");
        console.error(err);
    }
};

// Function to Format XML with Custom Indentation (3 Spaces)
function formatXMLWithIndentation(xml, indentSize) {
    let formatted = "";
    let pad = 0;
    let xmlArray = xml.replace(/>\s*</g, ">\n<").split("\n"); // Add newlines between tags
    let indentStr = " ".repeat(indentSize); // Use 3 spaces for indentation

    xmlArray.forEach((node) => {
        let indent = pad;
        if (node.match(/^<\/\w/)) indent = --pad; // Decrease indent for closing tags
        formatted += indentStr.repeat(indent) + node + "\n"; // Apply 3-space indentation
        if (node.match(/^<\w[^>]*[^/]>$/)) pad++; // Increase indent for opening tags
    });

    return formatted.trim();
}
    //Minify XML
    window.minifyXML = function () {
        try {
            let xmlString = inputEditor.getValue(); // Get input from editor
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, "application/xml");
    
            if (xmlDoc.getElementsByTagName("parsererror").length) {
                alert("Invalid XML!");
                return;
            }
    
            let serializer = new XMLSerializer();
            let minifiedXml = serializer.serializeToString(xmlDoc)
                .replace(/\s{2,}/g, " ") // Remove extra spaces
                .replace(/>\s+</g, "><") // Remove spaces between tags
                .trim();
    
            outputEditor.setValue(minifiedXml); // Set minified XML to output
        } catch (err) {
            alert("Invalid XML!");
        }
    };

    // Convert XML to JSON
    window.convertXMLToJSON = function () {
        try {
            let xmlText = inputEditor.getValue();
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, "application/xml");

            if (xmlDoc.getElementsByTagName("parsererror").length) {
                alert("Invalid XML!");
                return;
            }

            let json = xmlToJson(xmlDoc.documentElement);
            let cleanedJson = cleanJson(json); // Clean unnecessary nodes

            outputEditor.setValue(JSON.stringify(cleanedJson, null, 4));
        } catch (err) {
            alert("Error converting XML to JSON!");
        }
    };

    // Function to Convert XML to JSON
    function xmlToJson(node) {
        let obj = {};
        if (node.nodeType === 1) { // Element node
            if (node.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let i = 0; i < node.attributes.length; i++) {
                    let attr = node.attributes.item(i);
                    obj["@attributes"][attr.nodeName] = attr.nodeValue;
                }
            }
        } else if (node.nodeType === 3) { // Text node
            return node.nodeValue.trim();
        }

        if (node.hasChildNodes()) {
            let textNodes = Array.from(node.childNodes).filter(n => n.nodeType === 3);
            if (textNodes.length === node.childNodes.length) {
                obj = textNodes[0].nodeValue.trim();
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    let child = node.childNodes[i];
                    let nodeName = child.nodeName;
                    let childObj = xmlToJson(child);
                    if (!obj[nodeName]) {
                        obj[nodeName] = childObj;
                    } else {
                        if (!Array.isArray(obj[nodeName])) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(childObj);
                    }
                }
            }
        }
        return obj;
    }

    // Function to clean JSON by removing unnecessary #text nodes
    function cleanJson(obj) {
    if (typeof obj !== "object" || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(cleanJson);

    let newObj = {};
    for (let key in obj) {
        if (key === "#text") continue; // Remove #text keys
        newObj[key] = cleanJson(obj[key]);
    }
    return newObj;
    }

    // Function to Convert XML to CSV
    // Convert XML to CSV
window.convertXMLToCSV = function () {
    try {
        let xmlText = inputEditor.getValue();
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlText, "application/xml");

        if (xmlDoc.getElementsByTagName("parsererror").length) {
            alert("Invalid XML!");
            return;
        }

        let json = xmlToJson(xmlDoc.documentElement); // Convert XML to JSON
        let cleanedJson = cleanJson(json); // Clean unnecessary nodes
        let csv = jsonToCsv(cleanedJson); // Convert JSON to CSV

        outputEditor.setValue(csv);
    } catch (err) {
        alert("Error converting XML to CSV!");
    }
};

// Function to Convert JSON to CSV
function jsonToCsv(obj) {
    let headers = new Set();
    let rows = [];

    function processObject(obj, parentKey = "", row = {}) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newKey = parentKey ? `${parentKey}.${key}` : key;

                if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                    processObject(obj[key], newKey, row);
                } else if (Array.isArray(obj[key])) {
                    obj[key].forEach((item, index) => {
                        processObject(item, `${newKey}[${index}]`, row);
                    });
                } else {
                    headers.add(newKey);
                    row[newKey] = obj[key];
                }
            }
        }
        return row;
    }

    let row = processObject(obj);
    if (Object.keys(row).length > 0) rows.push(row); // Ensure only one row is added

    let csvHeaders = Array.from(headers);
    let csvRows = rows.map(row => 
        csvHeaders.map(header => JSON.stringify(row[header] || "")).join(",")
    );

    return [csvHeaders.join(","), ...csvRows].join("\n");
}

    

    // Load Sample XML
    window.loadSampleXML = function () {
        let sampleXML = `
        <person>
            <name>John Doe</name>
            <age>30</age>
            <email>john.doe@example.com</email>
            <address>
                <street>123 Main St</street>
                <city>Anytown</city>
                <state>CA</state>
                <zip>12345</zip>
            </address>
            <phoneNumbers>
                <phone>
                    <type>home</type>
                    <number>555-555-5555</number>
                </phone>
                <phone>
                    <type>work</type>
                    <number>555-555-5556</number>
                </phone>
            </phoneNumbers>
        </person>`;

        inputEditor.setValue(sampleXML);
    };
});



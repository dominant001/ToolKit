document.addEventListener("DOMContentLoaded", function () {
    var inputEditor = CodeMirror.fromTextArea(document.getElementById("xmlInput"), {
        mode: "application/xml",
        lineNumbers: true,
        theme: "default",
        autoCloseBrackets: true
    });

    var outputEditor = CodeMirror.fromTextArea(document.getElementById("jsonOutput"), {
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


    window.clearInputText = function () {
        inputEditor.setValue("");
    };

    window.clearOutputText = function () {
        outputEditor.setValue("");
    };

    //downlaod xml
    window.downloadXML = function () {
        let json = outputEditor.getValue();
        if (!json) {
            alert("No XML to download!");
            return;
        }
        let blob = new Blob([json], { type: "application/xml" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "formatted.xml";
        a.click();
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
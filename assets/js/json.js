document.addEventListener("DOMContentLoaded", function () {
    var inputEditor = CodeMirror.fromTextArea(document.getElementById("jsonInput"), {
        mode: "application/json",
        lineNumbers: true,
        theme: "default",
        autoCloseBrackets: true,
    });

    var outputEditor = CodeMirror.fromTextArea(document.getElementById("jsonOutput"), {
        mode: "application/json",
        lineNumbers: true,
        theme: "default",
        readOnly: true
    });
    

    window.formatJSON = function () {
        try {
            let json = JSON.parse(inputEditor.getValue());
            let indentSize = parseInt(document.getElementById("indentSelect").value, 10);
            outputEditor.setValue(JSON.stringify(json, null, indentSize));
        } catch (err) {
            alert("Invalid JSON!");
        }
    };

    window.minifyJSON = function () {
        try {
            let json = JSON.parse(inputEditor.getValue());
            outputEditor.setValue(JSON.stringify(json));
        } catch (err) {
            alert("Invalid JSON!");
        }
    };

    window.validateJSON = function () {
        try {
            JSON.parse(inputEditor.getValue());
            alert("Valid JSON!");
        } catch (err) {
            alert("Invalid JSON!");
        }
    };

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

    window.clearInputText = function () {
        inputEditor.setValue("");
    };

    window.clearOutputText = function () {
        outputEditor.setValue("");
    };

    window.copyToClipboard = function () {
        let json = outputEditor.getValue(); // Get the output editor's value
    
        if (!json) {
            alert("Nothing to copy!");
            return;
        }
    
        navigator.clipboard.writeText(json) // Use Clipboard API
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy:", err);
                alert("Failed to copy!");
            });
    };

    window.printJSON = function () {
        let json = outputEditor.getValue(); // Get the JSON output
    
        if (!json) {
            alert("Nothing to print!");
            return;
        }
    
        let printWindow = window.open("", "_blank"); // Open a new print window
        printWindow.document.write("<html><head><title>Print JSON</title></head><body>");
        printWindow.document.write("<pre style='font-family: monospace; white-space: pre-wrap; word-wrap: break-word;'>");
        printWindow.document.write(json.replace(/</g, "&lt;").replace(/>/g, "&gt;")); // Prevents HTML injection
        printWindow.document.write("</pre></body></html>");
        printWindow.document.close();
        printWindow.print(); // Open print dialog
    };

    // Function to convert JSON to XML with configurable indentation
    window.convertJSONToXML = function (indentSize = 5) {
        try {
            let json = JSON.parse(inputEditor.getValue());
            let indent = " ".repeat(indentSize);
            let xml = jsonToXml(json, "", indent);
            outputEditor.setValue(xml);
        } catch (err) {
            alert("Invalid JSON!");
        }
    };

    function jsonToXml(obj, indent = "", indentUnit = "  ") {
        let xml = "";
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                if (typeof value === "object" && !Array.isArray(value)) {
                    xml += `${indent}<${key}>\n${jsonToXml(value, indent + indentUnit, indentUnit)}${indent}</${key}>\n`;
                } else if (Array.isArray(value)) {
                    value.forEach(item => {
                        xml += `${indent}<${key}>\n${jsonToXml(item, indent + indentUnit, indentUnit)}${indent}</${key}>\n`;
                    });
                } else {
                    xml += `${indent}<${key}>${value}</${key}>\n`;
                }
            }
        }
        return xml;
    }


    // Function to Convert JSON to CSV

   window.convertJSONToCSV = function () {
    try {
        let json = JSON.parse(inputEditor.getValue());
        let csv = jsonToCsv(json);
        outputEditor.setValue(csv);
    } catch (err) {
        alert("Invalid JSON!");
    }
};

function jsonToCsv(obj) {
    const headers = [];
    const rows = [];

    function processObject(obj, parentKey = '') {
        const row = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = parentKey ? `${parentKey}.${key}` : key;
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    processObject(obj[key], newKey);
                } else if (Array.isArray(obj[key])) {
                    obj[key].forEach((item, index) => {
                        processObject(item, `${newKey}.${index}`);
                    });
                } else {
                    if (!headers.includes(newKey)) {
                        headers.push(newKey);
                    }
                    row[newKey] = obj[key];
                }
            }
        }
        rows.push(row);
    }

    processObject(obj);

    const csvRows = rows.map(row => 
        headers.map(header => JSON.stringify(row[header] || '')).join(',')
    );

    return [headers.join(','), ...csvRows].join('\n');
}

// ...existing code...

window.convertJSONToYAML = function () {
    try {
        let json = JSON.parse(inputEditor.getValue());
        let yaml = jsyaml.dump(json);
        outputEditor.setValue(yaml);
    } catch (err) {
        alert("Invalid JSON!");
    }
};

// ...existing code...

window.loadSampleJSON = function() {
    console.log("Function called!"); 
    let sampleJSON = `{
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com",
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "CA",
            "zip": "12345"
        },
        "phoneNumbers": [
            {
                "type": "home",
                "number": "555-555-5555"
            },
            {
                "type": "work",
                "number": "555-555-5556"
            }
        ]
    }`;

    if (inputEditor) {
        inputEditor.setValue(sampleJSON); // Use CodeMirror API
        console.log("JSON added to CodeMirror!");
    } else {
        console.error("CodeMirror instance not initialized yet.");
    }
}
});
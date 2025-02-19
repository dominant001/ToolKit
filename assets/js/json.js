document.addEventListener("DOMContentLoaded", function () {
    var inputEditor = CodeMirror.fromTextArea(document.getElementById("jsonInput"), {
        mode: "application/json",
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

    window.formatJSON = function () {
        try {
            let json = JSON.parse(inputEditor.getValue());
            outputEditor.setValue(JSON.stringify(json, null, 4));
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

   // Function to convert JSON to CSV
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
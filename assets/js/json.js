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
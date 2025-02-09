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
});
window.encodeBase64 = function () {
    let text = document.getElementById("textInput").value;
    if (!text) {
        alert("Please enter text to encode!");
        return;
    }
    let encodedText = btoa(text);
    document.getElementById("textOutput").value = encodedText;
};

window.decodeBase64 = function () {
    let text = document.getElementById("textInput").value;
    if (!text) {
        alert("Please enter Base64 text to decode!");
        return;
    }
    try {
        let decodedText = atob(text);
        document.getElementById("textOutput").value = decodedText;
    } catch (e) {
        alert("Invalid Base64 input!");
    }
};

window.clearText = function () {
    document.getElementById("textInput").value = "";
    document.getElementById("textOutput").value = "";
};

window.copyToClipboard = function () {
    let output = document.getElementById("textOutput");
    if (!output.value) {
        alert("Nothing to copy!");
        return;
    }
    output.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
};
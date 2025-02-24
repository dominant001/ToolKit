// // Function to update comparison
// function compareFiles() {
//     let text1 = inputEditor.getValue();
//     let text2 = outputEditor.getValue();

//     if (!text1 || !text2) {
//         alert("Please enter text in both input areas to compare.");
//         return;
//     }

//     // Show comparison editor
//     document.getElementById("compareEditor").style.display = "block";
//     document.getElementById("comparisonTitle").style.display = "block";

//     // Initialize CodeMirror Merge View
//     var mergeEditor = CodeMirror.MergeView(document.getElementById("compareEditor"), {
//         value: text1,
//         origLeft: null,
//         orig: text2,
//         lineNumbers: true,
//         mode: "text/plain",
//         highlightDifferences: true,
//         theme: "default",
//     });
// }

// // Make it globally accessible
// window.compareFiles = compareFiles;




// function compareFiles() {
//     let text1 = inputEditor.getValue();
//     let text2 = outputEditor.getValue();

//     if (!text1 || !text2) {
//         alert("Please enter text in both input areas to compare.");
//         return;
//     }

//     // Initialize diff_match_patch
//     var dmp = new diff_match_patch();
    
//     // Get the diff
//     var diff = dmp.diff_main(text1, text2);
    
//     // Ensure it's an array before processing
//     if (!Array.isArray(diff)) {
//         console.error("diff_main did not return an array:", diff);
//         return;
//     }

//     // Cleanup the diff result for better readability
//     dmp.diff_cleanupSemantic(diff);

//     let highlightedInput = "";
//     let highlightedOutput = "";

//     diff.forEach(function (part) {
//         var operation = part[0]; // -1 = Removed, 0 = Unchanged, 1 = Added
//         var data = part[1];

//         if (operation === 1) { // Added
//             highlightedOutput += `<span class="added">${data}</span>`;
//         } else if (operation === -1) { // Removed
//             highlightedInput += `<span class="removed">${data}</span>`;
//         } else { // Unchanged
//             highlightedInput += data;
//             highlightedOutput += data;
//         }
//     });

//     // Apply the highlighted text to CodeMirror editors
//     inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedInput;
//     outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedOutput;
// }

// // Make function globally accessible
// window.compareFiles = compareFiles;




// function compareFiles() {
//     let text1 = inputEditor.getValue().trim();
//     let text2 = outputEditor.getValue().trim();

//     if (!text1 || !text2) {
//         alert("Please enter text in both input areas to compare.");
//         return;
//     }

//     let selectedLanguage = document.getElementById("languageSelector").value;

//     // Preserve JSON formatting
//     if (selectedLanguage === "json") {
//         try {
//             text1 = JSON.stringify(JSON.parse(text1), null, 4);
//             text2 = JSON.stringify(JSON.parse(text2), null, 4);
//         } catch (e) {
//             console.warn("Invalid JSON. Comparing as plain text.");
//         }
//     }

//     // Check if diff_match_patch is loaded
//     if (typeof diff_match_patch === "undefined") {
//         console.error("diff_match_patch library is missing.");
//         return;
//     }

//     // Initialize diff_match_patch
//     var dmp = new diff_match_patch();
//     var diff = dmp.diff_main(text1, text2);

//     // Verify if diff is an array before using forEach
//     if (!Array.isArray(diff)) {
//         console.error("diff_main did not return an array:", diff);
//         return;
//     }

//     let highlightedInput = "";
//     let highlightedOutput = "";

//     diff.forEach(([operation, data]) => {
//         if (operation === 1) { // Added
//             highlightedOutput += `<span class="added">${escapeHtml(data)}</span>`;
//         } else if (operation === -1) { // Removed
//             highlightedInput += `<span class="removed">${escapeHtml(data)}</span>`;
//         } else { // Unchanged
//             highlightedInput += escapeHtml(data);
//             highlightedOutput += escapeHtml(data);
//         }
//     });

//     // Apply the highlighted text to CodeMirror editors
//     inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedInput;
//     outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedOutput;
// }

// // Function to escape HTML
// function escapeHtml(text) {
//     return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

// // Expose function globally
// window.compareFiles = compareFiles;



function compareFiles() {
    let text1 = inputEditor.getValue().trim();
    let text2 = outputEditor.getValue().trim();

    if (!text1 || !text2) {
        alert("Please enter text in both input areas to compare.");
        return;
    }

    let selectedLanguage = document.getElementById("languageSelector").value;

    // Preserve JSON formatting
    if (selectedLanguage === "json") {
        try {
            text1 = JSON.stringify(JSON.parse(text1), null, 4);
            text2 = JSON.stringify(JSON.parse(text2), null, 4);
        } catch (e) {
            console.warn("Invalid JSON. Comparing as plain text.");
        }
    }

    // Check if diff_match_patch is loaded
    if (typeof diff_match_patch === "undefined") {
        console.error("diff_match_patch library is missing.");
        return;
    }

    // Initialize diff_match_patch
    var dmp = new diff_match_patch();
    var diff = dmp.diff_main(text1, text2);

    // Verify if diff is an array before using forEach
    if (!Array.isArray(diff)) {
        console.error("diff_main did not return an array:", diff);
        return;
    }

    let highlightedInput = "";
    let highlightedOutput = "";

    // Use a function to iterate over the differences
    diff.forEach(function (part) {
        var operation = part[0]; // -1 = Removed, 0 = Unchanged, 1 = Added
        var data = part[1];

        if (operation === 1) { // Added
            highlightedOutput += `<span class="added">${escapeHtml(data)}</span>`;
        } else if (operation === -1) { // Removed
            highlightedInput += `<span class="removed">${escapeHtml(data)}</span>`;
        } else { // Unchanged
            highlightedInput += escapeHtml(data);
            highlightedOutput += escapeHtml(data);
        }
    });

    // // Apply the highlighted text to CodeMirror editors
     inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedInput;
     outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedOutput;

    // inputEditor.setValue(highlightedInput);
    // outputEditor.setValue(highlightedOutput);
    
}

// Function to escape HTML
function escapeHtml(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Expose function globally
window.compareFiles = compareFiles;



document.addEventListener("DOMContentLoaded", function () {
    // Define available language modes
    var languageModes = {
        json: "application/json",
        xml: "application/xml",
        text: "text/plain",
        java: "text/x-java",
        python: "text/x-python"
    };

    // Initialize CodeMirror editors
    inputEditor = CodeMirror.fromTextArea(document.getElementById("compareText1"), {
        mode: languageModes.json,
        lineNumbers: true,
        theme: "default",
        autoCloseBrackets: true,
    });

    outputEditor = CodeMirror.fromTextArea(document.getElementById("compareText2"), {
        mode: languageModes.json,
        lineNumbers: true,
        theme: "default",
        autoCloseBrackets: true,
    });

    // Function to change language dynamically
    window.changeLanguageMode = function () {
        let selectedLanguage = document.getElementById("languageSelector").value;

        inputEditor.setOption("mode", languageModes[selectedLanguage]);
        outputEditor.setOption("mode", languageModes[selectedLanguage]);
    };

    // Function to clear input text
    window.clearInputText = function () {
        inputEditor.setValue("");
    };

    // Function to clear output text
    window.clearOutputText = function () {
        outputEditor.setValue("");
    };
});
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

//     // Use a function to iterate over the differences
//     diff.forEach(function (part) {
//         var operation = part[0]; // -1 = Removed, 0 = Unchanged, 1 = Added
//         var data = part[1];

//         if (operation === 1) { // Added
//             highlightedOutput += `<span class="added">${escapeHtml(data)}</span>`;
//         } else if (operation === -1) { // Removed
//             highlightedInput += `<span class="removed">${escapeHtml(data)}</span>`;
//         } else { // Unchanged
//             highlightedInput += escapeHtml(data);
//             highlightedOutput += escapeHtml(data);
//         }
//     });

//     // // Apply the highlighted text to CodeMirror editors
//      inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedInput;
//      outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedOutput;

//     // inputEditor.setValue(highlightedInput);
//     // outputEditor.setValue(highlightedOutput);

// }

// // Function to escape HTML
// function escapeHtml(text) {
//     return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

// // Expose function globally
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

//     // Split texts into words and process diffs at word level
//     const delimiter = '\x01'; // Non-printable delimiter
//     const words1 = text1.split(/\s+/).filter(word => word !== '');
//     const words2 = text2.split(/\s+/).filter(word => word !== '');
//     const str1 = words1.join(delimiter);
//     const str2 = words2.join(delimiter);

//     var dmp = new diff_match_patch();
//     var diff = dmp.diff_main(str1, str2);
//     dmp.diff_cleanupSemantic(diff);

//     let highlightedInput = "";
//     let highlightedOutput = "";
//     let needsSpaceInput = false;
//     let needsSpaceOutput = false;

//     diff.forEach((part) => {
//         const operation = part[0];
//         const data = part[1];
//         const words = data.split(delimiter).filter(word => word !== '');

//         words.forEach((word) => {
//             const escapedWord = escapeHtml(word);

//             // Handle input (left side: removed or unchanged)
//             if (operation === -1 || operation === 0) {
//                 if (needsSpaceInput) highlightedInput += ' ';
//                 needsSpaceInput = true;
//             }

//             // Handle output (right side: added or unchanged)
//             if (operation === 1 || operation === 0) {
//                 if (needsSpaceOutput) highlightedOutput += ' ';
//                 needsSpaceOutput = true;
//             }

//             if (operation === 1) { // Added
//                 highlightedOutput += `<span class="added">${escapedWord}</span>`;
//             } else if (operation === -1) { // Removed
//                 highlightedInput += `<span class="removed">${escapedWord}</span>`;
//             } else { // Unchanged
//                 highlightedInput += escapedWord;
//                 highlightedOutput += escapedWord;
//             }
//         });
//     });

//     // Trim leading/trailing spaces
//     highlightedInput = highlightedInput.trim();
//     highlightedOutput = highlightedOutput.trim();

//     // Update editors with highlighted HTML
//     inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedInput;
//     outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML = highlightedOutput;
// }

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set selected comparison type
document.addEventListener("DOMContentLoaded", function () {
    const type = getQueryParam('type');

    if (type) {
        const comparisonDropdown = document.getElementById('languageSelector'); // Assume you have a dropdown for selecting type
        if (comparisonDropdown) {
            comparisonDropdown.value = type;
        }

        // Or if you're highlighting tabs or sections instead of a dropdown
        const selectedTab = document.querySelector(`.tab[data-type="${type}"]`);
        if (selectedTab) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            selectedTab.classList.add('active');
        }
    }
});

function compareFiles() {
    const text1 = inputEditor.getValue().trim();
    const text2 = outputEditor.getValue().trim();

    if (!text1 || !text2) {
        alert("Please enter text in both input areas to compare.");
        return;
    }

    // Improved JSON-aware tokenization
    const tokenize = (text) => {
        return text.split(/({|}|\[|\]|,|:|"(?:\\"|[^"])*"|\s+)/g)
            .filter(token => token && !/^\s*$/.test(token))
            .map(token => token.trim());
    };

    const tokens1 = tokenize(text1);
    const tokens2 = tokenize(text2);

    // Convert tokens to line-based format for proper diffing
    const createLineBasedText = (tokens) =>
        tokens.map(t => t.replace(/\n/g, '↵')).join('\n');

    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(
        createLineBasedText(tokens1),
        createLineBasedText(tokens2)
    );
    console.log("diff : " + diff);

    dmp.diff_cleanupSemantic(diff);

    let highlightedInput = [];
    let highlightedOutput = [];
    let pointer1 = 0;
    let pointer2 = 0;

    diff.forEach(part => {
        const operation = part[0];
        const text = part[1];
        console.log("text : " + text);
        const lines = text.split('\n').filter(l => l !== '');
        console.log("lines : " + lines);

        lines.forEach(line => {
            console.log("line : " + line);
            const token = line.replace(/↵/g, '\n');

            if (operation === -1) { // Removed
                highlightedInput.push(`<span class="removed">${escapeHtml(token)}</span>`);
                pointer1++;
            } else if (operation === 1) { // Added
                highlightedOutput.push(`<span class="added">${escapeHtml(token)}</span>`);
                pointer2++;
            } else { // Unchanged
                highlightedInput.push(escapeHtml(token));
                highlightedOutput.push(escapeHtml(token));
                pointer1++;
                pointer2++;
            }
        });
    });

    // Reconstruct original formatting with proper spacing
    const reconstruct = (arr) => {
        return arr.join(' ')
            .replace(/\s([{}[\],:])/g, '$1')
            .replace(/([{}[\],:])\s/g, '$1');
    };

    inputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML =
        reconstruct(highlightedInput);

    outputEditor.getWrapperElement().querySelector(".CodeMirror-code").innerHTML =
        reconstruct(highlightedOutput);
}

// Proper HTML escaping
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}







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
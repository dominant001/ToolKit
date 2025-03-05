function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set selected Base64 tab
document.addEventListener("DOMContentLoaded", function () {
    const type = getQueryParam('type');

    if (type) {
        // Example 2: If using tabs
        console.log(type);
        if (type === 'encode' || type === 'decode') {
            showTab(type);
        }
        else if (type === 'imageEncode' || type === 'imageDecode') {
            showImageTab(type);
        }
        else {
            showTab('encode');
        }
        // const selectedTab = document.querySelector(`.tab[data-type="${type}"]`);
        // if (selectedTab) {
        //     console.log(selectedTab);
        //     console.log(selectedTab.dataType);
        //     //showTab(selectedTab)
        //     document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        //     selectedTab.classList.add('active');
        // }
    }
});


function showTab(tab) {
    const outputHeading = document.getElementById('outputHeading');
    clearText();
    if (tab === 'encode') {
        document.getElementById('encodeTab').classList.add('active');
        document.getElementById('decodeTab').classList.remove('active');
        document.getElementById('encodeSection').classList.remove('hidden');
        document.getElementById('decodeSection').classList.add('hidden');
        outputHeading.textContent = 'Encoded Output';
    } else {
        document.getElementById('decodeTab').classList.add('active');
        document.getElementById('encodeTab').classList.remove('active');
        document.getElementById('decodeSection').classList.remove('hidden');
        document.getElementById('encodeSection').classList.add('hidden');
        outputHeading.textContent = 'Decoded Output';
    }
}

function showImageTab(tab) {
    if (tab === 'imageEncode') {
        document.getElementById('encodeTab').classList.add('active');
        document.getElementById('decodeTab').classList.remove('active');
        document.getElementById('encodeSection').classList.remove('hidden');
        document.getElementById('decodeSection').classList.add('hidden');
    } else {
        document.getElementById('decodeTab').classList.add('active');
        document.getElementById('encodeTab').classList.remove('active');
        document.getElementById('decodeSection').classList.remove('hidden');
        document.getElementById('encodeSection').classList.add('hidden');
    }
}

// Encoding Image Logic
function encodeImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        document.getElementById('encodedOutput').value = event.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file to encode.');
    }
}

// Clear Encoder Output
function clearEncodeText() {
    document.getElementById('encodedOutput').value = '';
}

// Copy Encoder Output to Clipboard
function copyImageContentToClipboard() {
    const output = document.getElementById('encodedOutput');
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
}

// Decoding Image Logic
function decodeImage() {
    const base64String = document.getElementById('base64Input').value.trim();
    const decodedImage = document.getElementById('decodedImage');

    if (base64String) {
        decodedImage.src = base64String;
        decodedImage.classList.remove('hidden');
    } else {
        alert('Please paste a valid Base64 string to decode.');
        decodedImage.classList.add('hidden');
    }
}

// Clear Decoder Output
function clearDecode() {
    document.getElementById('base64Input').value = '';
    const decodedImage = document.getElementById('decodedImage');
    decodedImage.src = '';
    decodedImage.classList.add('hidden');
}

function downloadDecodedImage() {
    const decodedImage = document.getElementById('decodedImage');  // Assuming this is the <img> tag where you show the decoded image.
    if (!decodedImage || !decodedImage.src) {
        alert('No image available to download.');
        return;
    }

    const link = document.createElement('a');
    link.href = decodedImage.src;
    link.download = 'decoded-image.png';  // You can change the file name or extension if needed.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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


// // URL Decoder
// function decodeURL() {
//     let text = document.getElementById("textInput").value;
//     let decodedUrl = decodeURIComponent(text);
//     document.getElementById("textOutput").value = decodedUrl;
// }

// // URL Encoder
// function encodeURL() {
//     let text = document.getElementById("textInput").value;
//     let encodedUrl = encodeURIComponent(text);
//     document.getElementById("textOutput").value = encodedUrl;
// }

// //HTML Encoder
// function encodeHTML() {
//     let text = document.getElementById("textInput").value;
//     let encodedHtml = escape(text);
//     document.getElementById("textOutput").value = encodedHtml;
// }

// //HTML Decoder
// function decodeHTML() {
//     let text = document.getElementById("textInput").value;
//     let decodedHtml = unescape(text);
//     document.getElementById("textOutput").value = decodedHtml;
// }

// //MD5 Hash Generator
// function generateMD5() {
//     let text = document.getElementById("textInput").value;
//     let md5Hash = CryptoJS.MD5(text).toString()
//     document.getElementById("textOutput").value = md5Hash;
// }

// //SHA256 Hash Generator
// function generateSHA256() {
//     let text = document.getElementById("textInput").value;
//     let sha256Hash = CryptoJS.SHA256(text).toString();
//     document.getElementById("textOutput").value = sha256Hash;
// }

// //UUID Generator
// function generateUUID() {
//     let uuid = uuidv4();
//     document.getElementById("textOutput").value = uuid;
// }

// function uuidv4() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         const r = Math.random() * 16 | 0;
//         const v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

// // function updateCurrentEpoch() {
// //     document.getElementById('currentEpoch').textContent = Math.floor(Date.now() / 1000);
// // }
// // setInterval(updateCurrentEpoch, 1000);
// // updateCurrentEpoch();

// // Convert epoch to human-readable
// function convertToHuman() {
//     const epoch = parseInt(document.getElementById('epochInput').value);
//     if (isNaN(epoch)) {
//         document.getElementById('humanResult').innerText = "Invalid epoch.";
//         return;
//     }
//     const date = new Date(epoch * 1000);

//     const utc = date.toUTCString();
//     const local = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//     const iso = date.toISOString();

//     document.getElementById('humanResult').innerHTML = `
//         <strong>Assuming this timestamp is in seconds:</strong><br><br>
//         <strong>GMT (UTC):</strong><br>${utc}<br><br>
//         <strong>Your timezone:</strong><br>${local} (India Standard Time)<br><br>
//         <strong>ISO 8601 format:</strong><br>${iso}
//     `;
// }

// // Convert human-readable to epoch
// function convertToEpoch() {
//     const humanTime = document.getElementById('humanInput').value;

//     if (!humanTime) {
//         document.getElementById('epochResult').innerText = "Please select a valid date and time.";
//         return;
//     }

//     const date = new Date(humanTime);
//     const epoch = Math.floor(date.getTime() / 1000);

//     document.getElementById('epochResult').innerHTML = `
//         <strong>Epoch timestamp (seconds)</strong><br>${epoch}<br><br>
//         <strong>Timestamp in milliseconds</strong><br>${epoch * 1000}
//     `;
// }

// //Random Password Generator
// function generatePassword() {
//     const length = parseInt(document.getElementById('length').value);
//     const includeLowercase = document.getElementById('lowercase').checked;
//     const includeUppercase = document.getElementById('uppercase').checked;
//     const includeNumbers = document.getElementById('numbers').checked;
//     const includeSymbols = document.getElementById('symbols').checked;

//     console.log(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

//     const lowercase = 'abcdefghijklmnopqrstuvwxyz';
//     const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const numbers = '0123456789';
//     const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

//     let charset = '';
//     if (includeLowercase) charset += lowercase;
//     if (includeUppercase) charset += uppercase;
//     if (includeNumbers) charset += numbers;
//     if (includeSymbols) charset += symbols;

//     if (charset.length === 0) {
//         alert('Please select at least one character set!');
//         return;
//     }

//     let password = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         password += charset[randomIndex];
//     }

//     document.getElementById('passwordOutput').value = password;
//     document.getElementById('md5Output').value = CryptoJS.MD5(password).toString();
//     document.getElementById('sha256Output').value = CryptoJS.SHA256(password).toString();
// }

// //Word Counter
// function updateWordCount() {
//     const text = document.getElementById('textInput').value;

//     const words = text.match(/\b\S+\b/g) || [];
//     const sentences = text.split(/[.!?]+/).filter(Boolean);
//     const paragraphs = text.split(/\n+/).filter(Boolean);

//     const charWithSpaces = text.length;
//     const charWithoutSpaces = text.replace(/\s/g, '').length;

//     document.getElementById('wordCount').value = words.length;
//     document.getElementById('wordCountNoTags').value = words.length;  // No tags handling, useful if you're allowing HTML input.
//     document.getElementById('charCountWithSpaces').value = charWithSpaces;
//     document.getElementById('charCountNoSpaces').value = charWithoutSpaces;
//     document.getElementById('sentenceCount').value = sentences.length;
//     document.getElementById('paragraphCount').value = paragraphs.length;
//     document.getElementById('readingTime').value = Math.ceil(words.length / 200) + ' min';
//     document.getElementById('speechTime').value = Math.ceil(words.length / 150) + ' min';
// }

// //icu message editor

// let placeholderValues = {};

// function detectPlaceholders() {
//     const icuText = document.getElementById('icuText').value;
//     const placeholderRegex = /{(\w+)}/g;

//     const placeholders = new Set();
//     let match;
//     while ((match = placeholderRegex.exec(icuText)) !== null) {
//         placeholders.add(match[1]);
//     }

//     renderPlaceholderInputs([...placeholders]);
//     updateFormattedText();
// }

// function renderPlaceholderInputs(placeholders) {
//     const container = document.getElementById('dynamicInputs');
//     container.innerHTML = '';  // Clear previous inputs

//     placeholders.forEach(placeholder => {
//         const inputWrapper = document.createElement('div');
//         inputWrapper.classList.add('dynamic-input');

//         const label = document.createElement('label');
//         label.innerText = placeholder;

//         const input = document.createElement('input');
//         input.type = 'text';
//         input.placeholder = `Enter value for ${placeholder}`;
//         input.value = placeholderValues[placeholder] || '';  // Preserve value if it exists
//         input.oninput = () => {
//             placeholderValues[placeholder] = input.value;
//             updateFormattedText();
//         };

//         inputWrapper.appendChild(label);
//         inputWrapper.appendChild(input);
//         container.appendChild(inputWrapper);
//     });
// }

// function updateFormattedText() {
//     let icuText = document.getElementById('icuText').value;

//     for (const [placeholder, value] of Object.entries(placeholderValues)) {
//         const regex = new RegExp(`{${placeholder}}`, 'g');
//         icuText = icuText.replace(regex, value);
//     }

//     document.getElementById('formattedText').value = icuText;
// }

// // Initial trigger
// detectPlaceholders();
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
        if (type === 'encode' || type === 'decode' || type === 'shorten' || type === 'expand') {
            showTab(type);
        }
        else if (type === 'imageEncode' || type === 'imageDecode') {
            showImageTab(type);
        }
        else {
            showTab('encode');
        }
    }
});


function showTab(tab) {
    const outputHeading = document.getElementById('outputHeading');
    clearText();
    if (tab === 'encode' || tab === 'shorten') {
        document.getElementById('encodeTab').classList.add('active');
        document.getElementById('decodeTab').classList.remove('active');
        document.getElementById('encodeSection').classList.remove('hidden');
        document.getElementById('decodeSection').classList.add('hidden');
        if (tab === 'shorten') {
            outputHeading.textContent = 'Shortened URL';
        } else {
            outputHeading.textContent = 'Encoded Output';
        }
    } else {
        document.getElementById('decodeTab').classList.add('active');
        document.getElementById('encodeTab').classList.remove('active');
        document.getElementById('decodeSection').classList.remove('hidden');
        document.getElementById('encodeSection').classList.add('hidden');
        if (tab === 'expand') {
            outputHeading.textContent = 'Expanded URL';
        }
        else {
            outputHeading.textContent = 'Decoded Output';
        }
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

// Clear Decoder Output
function clearDecode() {
    document.getElementById('base64Input').value = '';
    const decodedImage = document.getElementById('decodedImage');
    decodedImage.src = '';
    decodedImage.classList.add('hidden');
}

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


// URL Decoder
function decodeURL() {
    let text = document.getElementById("textInput").value;
    let decodedUrl = decodeURIComponent(text);
    document.getElementById("textOutput").value = decodedUrl;
}

// URL Encoder
function encodeURL() {
    let text = document.getElementById("textInput").value;
    let encodedUrl = encodeURIComponent(text);
    document.getElementById("textOutput").value = encodedUrl;
}

//HTML Encoder
function encodeHTML() {
    let text = document.getElementById("textInput").value;
    let encodedHtml = escape(text);
    document.getElementById("textOutput").value = encodedHtml;
}

//HTML Decoder
function decodeHTML() {
    let text = document.getElementById("textInput").value;
    let decodedHtml = unescape(text);
    document.getElementById("textOutput").value = decodedHtml;
}

//MD5 Hash Generator
function generateMD5() {
    let text = document.getElementById("textInput").value;
    let md5Hash = CryptoJS.MD5(text).toString()
    document.getElementById("textOutput").value = md5Hash;
}

//SHA256 Hash Generator
function generateSHA256() {
    let text = document.getElementById("textInput").value;
    let sha256Hash = CryptoJS.SHA256(text).toString();
    document.getElementById("textOutput").value = sha256Hash;
}

//UUID Generator
function generateUUID() {
    let uuid = uuidv4();
    document.getElementById("textOutput").value = uuid;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Convert epoch to human-readable
function convertToHuman() {
    const epoch = parseInt(document.getElementById('epochInput').value);
    if (isNaN(epoch)) {
        document.getElementById('humanResult').innerText = "Invalid epoch.";
        return;
    }
    const date = new Date(epoch * 1000);

    const utc = date.toUTCString();
    const local = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const iso = date.toISOString();

    document.getElementById('humanResult').innerHTML = `
        <strong>Assuming this timestamp is in seconds:</strong><br><br>
        <strong>GMT (UTC):</strong><br>${utc}<br><br>
        <strong>Your timezone:</strong><br>${local} (India Standard Time)<br><br>
        <strong>ISO 8601 format:</strong><br>${iso}
    `;
}

// Convert human-readable to epoch
function convertToEpoch() {
    const humanTime = document.getElementById('humanInput').value;

    if (!humanTime) {
        document.getElementById('epochResult').innerText = "Please select a valid date and time.";
        return;
    }

    const date = new Date(humanTime);
    const epoch = Math.floor(date.getTime() / 1000);

    document.getElementById('epochResult').innerHTML = `
        <strong>Epoch timestamp (seconds)</strong><br>${epoch}<br><br>
        <strong>Timestamp in milliseconds</strong><br>${epoch * 1000}
    `;
}

//Random Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    console.log(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charset = '';
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset.length === 0) {
        alert('Please select at least one character set!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('passwordOutput').value = password;
    document.getElementById('md5Output').value = CryptoJS.MD5(password).toString();
    document.getElementById('sha256Output').value = CryptoJS.SHA256(password).toString();
}

//Word Counter
function updateWordCount() {
    const text = document.getElementById('textInput').value;

    const words = text.match(/\b\S+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const paragraphs = text.split(/\n+/).filter(Boolean);

    const charWithSpaces = text.length;
    const charWithoutSpaces = text.replace(/\s/g, '').length;

    document.getElementById('wordCount').value = words.length;
    document.getElementById('wordCountNoTags').value = words.length;  // No tags handling, useful if you're allowing HTML input.
    document.getElementById('charCountWithSpaces').value = charWithSpaces;
    document.getElementById('charCountNoSpaces').value = charWithoutSpaces;
    document.getElementById('sentenceCount').value = sentences.length;
    document.getElementById('paragraphCount').value = paragraphs.length;
    document.getElementById('readingTime').value = Math.ceil(words.length / 200) + ' min';
    document.getElementById('speechTime').value = Math.ceil(words.length / 150) + ' min';
}

//icu message editor

let placeholderValues = {};

function detectPlaceholders() {
    const icuTextElement = document.getElementById('icuText');
    if (!icuTextElement) return;  // Avoid error if element is missing

    const icuText = icuTextElement.value;
    const placeholderRegex = /{(\w+)}/g;
    const placeholders = new Set();
    let match;

    while ((match = placeholderRegex.exec(icuText)) !== null) {
        placeholders.add(match[1]);
    }

    renderPlaceholderInputs([...placeholders]);
    updateFormattedText();
}

function renderPlaceholderInputs(placeholders) {
    const container = document.getElementById('dynamicInputs');
    container.innerHTML = '';  // Clear previous inputs

    placeholders.forEach(placeholder => {
        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('dynamic-input');

        const label = document.createElement('label');
        label.innerText = placeholder;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter value for ${placeholder}`;
        input.value = placeholderValues[placeholder] || '';  // Preserve value if it exists
        input.oninput = () => {
            placeholderValues[placeholder] = input.value;
            updateFormattedText();
        };

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        container.appendChild(inputWrapper);
    });
}

function updateFormattedText() {
    let icuText = document.getElementById('icuText').value;

    for (const [placeholder, value] of Object.entries(placeholderValues)) {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        icuText = icuText.replace(regex, value);
    }

    document.getElementById('formattedText').value = icuText;
}




const urlMappings = {};

// Function to shorten URL without an API
function shortenURL() {
    const inputURL = document.getElementById("textInput").value.trim();
    if (!isValidURL(inputURL)) {
        alert("Please enter a valid URL!");
        return;
    }

    const shortCode = Math.random().toString(36).substr(2, 6);
    urlMappings[shortCode] = inputURL;
    localStorage.setItem("urlMappings", JSON.stringify(urlMappings));

    document.getElementById("textOutput").value = 'bitazl.in' + "/?s=" + shortCode;
}

// Function to expand URL without an API
function expandURL() {
    const shortURL = document.getElementById("textInput").value.trim();
    const shortCode = shortURL.split("s=")[1];

    const storedMappings = JSON.parse(localStorage.getItem("urlMappings")) || {};
    const expandedURL = storedMappings[shortCode];

    if (expandedURL) {
        document.getElementById("textOutput").value = expandedURL;
    } else {
        alert("Shortened URL not found!");
    }
}

// Function to validate a URL
function isValidURL(url) {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)" + // Protocol
        "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|" + // Domain name
        "localhost|" + // Localhost
        "\\d{1,3}(\\.\\d{1,3}){3})" + // IP (v4)
        "(\\:\\d+)?(\\/.*)?$", // Port and path
        "i"
    );
    return urlPattern.test(url);
}

// // Function to shorten a URL
// async function shortenURL() {
//     const inputURL = document.getElementById("urlInput").value;
//     if (!inputURL) {
//         alert("Please enter a valid URL!");
//         return;
//     }

//     const apiURL = `https://api.tinyurl.com/create?api_token=YOUR_API_KEY`;

//     try {
//         const response = await fetch(apiURL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ url: inputURL }),
//         });

//         const data = await response.json();
//         if (data.data && data.data.tiny_url) {
//             document.getElementById("urlOutput").value = data.data.tiny_url;
//         } else {
//             alert("Failed to shorten the URL.");
//         }
//     } catch (error) {
//         console.error("Error shortening URL:", error);
//         alert("An error occurred.");
//     }
// }

// // Function to expand a shortened URL
// async function expandURL() {
//     const shortURL = document.getElementById("urlInput").value;
//     if (!shortURL) {
//         alert("Please enter a shortened URL!");
//         return;
//     }

//     const apiURL = `https://api.tinyurl.com/info?url=${shortURL}&api_token=YOUR_API_KEY`;

//     try {
//         const response = await fetch(apiURL);
//         const data = await response.json();

//         if (data.data && data.data.original_url) {
//             document.getElementById("urlOutput").value = data.data.original_url;
//         } else {
//             alert("Invalid shortened URL.");
//         }
//     } catch (error) {
//         console.error("Error expanding URL:", error);
//         alert("An error occurred.");
//     }
// }


// Initial trigger
detectPlaceholders();
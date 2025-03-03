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
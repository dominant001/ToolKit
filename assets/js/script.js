// // Dark mode toggle
// const themeToggle = document.createElement('div');
// themeToggle.innerHTML = '<button id="themeToggle"><i class="fas fa-moon"></i></button>';
// document.querySelector('.navbar').appendChild(themeToggle);

// document.getElementById('themeToggle').addEventListener('click', () => {
//     document.documentElement.setAttribute('data-theme',
//         document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
//     );
// });

// // File upload feedback
// document.querySelectorAll('.file-upload-input').forEach(input => {
//     input.addEventListener('change', function() {
//         const fileName = this.files[0]?.name || 'No file chosen';
//         this.parentElement.querySelector('span').textContent = fileName;
//     });
// });

// // Copy to clipboard
// function copyToClipboard(button) {
//     const text = button.parentElement.querySelector('pre').innerText;
//     navigator.clipboard.writeText(text).then(() => {
//         button.textContent = 'Copied!';
//         setTimeout(() => button.textContent = 'Copy', 2000);
//     });
// }

// // Form handling
// document.querySelectorAll('form').forEach(form => {
//     form.addEventListener('submit', function(e) {
//         const button = this.querySelector('button[type="submit"]');
//         if (button) {
//             button.disabled = true;
//             button.querySelector('.button-text').textContent = 'Processing...';
//             const spinner = button.querySelector('.loading-spinner');
//             if (spinner) spinner.style.display = 'inline-block';
//         }
//     });
// });


// Load Header Function
function loadHeader() {
    fetch("/includes/header.html")  // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));
}
// Load Header Function
function loadFooter() {
    fetch("/includes/footer.html")  // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
}


function base64ToolLink() {
    fetch("/includes/base64-tool-link.html")  // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // document.getElementById("base64-tool-link").innerHTML = data;

            const toolLink = document.getElementById("base64-tool-link");
            if (!toolLink) return;
            toolLink.innerHTML = data;

        })
        .catch(error => console.error("Error loading header:", error));
}

// Ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadHeader);
// Ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadFooter);

document.addEventListener("DOMContentLoaded", base64ToolLink);


const tools = [
    { name: 'JSON Parser', category: 'JSON Tools', keywords: ['json', 'parse', 'validate'], url: '/tools/json/json-formatter.html' },
    { name: 'JSON Formatter', category: 'JSON Tools', keywords: ['json', 'format', 'beautify'], url: '/tools/json/json-formatter.html' },
    { name: 'XML Parser', category: 'XML Tools', keywords: ['xml', 'parse', 'validate'], url: '/tools/xml-tools/xml-formatter.html' },
    { name: 'XML Formatter', category: 'XML Tools', keywords: ['xml', 'format', 'beautify'], url: '/tools/xml-tools/xml-formatter.html' },
    { name: 'Base64 Encoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode'], url: '/tools/base64/base64-encode-decode.html?type=encode' },
    { name: 'Base64 Decoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode'], url: '/tools/base64/base64-encode-decode.html?type=decode' },
    { name: 'Base64 Image Encoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode', 'image'], url: '/tools/base64/base64-image-encode-decode.html?type=imageEncode' },
    { name: 'Base64 Image Decoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode', 'image'], url: '/tools/base64/base64-image-encode-decode.html?type=imageDecode' },
    { name: 'JSON to XML', category: 'Conversion Tools', keywords: ['json', 'xml', 'to'], url: '/tools/conversion-tools/json-to-xml.html' },
    { name: 'JSON to CSV', category: 'Conversion Tools', keywords: ['json', 'csv', 'to'], url: '/tools/conversion-tools/json-to-csv.html' },
    { name: 'JSON to YAML', category: 'Conversion Tools', keywords: ['json', 'yaml', 'to'], url: '/tools/conversion-tools/json-to-yaml.html' },
    { name: 'XML to CSV', category: 'Conversion Tools', keywords: ['xml', 'csv', 'to'], url: '/tools/conversion-tools/xml-to-csv.html' },
    { name: 'XML to JSON', category: 'Conversion Tools', keywords: ['json', 'xml', 'to'], url: '/tools/conversion-tools/xml-to-json.html' },


    { name: 'HTML Encoder', category: 'Other Tools', keywords: ['HTML', 'html', 'encode'], url: '/tools/other-tools/html-encode-decode.html?type=encode' },
    { name: 'HTML Decoder', category: 'Other Tools', keywords: ['HTML', 'html', 'decode'], url: '/tools/other-tools/html-encode-decode.html?type=decode' },
    { name: 'URL Encoder', category: 'Other Tools', keywords: ['URL', 'url', 'encode'], url: '/tools/other-tools/url-encode-decode.html?type=encode' },
    { name: 'URL Decoder', category: 'Other Tools', keywords: ['URL', 'url', 'decode'], url: '/tools/other-tools/url-encode-decode.html?type=decode' },
    { name: 'ICU Message Editor', category: 'Other Tools', keywords: ['ICU', 'message', 'editor'], url: '/tools/other-tools/icu-message-editor.html' },
    { name: 'MD5 Hash Generator', category: 'Other Tools', keywords: ['md5', 'hash', 'generator'], url: '/tools/other-tools/md5-generator.html' },
    { name: 'Password Generator', category: 'Other Tools', keywords: ['password', 'generator'], url: '/tools/other-tools/password-generator.html' },
    { name: 'SHA-256 Hash Generator', category: 'Other Tools', keywords: ['sha-256', 'hash', 'generator'], url: '/tools/other-tools/sha256-generator.html' },
    { name: 'TimeStamp Converter', category: 'Other Tools', keywords: ['timestamp', 'converter'], url: '/tools/other-tools/timestamp-converter.html' },
    { name: 'UUID Generator', category: 'Other Tools', keywords: ['uuid', 'generator'], url: '/tools/other-tools/uuid-generator.html' },
    { name: 'Word Counter', category: 'Other Tools', keywords: ['word', 'counter'], url: '/tools/other-tools/word-counter.html' },
    // Add more tools following the same structure
];

// Initialize tools
function renderTools(filteredTools = tools) {
    const container = document.getElementById('toolsContainer');
    if (!container) return;
    container.innerHTML = '';

    filteredTools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="tool-card">
                <h5>${tool.name}</h5>
                <p class="text-muted">${tool.category}</p>
            </div>
        `;
        card.addEventListener('click', () => openTool(tool));
        container.appendChild(card);
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');


searchInput.addEventListener('keyup', function (e) {
    const searchTerm = this.value.toLowerCase();
    const suggestions = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm) ||
        tool.keywords.some(kw => kw.includes(searchTerm))
    );

    // Update suggestions
    if (searchTerm.length > 0) {
        searchSuggestions.innerHTML = suggestions
            .slice(0, 5)
            .map(tool => `
                <div class="suggestion-item">${tool.name}</div>
            `).join('');
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }

    // Filter tools
    renderTools(suggestions);
});

// Handle suggestion clicks
searchSuggestions.addEventListener('click', function (e) {
    if (e.target.classList.contains('suggestion-item')) {
        searchInput.value = e.target.textContent;
        searchSuggestions.style.display = 'none';
        const selectedTool = tools.find(tool => tool.name === e.target.textContent);
        if (selectedTool) {
            openTool(selectedTool);
        }
    }
});

// Tool handler
function openTool(tool) {
    window.location.href = tool.url;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const isReturningToHome = !document.referrer || document.referrer.includes('your-site-home-url');
        if (isReturningToHome) {
            sessionStorage.removeItem('searchTerm');  // Clear search term if returning to home
        } else {
            searchInput.value = sessionStorage.getItem('searchTerm') || '';
        }
    }
});
// Initial render
renderTools();



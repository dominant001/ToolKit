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

// Ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadHeader);
// Ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadFooter);


const tools = [
    { name: 'JSON Parser', category: 'JSON Tools', keywords: ['json', 'parse', 'validate'], url: '/tools/json/json-formatter.html'},
    { name: 'JSON Formatter', category: 'JSON Tools', keywords: ['json', 'format', 'beautify'], url: '/tools/json/json-formatter.html' },
    { name: 'XML Parser', category: 'XML Tools', keywords: ['xml', 'parse'], url: '/tools/xml/xml-parser.html' },
    { name: 'XML Formatter', category: 'XML Tools', keywords: ['xml', 'format'], url: '/tools/xml/xml-formatter.html' },
    { name: 'Base64 Encoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode'], url: '/tools/base64/base64-encoder.html' },
    { name: 'Base64 Decoder', category: 'Base64 Tools', keywords: ['base64', 'encode', 'decode'], url: '/tools/base64/base64-encoder.html' },
    { name: 'JSON to XML', category: 'Conversion Tools', keywords: ['json', 'xml', 'to'], url: '/tools/conversion-tools/json-to-xml.html' },
    { name: 'JSON to CSV', category: 'Conversion Tools', keywords: ['json', 'csv', 'to'], url: '/tools/conversion-tools/json-to-csv.html'},
    { name: 'JSON to YAML', category: 'Conversion Tools', keywords: ['json', 'yaml', 'to'], url: '/tools/conversion-tools/json-to-yaml.html' },
    
    // Add more tools following the same structure
];

// Initialize tools
function renderTools(filteredTools = tools) {
    const container = document.getElementById('toolsContainer');
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

searchInput.addEventListener('keyup', function(e) {
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
searchSuggestions.addEventListener('click', function(e) {
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

// Initial render
renderTools();



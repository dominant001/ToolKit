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
function processImage() {
    const file = document.getElementById('imageInput').files[0];
    const width = parseInt(document.getElementById('targetWidth').value) || 0;
    const height = parseInt(document.getElementById('targetHeight').value) || 0;
    
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('previewCanvas');
            const ctx = canvas.getContext('2d');
            
            // Maintain aspect ratio if only one dimension is provided
            const aspectRatio = img.width / img.height;
            const targetWidth = width || height * aspectRatio;
            const targetHeight = height || width / aspectRatio;

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            
            // Enable download
            const downloadLink = document.getElementById('downloadLink');
            canvas.toBlob(function(blob) {
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = `resized-${file.name}`;
                downloadLink.style.display = 'block';
            }, file.type);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
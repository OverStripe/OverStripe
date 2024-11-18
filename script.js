const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const downloadImage = document.getElementById("downloadImage");

// Load Images from images.json
async function loadImages() {
    try {
        const response = await fetch('/uploads/images.json');
        const images = await response.json();
        images.forEach(src => addImageToGallery(`/uploads/${src}`));
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

// Add Image to Gallery
function addImageToGallery(src) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("gallery-image");
    img.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(img);
}

// Open Lightbox
function openLightbox(src) {
    lightbox.style.display = "flex";
    lightboxImage.src = src;
    downloadImage.onclick = () => downloadCurrentImage(src);
}

// Close Lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

lightbox.addEventListener("click", closeLightbox);
document.querySelector(".close").addEventListener("click", closeLightbox);

// Download Image
function downloadCurrentImage(src) {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split('/').pop();
    link.click();
}

// Load Images on Page Load
loadImages();

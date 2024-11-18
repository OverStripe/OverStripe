// Show loader and fetch data
async function fetchInstagramData() {
    const url = document.getElementById("instagramUrl").value;
    const loader = document.getElementById("loader");
    const contentContainer = document.getElementById("contentContainer");

    if (!url) {
        alert("Please enter an Instagram URL.");
        return;
    }

    // Show loading spinner
    loader.style.display = "inline-block";
    contentContainer.style.display = "none";

    try {
        // Simulate fetching Instagram data
        const response = await fakeApiCall(url); // Replace with actual API request
        displayContent(response);
    } catch (error) {
        alert("Failed to fetch data. Please check the URL or try again later.");
    } finally {
        loader.style.display = "none";
    }
}

// Placeholder function for real API call
async function fakeApiCall(url) {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Sample response
    return {
        caption: "This is a sample caption from Instagram.",
        mediaUrl: "https://example.com/sample.jpg",
        mediaType: "image" // "video" or "image"
    };
}

// Display the content in HTML
function displayContent(data) {
    const captionText = document.getElementById("captionText");
    const mediaImage = document.getElementById("mediaImage");
    const mediaVideo = document.getElementById("mediaVideo");
    const downloadButton = document.getElementById("downloadButton");
    const copyLinkButton = document.getElementById("copyLinkButton");

    captionText.innerText = data.caption;
    document.getElementById("contentContainer").style.display = "block";

    if (data.mediaType === "image") {
        mediaImage.src = data.mediaUrl;
        mediaImage.style.display = "block";
        mediaVideo.style.display = "none";
    } else if (data.mediaType === "video") {
        mediaVideo.src = data.mediaUrl;
        mediaVideo.style.display = "block";
        mediaImage.style.display = "none";
    }

    downloadButton.style.display = "inline";
    downloadButton.setAttribute("data-url", data.mediaUrl);

    copyLinkButton.style.display = "inline";
    copyLinkButton.setAttribute("data-url", data.mediaUrl);
}

// Copy caption to clipboard
function copyCaption() {
    const captionText = document.getElementById("captionText").innerText;
    navigator.clipboard.writeText(captionText).then(() => {
        alert("Caption copied to clipboard!");
    });
}

// Download media
function downloadMedia() {
    const url = document.getElementById("downloadButton").getAttribute("data-url");
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Copy media link to clipboard
function copyMediaLink() {
    const url = document.getElementById("copyLinkButton").getAttribute("data-url");
    navigator.clipboard.writeText(url).then(() => {
        alert("Media link copied to clipboard!");
    });
}

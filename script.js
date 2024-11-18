// Function to fetch Instagram data using the RapidAPI endpoint
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
        // Make API request to fetch Instagram data
        const response = await fetchInstagramMediaData(url);
        if (response) {
            displayContent(response);
        } else {
            alert("Failed to fetch data. Please check the URL or try again later.");
        }
    } catch (error) {
        console.error("Error fetching Instagram data:", error);
        alert("Failed to fetch data. Please check the URL or try again later.");
    } finally {
        loader.style.display = "none";
    }
}

// Function to call the Instagram Reels Downloader API using fetch
async function fetchInstagramMediaData(instagramUrl) {
    const apiUrl = `https://instagram-reels-downloader2.p.rapidapi.com/.netlify/functions/api/getLink?url=${encodeURIComponent(instagramUrl)}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "instagram-reels-downloader2.p.rapidapi.com",
                "x-rapidapi-key": "c62e48bd40msh4642d577e91621fp12c6e3jsn96865737741c"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return {
                caption: data.caption || "No caption available", // Check for caption; default if not present
                mediaUrl: data.link,   // Assuming `data.link` contains the URL to the media
                mediaType: data.type   // Assuming `data.type` indicates "image" or "video"
            };
        } else {
            throw new Error("Failed to fetch data from API");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
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

    // Set up download button and copy link button with media URL
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

// Download media (image or video)
function downloadMedia() {
    const url = document.getElementById("downloadButton").getAttribute("data-url");
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop(); // Automatically set the filename
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

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const uploadDir = path.join(__dirname, "public/uploads");
const botToken = "8166901002:AAFEAmJs4nOnu8M1oQplbo0dyVs_B9i7oOc";

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(bodyParser.json());
app.use(express.static("public"));

// Telegram Webhook Endpoint to Handle Image Uploads
app.post("/webhook", async (req, res) => {
    const { message } = req.body;

    // Check if the message contains an image
    if (message && message.photo) {
        const fileId = message.photo[message.photo.length - 1].file_id; // Get the highest resolution
        const chatId = message.chat.id; // Get the chat ID to send confirmation

        try {
            // Get file path from Telegram API
            const fileInfo = await axios.get(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
            const filePath = fileInfo.data.result.file_path;

            // Construct the download URL
            const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
            const fileName = path.basename(filePath);
            const localFilePath = path.join(uploadDir, fileName);

            // Download the image and save it locally
            const writer = fs.createWriteStream(localFilePath);
            const response = await axios.get(fileUrl, { responseType: "stream" });
            response.data.pipe(writer);

            writer.on("finish", () => {
                console.log(`Image saved: ${fileName}`);
                updateImageList(); // Update images.json after saving the new image
                
                // Send confirmation message to user
                sendConfirmationMessage(chatId, "Upload successful! Your image has been added to Lumi Walls.");
            });

            writer.on("error", (err) => console.error("Error downloading image:", err));
        } catch (error) {
            console.error("Error handling Telegram image:", error);
        }
    }

    res.sendStatus(200); // Respond to Telegram server
});

// Function to update images.json with the list of current images
function updateImageList() {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return console.error("Error reading uploads directory:", err);

        // Filter for image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        fs.writeFile(path.join(uploadDir, "images.json"), JSON.stringify(imageFiles), (err) => {
            if (err) console.error("Error updating images.json:", err);
            else console.log("Updated images.json");
        });
    });
}

// Function to send a confirmation message back to the user
async function sendConfirmationMessage(chatId, text) {
    try {
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: text
        });
        console.log("Confirmation message sent to user.");
    } catch (error) {
        console.error("Error sending confirmation message:", error);
    }
}

// Serve images.json to the client
app.use("/uploads", express.static(uploadDir));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

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

    if (message && message.photo) {
        const fileId = message.photo[message.photo.length - 1].file_id; // Get highest resolution
        try {
            const fileInfo = await axios.get(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
            const filePath = fileInfo.data.result.file_path;

            const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
            const fileName = path.basename(filePath);
            const localFilePath = path.join(uploadDir, fileName);

            const writer = fs.createWriteStream(localFilePath);
            const response = await axios.get(fileUrl, { responseType: "stream" });
            response.data.pipe(writer);

            writer.on("finish", () => {
                console.log(`Image saved: ${fileName}`);
                updateImageList();
            });
            writer.on("error", (err) => console.error("Error saving image:", err));
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    }

    res.sendStatus(200); // Respond to Telegram server
});

// Update images.json with current image files
function updateImageList() {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return console.error("Error reading uploads directory:", err);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        fs.writeFile(path.join(uploadDir, "images.json"), JSON.stringify(imageFiles), (err) => {
            if (err) console.error("Error updating images.json:", err);
            else console.log("Updated images.json");
        });
    });
}

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

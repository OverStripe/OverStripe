// Festival Calendar
const festivals = [
    { name: "Christmas", date: "2024-12-25", decorations: ["❄", "🎄", "❅"] },
    { name: "New Year", date: "2025-01-01", decorations: ["🎆", "✨", "🎇"] },
    { name: "Valentine's Day", date: "2025-02-14", decorations: ["💖", "💘", "❤️"] },
];

// Display Animated Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Find Next Festival and Update Message
function updateFestivalMessage() {
    const now = new Date();
    const countdownText = document.getElementById("countdownText");
    const festivalMessage = document.getElementById("festivalMessage");
    const decorationsContainer = document.getElementById("decorations");

    for (let festival of festivals) {
        const festivalDate = new Date(festival.date + "T00:00:00");
        const timeDifference = festivalDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            festivalMessage.textContent = `${festival.name} Coming 🎉`;
            countdownText.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // Update decorations for the festival
            decorationsContainer.innerHTML = "";
            festival.decorations.forEach(icon => {
                const decoration = document.createElement("div");
                decoration.className = "decoration";
                decoration.textContent = icon;
                decoration.style.left = `${Math.random() * 100}%`;
                decoration.style.animationDuration = `${5 + Math.random() * 5}s`;
                decorationsContainer.appendChild(decoration);
            });
            return;
        }
    }

    festivalMessage.textContent = "Festival Season 🎉";
    countdownText.textContent = "";
    decorationsContainer.innerHTML = "";
}

// Initialize Clock and Festival Updates
setInterval(updateClock, 1000);
setInterval(updateFestivalMessage, 1000);

updateClock();
updateFestivalMessage();

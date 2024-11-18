// Snowfall Effect
function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random horizontal position
    snowflake.style.left = Math.random() * 100 + "vw";

    // Random fall duration
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";

    // Random opacity
    snowflake.style.opacity = Math.random();

    // Append to snow-container
    document.querySelector(".snow-container").appendChild(snowflake);

    // Remove snowflake after falling
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Add snowflakes at intervals
setInterval(createSnowflake, 100);

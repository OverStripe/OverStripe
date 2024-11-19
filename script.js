document.addEventListener("DOMContentLoaded", function () {
    // Create snowflakes and add them to the document
    const snowContainer = document.querySelector(".snow-container");

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.textContent = "❄"; // Snowflake symbol

        // Random position and size for each snowflake
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + "em";
        snowflake.style.animationDuration = Math.random() * 3 + 5 + "s";

        // Append to container and remove after falling
        snowContainer.appendChild(snowflake);
        setTimeout(() => {
            snowflake.remove();
        }, 8000); // Match the longest animation duration
    }

    // Generate snowflakes at intervals
    setInterval(createSnowflake, 300);
});

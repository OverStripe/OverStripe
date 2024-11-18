// Function to create a single snowflake element and animate it
function createSnowflake() {
    // Create a div element for the snowflake
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random horizontal position across the viewport width
    snowflake.style.left = `${Math.random() * 100}vw`;

    // Set random animation duration to vary fall speed
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;

    // Append snowflake to the snow container
    document.querySelector(".snow-container").appendChild(snowflake);

    // Remove snowflake after it falls to the bottom to prevent overflow
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Function to start generating snowflakes at a consistent interval
function startSnowfall() {
    setInterval(createSnowflake, 150); // Create a new snowflake every 150ms
}

// Initiate snowfall when the page has fully loaded
window.onload = startSnowfall;

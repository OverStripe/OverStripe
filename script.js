// Function to create and animate a snowflake element with random properties
function createSnowflake() {
    // Create a div element for the snowflake
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Set random horizontal position, size, opacity, and fall duration
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.width = `${Math.random() * 8 + 3}px`; // Random size between 3px and 11px
    snowflake.style.height = snowflake.style.width; // Keep snowflake circular
    snowflake.style.opacity = Math.random() * 0.6 + 0.4; // Random opacity between 0.4 and 1
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random fall duration between 3s and 8s
    snowflake.style.animationDelay = `${Math.random() * 2}s`; // Random start delay for smoother appearance

    // Append the snowflake to the snow container
    document.querySelector(".snow-container").appendChild(snowflake);

    // Remove the snowflake after it finishes falling to prevent memory issues
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Function to start generating snowflakes at regular intervals
function startSnowfall() {
    setInterval(createSnowflake, 100); // Create a new snowflake every 100ms
}

// Start the snowfall effect once the page has fully loaded
window.onload = startSnowfall;

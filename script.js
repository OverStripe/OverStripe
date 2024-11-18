document.addEventListener("DOMContentLoaded", function () {
    // Get the Set Wallpaper button
    const setWallpaperButton = document.getElementById("setWallpaperButton");

    // Add click event listener to the button
    setWallpaperButton.addEventListener("click", function (event) {
        // Log button click to the console
        console.log("Set Wallpaper button clicked!");

        // Temporarily add 'clicked' class for animation
        setWallpaperButton.classList.add("clicked");

        // Remove 'clicked' class after the animation duration
        setTimeout(() => {
            setWallpaperButton.classList.remove("clicked");
        }, 100); // Match the duration with CSS transition
    });
});

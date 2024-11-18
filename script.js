const eyes = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    eyes.forEach((eye, index) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const pupilX = Math.cos(angle) * 15; // Adjust 15 to control movement range
        const pupilY = Math.sin(angle) * 15;

        pupils[index].style.transform = `translate(${pupilX - 50}%, ${pupilY - 50}%)`;
    });
});

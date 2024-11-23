// Generate Butterflies
function createButterfly() {
    const butterflyContainer = document.getElementById('butterfly-container');
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';

    butterfly.style.left = `${Math.random() * 100}%`;
    butterfly.style.top = `${Math.random() * 100}%`;

    butterflyContainer.appendChild(butterfly);

    setTimeout(() => {
        butterfly.remove();
    }, 6000);
}

// Generate Birds
function createBird() {
    const birdContainer = document.getElementById('bird-container');
    const bird = document.createElement('div');
    bird.className = 'bird';

    bird.style.left = `${Math.random() * 100}px`;
    bird.style.top = `${Math.random() * 50}px`;

    birdContainer.appendChild(bird);

    setTimeout(() => {
        bird.remove();
    }, 10000);
}

// Add Butterflies and Birds Periodically
setInterval(createButterfly, 2000);
setInterval(createBird, 3000);

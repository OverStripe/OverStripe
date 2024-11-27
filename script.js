document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.getElementById('projects');

    fetch('https://api.github.com/users/OverStripe/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'col-md-4 mb-4';
                projectCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title neon-text">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'No description available.'}</p>
                            <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View Project</a>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
});

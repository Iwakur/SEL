function includeHTML(callback) {
    const includes = document.querySelectorAll('[data-include]');
    let loadedCount = 0;

    if (includes.length === 0) {
        callback(); // No includes to wait for
        return;
    }

    includes.forEach(el => {
        const file = "/SEL/" + el.getAttribute('data-include');
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                loadedCount++;

                // Run callback after all includes are loaded
                if (loadedCount === includes.length) {
                    callback();
                }
            })
            .catch(err => console.error(err));
    });
}

function setupNavigation() {
    console.log("Navigation script running");

    const path = window.location.pathname;
    console.log("Current path:", path);

    const match = path.match(/\d+/);
    console.log("Match found:", match);

    const totalPages = 13;
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    console.log("Prev button found:", !!prevBtn);
    console.log("Next button found:", !!nextBtn);

    if (!prevBtn || !nextBtn) return;

    if (!match) {
        prevBtn.style.display = 'none';
        nextBtn.href = `episodes/Episode1.html`;
        return;
    }


    const currentPage = parseInt(match[0]);

    if (currentPage > 1) {
        prevBtn.href = `Episode${currentPage - 1}.html`;
    } else {
        prevBtn.href = `../index.html`;

    }

    if (currentPage < totalPages) {
        nextBtn.href = `Episode${currentPage + 1}.html`;
    } else {
        nextBtn.style.display = 'none';
    }
}

const box = document.querySelector('#episode-container');

document.addEventListener('mousemove', (e) => {

    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (centerX - e.clientX) / 10; // divide to soften movement
    const offsetY = (centerY - e.clientY) / 10;

    box.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(255, 0, 100, 0.5)`;
});


// Run after page DOM is loaded and includes are inserted
document.addEventListener("DOMContentLoaded", () => {
    includeHTML(setupNavigation);
});

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

// function setupNavigation() {
//     console.log("Navigation script running");
//
//     const path = window.location.pathname;
//     console.log("Current path:", path);
//
//     const match = path.match(/\d+/);
//     console.log("Match found:", match);
//
//     const totalPages = 13;
//     const prevBtn = document.getElementById('prev');
//     const nextBtn = document.getElementById('next');
//
//     console.log("Prev button found:", !!prevBtn);
//     console.log("Next button found:", !!nextBtn);
//
//     if (!prevBtn || !nextBtn) return;
//
//     if (!match) {
//         prevBtn.style.display = 'none';
//         nextBtn.href = `episodes/Episode1.html`;
//         return;
//     }
//
//
//     const currentPage = parseInt(match[0]);
//
//     if (currentPage > 1) {
//         prevBtn.href = `Episode${currentPage - 1}.html`;
//     } else {
//         prevBtn.href = `../index.html`;
//
//     }
//
//     if (currentPage < totalPages) {
//         nextBtn.href = `Episode${currentPage + 1}.html`;
//     } else {
//         nextBtn.style.display = 'none';
//     }
// }


function startGlitching(el) {
    const chars = "█▓▒░▌▀▄■◘♦あぃぅお";
    const originalText = el.dataset.original || el.textContent;
    el.dataset.original = originalText;

    const interval = setInterval(() => {
        const glitched = originalText.split('').map(c => {
            return Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : c;
        }).join('');
        el.textContent = glitched;
    }, 50); // Update every 50ms

    el.dataset.glitchInterval = interval;
}

function stopGlitching(el) {
    const intervalId = el.dataset.glitchInterval;
    clearInterval(intervalId);
    el.textContent = el.dataset.original;
}

function attachHoverListeners() {
    console.log("Attaching hover listeners");
    const start_b = document.getElementById('start-button');
    const welcome = document.getElementById('welcome-screen');
    const video = document.getElementById('popup-video');
    document.querySelectorAll('.glitch-text').forEach(el => {
        el.addEventListener('mouseenter', () => {
            startGlitching(el);
            document.body.classList.add('dark');
            if (el.classList.contains('quote-popup')) {
                const popup = document.getElementById('popup1'); // or use el.dataset.popupId if more
                popup.style.display = 'flex';
                video.currentTime = 0;
                video.volume = 0.5;

                video.play().catch(err => {
                    console.warn("Video playback blocked:", err);
                });
            }
        });

        el.addEventListener('mouseleave', () => {
            stopGlitching(el);
            document.body.classList.remove('dark');
            if (el.classList.contains('quote-popup')) {
                const popup = document.getElementById('popup1'); // or use el.dataset.popupId if more
                popup.style.display = 'none';
                video.stop()
                video.volume = 0;

            }
            el.addEventListener('mouseenter', () => {
                console.log("Hovered:", el); // see if this logs

            });
        });



    });

    // document.querySelectorAll('.quote-popup').forEach(el => {
    //     el.addEventListener('mouseenter', () => {
    //         startGlitching(el);
    //         document.body.classList.add('dark');
    //     });
    //
    // });

    start_b.addEventListener('click', () => {
        const music = document.getElementById('bg-music');
        music.volume = 0.1;
        music.play().catch(() => {});
        setTimeout(() => {
            welcome.classList.add('fade-out');
        }, 500); // Start fade out after 1 second


        // 3. After animation, hide welcome and show main
        setTimeout(() => {
            welcome.style.display = 'none';
        }, 2000); // must match CSS transition duration

    }, { once: true });


}





document.addEventListener("DOMContentLoaded", () => {
    includeHTML(() => {
        // setupNavigation();
        attachHoverListeners()
    });
});



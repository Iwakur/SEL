    document.addEventListener("DOMContentLoaded", () => {

        console.log("Script loaded");

        const path = window.location.pathname;
        console.log("Current path:", path);


        const match = window.location.pathname.match(/\d+/);
        console.log("Match found:", match);
        const totalPages = 13;

        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        console.log("Prev button found:", !!prevBtn);
        console.log("Next button found:", !!nextBtn);
        if (!prevBtn || !nextBtn) return; // DOM safety check

        // Case: index.html — no match
        if (!match) {
            prevBtn.style.display = 'none'; // hide previous
            nextBtn.href = `Episode1.html`; // go to first episode
            return;
        }

        // Case: Episode1 to Episode13
        const currentPage = parseInt(match[0]);

        if (currentPage > 1) {
            prevBtn.href = `Episode${currentPage - 1}.html`;
        } else {
            prevBtn.style.display = 'none';
        }

        if (currentPage < totalPages) {
            nextBtn.href = `Episode${currentPage + 1}.html`;
        } else {
            nextBtn.style.display = 'none';
        }
    });

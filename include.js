function includeHTML() {
    const includes = document.querySelectorAll('[data-include]');
    includes.forEach(el => {
        const file = "/SEL/"+ el.getAttribute('data-include');
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => console.error(err));
    });
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', includeHTML);

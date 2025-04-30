// js/ui/carousel.js
// Place ici toute la logique du carrousel premium (updateCarousel, goTo, etc.)

export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const btnPrev = document.querySelector('.carousel-arrow.left');
    const btnNext = document.querySelector('.carousel-arrow.right');
    const pagination = document.querySelector('.carousel-pagination');
    let current = 0;
    function updateCarousel() {
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
        if (pagination) {
            Array.from(pagination.children).forEach((dot, i) => dot.classList.toggle('active', i === current));
        }
    }
    function goTo(idx) {
        current = (idx + slides.length) % slides.length;
        updateCarousel();
    }
    if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
    if (pagination) {
        pagination.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Aller à la réalisation ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            pagination.appendChild(dot);
        });
    }
    let startX = null;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
        if (startX !== null) {
            const dx = e.changedTouches[0].clientX - startX;
            if (dx > 40) goTo(current - 1);
            if (dx < -40) goTo(current + 1);
            startX = null;
        }
    });
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });
    goTo(0);
}

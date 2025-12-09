document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav toggle */
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
});

/* Theme toggle */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setTheme(light) {
    document.body.classList.toggle('light', !!light);
    themeToggle.setAttribute('aria-pressed', !!light);
    themeIcon.className = light ? 'fa fa-sun' : 'fa fa-moon';
    try { localStorage.setItem('pref-theme', light ? 'light' : 'dark'); } catch (e) { }
}
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('light')));
const saved = (function () { try { return localStorage.getItem('pref-theme'); } catch (e) { return null } })();
if (saved === 'light') setTheme(true); else if (saved === 'dark') setTheme(false);

/* Typing effect (lightweight) */
(function typing() {
    const el = document.getElementById('typed');
    if (!el) return;
    const words = ['Frontend Developer', 'Animation Lover', 'Performance Enthusiast'];
    let w = 0, i = 0, dir = 1;
    function step() {
        const word = words[w];
        el.textContent = word.slice(0, i);
        i += dir;
        if (i > word.length) { dir = -1; i = word.length; setTimeout(step, 800); return; }
        if (i < 0) { dir = 1; i = 0; w = (w + 1) % words.length; }
        setTimeout(step, 60 + Math.random() * 40);
    }
    step();
})();

/* Reveal on scroll */
const revealEls = Array.from(document.querySelectorAll('.reveal'));
function revealOnScroll() {
    const top = window.innerHeight;
    revealEls.forEach((el, idx) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < top - 90) {
            el.classList.add('in');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* Contact form (demo, no backend) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const old = btn.textContent;
        btn.textContent = 'Sending...';
        setTimeout(() => { btn.textContent = 'Sent ✓'; contactForm.reset(); setTimeout(() => btn.textContent = old, 1600) }, 900);
    });
}

if (window.particlesJS) {
    particlesJS('particles-js',
        {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#7c5cff", "#00d4ff", "#7ee7ff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.12 },
                "size": { "value": 4, "random": true },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.12 } } }
            },
            "retina_detect": true
        });
}

/* Accessibility: disable animations for reduced motion preference */
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => el.style.transition = 'none');
}

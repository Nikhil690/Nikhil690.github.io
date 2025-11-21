const THEME_KEY = 'portfolio-theme';

const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

const getStoredTheme = () => localStorage.getItem(THEME_KEY);

const applyTheme = (theme) => {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const label = toggle?.querySelector('.theme-label');

    if (theme === 'light') {
        body.classList.add('light-theme');
        label && (label.textContent = 'Light');
        toggle?.setAttribute('aria-pressed', 'true');
    } else {
        body.classList.remove('light-theme');
        label && (label.textContent = 'Dark');
        toggle?.setAttribute('aria-pressed', 'false');
    }
};

const toggleTheme = () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
};

const initThemeToggle = () => {
    const stored = getStoredTheme();
    const initialTheme = stored || (prefersLight.matches ? 'light' : 'dark');
    applyTheme(initialTheme);

    const toggle = document.getElementById('theme-toggle');
    toggle?.addEventListener('click', toggleTheme);

    prefersLight.addEventListener('change', (event) => {
        if (!getStoredTheme()) {
            applyTheme(event.matches ? 'light' : 'dark');
        }
    });
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button?.textContent;

        if (button) {
            button.textContent = 'Sending…';
            button.disabled = true;
        }

        setTimeout(() => {
            button && (button.textContent = 'Sent ✓ - This is just a demo :) Please email me'); // Added message to indicate demo
            form.reset();

            setTimeout(() => {
                if (button && originalText) {
                    button.textContent = originalText;
                    button.disabled = false;
                }
            }, 1800);
        }, 900);
    });
};

const initFooterYear = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSmoothScroll();
    initContactForm();
    initFooterYear();
});
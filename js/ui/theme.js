// js/ui/theme.js
// Place ici toute la logique de gestion du thème sombre/clair

export function initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    const html = document.documentElement;
    const body = document.body;
    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    function setTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark');
            body.classList.add('dark');
        } else {
            html.classList.remove('dark');
            body.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }
    function toggleTheme() {
        const isDark = html.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }
    setTheme(getPreferredTheme());
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);
    }
}

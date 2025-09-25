// js/main.js
import { enableSmoothScroll, enableScrollToTop } from './ui/scroll.js';
import { initChatbot } from './ui/chatbot.js';
import { initTheme } from './ui/theme.js';
import { initCarousel } from './ui/carousel.js';
import {
  displayBlogArticles,
  displayLiensUtiles,
  displayTestimonials,
  displayFAQ,
  displayTeam,
  displayEvents,
  displayFiles,
  displaySocial,
  displayDonationCustomText
} from './public.js';
import { renderAdminSectionGeneric } from './admin/admin-render.js';
import { adminSectionsConfig } from './admin/admin-config.js';

// Initialisation UI globale
window.addEventListener('DOMContentLoaded', () => {
    // --- Masquage du loader ---
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    enableSmoothScroll();
    enableScrollToTop();
    initChatbot();
    initTheme();
    initCarousel();
    displayBlogArticles();
    displayLiensUtiles();
    displayTestimonials();
    displayFAQ();
    displayTeam();
    displayEvents();
    displayFiles();
    displaySocial();
    displayDonationCustomText();

    // --- Gestion du menu déroulant "Autres" ---
    const autresMenuBtn = document.getElementById('autresMenuBtn');
    const autresDropdown = document.getElementById('autresDropdown');
    let dropdownOpen = false;
    function openDropdown() {
        autresDropdown.classList.remove('hidden');
        autresMenuBtn.setAttribute('aria-expanded', 'true');
        dropdownOpen = true;
    }
    function closeDropdown() {
        autresDropdown.classList.add('hidden');
        autresMenuBtn.setAttribute('aria-expanded', 'false');
        dropdownOpen = false;
    }
    if (autresMenuBtn && autresDropdown) {
        autresMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownOpen ? closeDropdown() : openDropdown();
        });
        autresMenuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeDropdown();
        });
        document.addEventListener('click', (e) => {
            if (dropdownOpen && !autresDropdown.contains(e.target) && e.target !== autresMenuBtn) {
                closeDropdown();
            }
        });
    }

    // --- Gestion de la sidebar admin ---
    const adminMenuToggle = document.getElementById('adminMenuToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    const adminSidebarClose = document.getElementById('adminSidebarClose');
    if (adminMenuToggle && adminSidebar) {
        adminMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.add('open');
        });
    }
    if (adminSidebarClose && adminSidebar) {
        adminSidebarClose.addEventListener('click', () => {
            adminSidebar.classList.remove('open');
        });
    }

    // --- Gestion du login admin ---
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLoginSuccess = document.getElementById('adminLoginSuccess');
    const adminLoginError = document.getElementById('adminLoginError');
    const adminPanel = document.getElementById('adminPanel');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            adminLoginError.classList.add('hidden');
            adminLoginSuccess.classList.add('hidden');
            // Récupère les identifiants
            const user = document.getElementById('adminUser').value.trim();
            const pass = document.getElementById('adminPass').value;
            // Vérification locale simple (à adapter à ton backend !)
            // Pour la démo : user = 'admin', pass = 'admin123'
            if (user === 'admin' && pass === 'admin123') {
                adminLoginForm.classList.add('hidden');
                if (adminPanel) adminPanel.classList.remove('hidden');
                adminLoginSuccess.classList.remove('hidden');
            } else {
                adminLoginError.classList.remove('hidden');
            }
        });
    }

    // --- Admin dynamique ---
    const adminMenuSections = document.getElementById('adminMenuSections');
    if (adminPanel && adminMenuSections) {
        // Génère le menu dynamique
        adminMenuSections.innerHTML = Object.entries(adminSectionsConfig).map(([key, cfg]) =>
            `<button class="admin-menu-btn" data-section="${key}">${cfg.label}</button>`
        ).join('');
        // Gestion du clic sur un bouton menu
        adminMenuSections.querySelectorAll('.admin-menu-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                // Cache toutes les sections
                document.querySelectorAll('.admin-section').forEach(sec => sec.classList.add('hidden'));
                // Affiche la section demandée
                const section = btn.getAttribute('data-section');
                const target = document.getElementById(`adminSection-${section}`);
                if (target) {
                    target.classList.remove('hidden');
                    await renderAdminSectionGeneric(section);
                }
            });
        });
        // Affiche la première section par défaut
        const firstSection = Object.keys(adminSectionsConfig)[0];
        if (firstSection) {
            document.getElementById(`adminSection-${firstSection}`).classList.remove('hidden');
            renderAdminSectionGeneric(firstSection);
        }
    }
});

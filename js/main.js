// js/main.js
import { enableSmoothScroll, enableScrollToTop } from './ui/scroll.js';
import { initChatbot } from './ui/chatbot.js';
import { initTheme } from './ui/theme.js';
import { initCarousel } from './ui/carousel.js';
import {
  displayHero,
  displayAbout,
  displayTimeline,
  displayProjectsCarousel,
  displayStats,
  displayServices,
  displayShop,
  displayBlogArticles,
  displayLiensUtiles,
  displayTestimonials,
  displayFAQ,
  displayTeam,
  displayEvents,
  displayFiles,
  displaySocial,
  displayDonationCustomText,
  displayContact
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
    
    // Chargement dynamique de toutes les sections depuis l'API
    displayHero();
    displayAbout();
    displayTimeline();
    displayProjectsCarousel();
    displayStats();
    displayServices();
    displayShop();
    displayBlogArticles();
    displayLiensUtiles();
    displayTestimonials();
    displayFAQ();
    displayTeam();
    displayEvents();
    displayFiles();
    displaySocial();
    displayDonationCustomText();
    displayContact();

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

    // --- Gestion du login admin avec persistance ---
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLoginSuccess = document.getElementById('adminLoginSuccess');
    const adminLoginError = document.getElementById('adminLoginError');
    const adminPanel = document.getElementById('adminPanel');
    
    // Fonction pour afficher le panneau admin
    function showAdminPanel() {
        if (adminLoginForm) adminLoginForm.classList.add('hidden');
        if (adminPanel) adminPanel.classList.remove('hidden');
        if (adminLoginSuccess) adminLoginSuccess.classList.remove('hidden');
        
        // Afficher le bouton de déconnexion
        const logoutBtn = document.getElementById('adminLogoutBtn');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        
        // Créer le bouton de déconnexion s'il n'existe pas
        if (!logoutBtn) {
            const adminHeader = document.querySelector('#adminSidebar .flex.items-center.justify-between');
            if (adminHeader) {
                const logoutButton = document.createElement('button');
                logoutButton.id = 'adminLogoutBtn';
                logoutButton.className = 'text-white hover:text-gray-200 focus:outline-none px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm ml-2';
                logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Déconnexion';
                logoutButton.setAttribute('aria-label', 'Se déconnecter');
                logoutButton.setAttribute('title', 'Déconnexion');
                
                // Insérer avant le bouton de fermeture
                const closeBtn = document.getElementById('adminSidebarClose');
                if (closeBtn && closeBtn.parentNode) {
                    closeBtn.parentNode.insertBefore(logoutButton, closeBtn);
                }
                
                // Ajouter l'événement de déconnexion
                logoutButton.addEventListener('click', handleLogout);
            }
        }
    }
    
    // Fonction de déconnexion
    function handleLogout() {
        localStorage.removeItem('adminLoggedIn');
        if (adminPanel) adminPanel.classList.add('hidden');
        if (adminLoginForm) {
            adminLoginForm.classList.remove('hidden');
            adminLoginForm.reset();
        }
        if (adminLoginSuccess) adminLoginSuccess.classList.add('hidden');
        
        // Cacher le bouton de déconnexion
        const logoutBtn = document.getElementById('adminLogoutBtn');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }
    
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
        showAdminPanel();
    }
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (adminLoginError) adminLoginError.classList.add('hidden');
            if (adminLoginSuccess) adminLoginSuccess.classList.add('hidden');
            // Récupère les identifiants
            const user = document.getElementById('adminUser').value.trim();
            const pass = document.getElementById('adminPass').value;
            // Vérification locale simple (à adapter à ton backend !)
            // Pour la démo : user = 'admin', pass = 'admin123'
            if (user === 'admin' && pass === 'admin123') {
                // Sauvegarder la connexion dans localStorage
                localStorage.setItem('adminLoggedIn', 'true');
                showAdminPanel();
            } else {
                if (adminLoginError) adminLoginError.classList.remove('hidden');
            }
        });
    }

    // --- Admin dynamique ---
    const adminMenuSections = document.getElementById('adminMenuSections');
    if (adminPanel && adminMenuSections) {
        // Récupérer l'ordre des sections depuis localStorage ou utiliser l'ordre par défaut
        let sectionsOrder = JSON.parse(localStorage.getItem('adminSectionsOrder')) || Object.keys(adminSectionsConfig);
        
        // Ajouter un bouton de réinitialisation
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Réinitialiser l\'ordre';
        resetBtn.className = 'w-full mt-4 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm font-semibold transition';
        resetBtn.title = 'Remettre l\'ordre par défaut des sections';
        resetBtn.addEventListener('click', async () => {
            if (confirm('⚠️ ATTENTION : Voulez-vous vraiment TOUT réinitialiser ?\n\n✅ Ordre des sections\n✅ Toutes les données\n✅ Retour aux données de démo\n\nCette action est irréversible !')) {
                try {
                    resetBtn.disabled = true;
                    resetBtn.textContent = '⏳ Réinitialisation...';
                    
                    // 1. Réinitialiser l'ordre des sections
                    localStorage.removeItem('adminSectionsOrder');
                    sectionsOrder = Object.keys(adminSectionsConfig);
                    
                    // 2. Réinitialiser toutes les données via l'API
                    const response = await fetch('/api/reset-all', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // 3. Réorganiser l'interface
                        renderAdminMenu();
                        syncHeaderOrder();
                        syncPageSectionsOrder();
                        
                        // 4. Afficher la première section
                        const firstSection = sectionsOrder[0];
                        if (firstSection) {
                            document.querySelectorAll('.admin-section').forEach(sec => sec.classList.add('hidden'));
                            document.getElementById(`adminSection-${firstSection}`).classList.remove('hidden');
                            await renderAdminSectionGeneric(firstSection);
                        }
                        
                        // 5. Recharger toutes les sections publiques
                        window.location.reload();
                    } else {
                        alert('❌ Erreur lors de la réinitialisation : ' + data.error);
                    }
                } catch (error) {
                    alert('❌ Erreur : ' + error.message);
                } finally {
                    resetBtn.disabled = false;
                    resetBtn.textContent = '🔄 Réinitialiser l\'ordre';
                }
            }
        });
        
        // Fonction pour générer le menu
        function renderAdminMenu() {
            adminMenuSections.innerHTML = sectionsOrder.map((key, idx) => {
                const cfg = adminSectionsConfig[key];
                if (!cfg) return '';
                return `<div class="admin-menu-item flex items-center gap-2 mb-1">
                    <div class="flex flex-col gap-1">
                        <button class="move-section-up text-gray-400 hover:text-blue-600 text-xs ${idx === 0 ? 'invisible' : ''}" 
                                data-section="${key}" 
                                title="Monter">
                            ▲
                        </button>
                        <button class="move-section-down text-gray-400 hover:text-blue-600 text-xs ${idx === sectionsOrder.length - 1 ? 'invisible' : ''}" 
                                data-section="${key}"
                                title="Descendre">
                            ▼
                        </button>
                    </div>
                    <button class="admin-menu-btn flex-1" data-section="${key}">${cfg.label}</button>
                </div>`;
            }).join('');
            
            // Gestion des boutons de déplacement
            adminMenuSections.querySelectorAll('.move-section-up').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const section = btn.getAttribute('data-section');
                    const idx = sectionsOrder.indexOf(section);
                    if (idx > 0) {
                        [sectionsOrder[idx], sectionsOrder[idx - 1]] = [sectionsOrder[idx - 1], sectionsOrder[idx]];
                        localStorage.setItem('adminSectionsOrder', JSON.stringify(sectionsOrder));
                        renderAdminMenu();
                        syncHeaderOrder();
                        syncPageSectionsOrder();
                    }
                });
            });
            
            adminMenuSections.querySelectorAll('.move-section-down').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const section = btn.getAttribute('data-section');
                    const idx = sectionsOrder.indexOf(section);
                    if (idx < sectionsOrder.length - 1) {
                        [sectionsOrder[idx], sectionsOrder[idx + 1]] = [sectionsOrder[idx + 1], sectionsOrder[idx]];
                        localStorage.setItem('adminSectionsOrder', JSON.stringify(sectionsOrder));
                        renderAdminMenu();
                        syncHeaderOrder();
                        syncPageSectionsOrder();
                    }
                });
            });
            
            // Gestion du clic sur les boutons de section
            adminMenuSections.querySelectorAll('.admin-menu-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    // Retire la classe active de tous les boutons
                    adminMenuSections.querySelectorAll('.admin-menu-btn').forEach(b => b.classList.remove('active'));
                    // Ajoute la classe active au bouton cliqué
                    btn.classList.add('active');
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
            
            // Ajouter le bouton de réinitialisation si pas déjà présent
            if (!adminMenuSections.querySelector('.reset-order-btn')) {
                adminMenuSections.appendChild(resetBtn);
                resetBtn.classList.add('reset-order-btn');
            }
        }
        
        // Fonction pour synchroniser le header avec l'ordre des sections
        function syncHeaderOrder() {
            const headerNav = document.getElementById('header-nav-links');
            if (!headerNav) return;
            
            // Récupérer tous les liens du header
            const links = Array.from(headerNav.querySelectorAll('a[data-section]'));
            const autresBtn = headerNav.querySelector('.relative.inline-block');
            
            // Réorganiser selon l'ordre de l'admin (exclure hero)
            const orderedLinks = sectionsOrder
                .filter(key => key !== 'hero')
                .map(key => links.find(link => link.getAttribute('data-section') === key))
                .filter(link => link !== undefined);
            
            // Vider et reconstruire
            headerNav.innerHTML = '';
            orderedLinks.forEach(link => headerNav.appendChild(link));
            if (autresBtn) headerNav.appendChild(autresBtn);
        }
        
        // Fonction pour synchroniser l'ordre des sections sur la page
        function syncPageSectionsOrder() {
            const mainContainer = document.querySelector('main > .container');
            if (!mainContainer) return;
            
            // Récupérer toutes les sections (exclure hero qui est hors conteneur)
            const sections = Array.from(mainContainer.querySelectorAll('section[id]'));
            
            // Réorganiser selon l'ordre de l'admin
            const orderedSections = sectionsOrder
                .filter(key => key !== 'hero')
                .map(key => sections.find(section => section.id === key))
                .filter(section => section !== undefined);
            
            // Réinsérer dans l'ordre
            orderedSections.forEach(section => mainContainer.appendChild(section));
        }
        
        // Génère le menu initial
        renderAdminMenu();
        syncHeaderOrder();
        syncPageSectionsOrder();
        
        // Affiche la première section par défaut
        const firstSection = sectionsOrder[0];
        if (firstSection) {
            const firstBtn = adminMenuSections.querySelector(`[data-section="${firstSection}"]`);
            if (firstBtn) firstBtn.classList.add('active');
            document.getElementById(`adminSection-${firstSection}`).classList.remove('hidden');
            renderAdminSectionGeneric(firstSection);
        }
    }
    
    // Synchroniser le header et les sections de la page au chargement
    const sectionsOrder = JSON.parse(localStorage.getItem('adminSectionsOrder')) || Object.keys(adminSectionsConfig);
    
    // Synchroniser le header
    const headerNav = document.getElementById('header-nav-links');
    if (headerNav) {
        const links = Array.from(headerNav.querySelectorAll('a[data-section]'));
        const autresBtn = headerNav.querySelector('.relative.inline-block');
        
        const orderedLinks = sectionsOrder
            .filter(key => key !== 'hero')
            .map(key => links.find(link => link.getAttribute('data-section') === key))
            .filter(link => link !== undefined);
        
        headerNav.innerHTML = '';
        orderedLinks.forEach(link => headerNav.appendChild(link));
        if (autresBtn) headerNav.appendChild(autresBtn);
    }
    
    // Synchroniser les sections de la page
    const mainContainer = document.querySelector('main > .container');
    if (mainContainer) {
        const sections = Array.from(mainContainer.querySelectorAll('section[id]'));
        
        const orderedSections = sectionsOrder
            .filter(key => key !== 'hero')
            .map(key => sections.find(section => section.id === key))
            .filter(section => section !== undefined);
        
        orderedSections.forEach(section => mainContainer.appendChild(section));
    }
});

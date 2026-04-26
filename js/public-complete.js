// js/public-complete.js
// Fonctions d'affichage complètes pour TOUTES les sections

import { apiGet } from './api.js';

// Fonction helper pour gérer la visibilité
function checkVisibility(sectionId, data) {
    const section = document.getElementById(sectionId);
    const isVisible = data.visible === true || data.visible === 'true' || data.visible === 1;
    if (section) {
        section.style.display = isVisible ? 'block' : 'none';
    }
    return isVisible;
}

// Fonction helper pour mettre à jour un titre
function updateTitle(titleId, title) {
    const titleElement = document.getElementById(titleId);
    if (titleElement && title) {
        titleElement.textContent = title;
    }
}

// 1. À propos
export async function displayAbout() {
    try {
        const data = await apiGet('about');
        console.log('Données About reçues:', data);
        
        if (!checkVisibility('about', data)) return;
        
        updateTitle('about-title', data.title);
        
        const aboutText = document.querySelector('#about .max-w-2xl p');
        if (aboutText && data.text) {
            aboutText.textContent = data.text;
        }
        
        console.log('Section About mise à jour');
    } catch (e) {
        console.error('Erreur chargement About:', e);
    }
}

// 2. Timeline
export async function displayTimeline() {
    try {
        const data = await apiGet('timeline');
        console.log('Données Timeline reçues:', data);
        
        if (!checkVisibility('timeline', data)) return;
        
        updateTitle('timeline-title', data.title);
        
        if (data.steps && Array.isArray(data.steps)) {
            const stepsContainer = document.getElementById('timeline-steps');
            if (stepsContainer) {
                stepsContainer.innerHTML = data.steps.map(step => 
                    `<div class="timeline-step bg-white p-4 rounded-lg shadow mb-4">${step}</div>`
                ).join('');
            }
        }
        
        console.log('Section Timeline mise à jour');
    } catch (e) {
        console.error('Erreur chargement Timeline:', e);
    }
}

// 3. Projects Carousel
export async function displayProjectsCarousel() {
    try {
        const data = await apiGet('projects-carousel');
        console.log('Données Projects reçues:', data);
        
        if (!checkVisibility('projects-carousel', data)) return;
        
        updateTitle('projects-title', data.title);
        
        if (data.projects && Array.isArray(data.projects)) {
            const projectsContainer = document.getElementById('projects-list');
            if (projectsContainer) {
                projectsContainer.innerHTML = data.projects.map(project => 
                    `<div class="bg-white p-6 rounded-lg shadow-xl">
                        <h3 class="text-xl font-semibold mb-2">${project}</h3>
                    </div>`
                ).join('');
            }
        }
        
        console.log('Section Projects mise à jour');
    } catch (e) {
        console.error('Erreur chargement Projects:', e);
    }
}

// 4. Stats
export async function displayStats() {
    try {
        const data = await apiGet('stats');
        console.log('Données Stats reçues:', data);
        
        if (!checkVisibility('stats', data)) return;
        
        updateTitle('stats-title', data.title);
        
        if (data.stats && Array.isArray(data.stats)) {
            const statsContainer = document.getElementById('stats-list');
            if (statsContainer) {
                statsContainer.innerHTML = data.stats.map(stat => 
                    `<div class="text-center">
                        <div class="text-4xl font-bold text-blue-600">${stat}</div>
                    </div>`
                ).join('');
            }
        }
        
        console.log('Section Stats mise à jour');
    } catch (e) {
        console.error('Erreur chargement Stats:', e);
    }
}

// 5. Services
export async function displayServices() {
    try {
        const data = await apiGet('services');
        console.log('Données Services reçues:', data);
        
        if (!checkVisibility('services', data)) return;
        
        updateTitle('services-title', data.title);
        
        if (data.services && Array.isArray(data.services)) {
            const servicesContainer = document.getElementById('services-list');
            if (servicesContainer) {
                servicesContainer.innerHTML = data.services.map(service => 
                    `<div class="bg-white p-6 rounded-lg shadow-xl">
                        <h3 class="text-xl font-semibold mb-2">${service}</h3>
                    </div>`
                ).join('');
            }
        }
        
        console.log('Section Services mise à jour');
    } catch (e) {
        console.error('Erreur chargement Services:', e);
    }
}

// 6. Shop
export async function displayShop() {
    try {
        const data = await apiGet('shop');
        console.log('Données Shop reçues:', data);
        
        if (!checkVisibility('shop', data)) return;
        
        updateTitle('shop-title', data.title);
        
        if (data.products && Array.isArray(data.products)) {
            const shopContainer = document.getElementById('shop-products');
            if (shopContainer) {
                shopContainer.innerHTML = data.products.map(product => 
                    `<div class="shop-card bg-white p-4 rounded-lg shadow">
                        <h4 class="font-semibold">${product}</h4>
                    </div>`
                ).join('');
            }
        }
        
        console.log('Section Shop mise à jour');
    } catch (e) {
        console.error('Erreur chargement Shop:', e);
    }
}

// 7. Blog
export async function displayBlogArticles() {
    try {
        const data = await apiGet('blog');
        console.log('Données Blog reçues:', data);
        
        if (!checkVisibility('blog', data)) return;
        
        updateTitle('blog-title', data.title);
        
        const articles = data.articles || [];
        const blog = document.getElementById('blogArticles');
        if (blog) {
            blog.innerHTML = articles.map(a => 
                `<article class="bg-white bg-opacity-70 rounded-lg shadow-xl p-6 glassmorphism animate-fadeInUp">
                    <h3 class="text-xl font-semibold mb-2">${a.title}</h3>
                    <a href="${a.link}" target="_blank" class="inline-block mt-4 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition">Lire l'article</a>
                </article>`
            ).join('');
        }
        
        console.log('Section Blog mise à jour');
    } catch (e) {
        console.error('Erreur chargement Blog:', e);
    }
}

// 8. Liens utiles
export async function displayLiensUtiles() {
    try {
        const data = await apiGet('liens-utiles');
        console.log('Données Liens utiles reçues:', data);
        
        if (!checkVisibility('liens-utiles', data)) return;
        
        updateTitle('liens-title', data.title);
        
        const links = data.links || [];
        const liens = document.getElementById('liensUtiles');
        if (liens) {
            let col1 = '', col2 = '';
            links.forEach((l,i) => {
                const el = `<li><a href="${l.url}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">${l.name}</a></li>`;
                if (i%2===0) col1+=el; else col2+=el;
            });
            liens.innerHTML = `<ul class="space-y-3">${col1}</ul><ul class="space-y-3">${col2}</ul>`;
        }
        
        console.log('Section Liens utiles mise à jour');
    } catch (e) {
        console.error('Erreur chargement Liens utiles:', e);
    }
}

// 9. Testimonials
export async function displayTestimonials() {
    try {
        const data = await apiGet('testimonials');
        console.log('Données Testimonials reçues:', data);
        
        if (!checkVisibility('testimonials', data)) return;
        
        updateTitle('testimonials-title', data.title);
        
        const testimonials = data.testimonials || [];
        const list = document.getElementById('testimonialList');
        if (list) {
            list.innerHTML = testimonials.map(t => 
                `<blockquote class="bg-white bg-opacity-70 rounded-lg shadow-xl p-6 mb-4">
                    <p class="italic">"${t.text}"</p>
                    <footer class="text-right font-semibold mt-2">— ${t.author}</footer>
                </blockquote>`
            ).join('');
        }
        
        console.log('Section Testimonials mise à jour');
    } catch (e) {
        console.error('Erreur chargement Testimonials:', e);
    }
}

// 10. FAQ
export async function displayFAQ() {
    try {
        const data = await apiGet('faq');
        console.log('Données FAQ reçues:', data);
        
        if (!checkVisibility('faq', data)) return;
        
        updateTitle('faq-title', data.title);
        
        const faq = data.faq || [];
        const list = document.getElementById('faqList');
        if (list) {
            list.innerHTML = faq.map(f => 
                `<div class="mb-4">
                    <h4 class="font-bold">Q. ${f.question}</h4>
                    <div class="text-gray-700">${f.answer}</div>
                </div>`
            ).join('');
        }
        
        console.log('Section FAQ mise à jour');
    } catch (e) {
        console.error('Erreur chargement FAQ:', e);
    }
}

// 11. Team
export async function displayTeam() {
    try {
        const data = await apiGet('team');
        console.log('Données Team reçues:', data);
        
        if (!checkVisibility('team', data)) return;
        
        updateTitle('team-title', data.title);
        
        const team = data.members || [];
        const list = document.getElementById('teamList');
        if (list) {
            list.innerHTML = team.map(m => 
                `<div class="bg-white rounded-lg shadow-xl p-6 text-center">
                    <img src="${m.photo||''}" alt="${m.name}" class="w-20 h-20 mx-auto rounded-full mb-2">
                    <div class="font-bold">${m.name}</div>
                    <div class="text-sm text-gray-600">${m.role}</div>
                </div>`
            ).join('');
        }
        
        console.log('Section Team mise à jour');
    } catch (e) {
        console.error('Erreur chargement Team:', e);
    }
}

// 12. Events
export async function displayEvents() {
    try {
        const data = await apiGet('events');
        console.log('Données Events reçues:', data);
        
        if (!checkVisibility('events', data)) return;
        
        updateTitle('events-title', data.title);
        
        const events = data.events || [];
        const list = document.getElementById('eventList');
        if (list) {
            list.innerHTML = events.map(ev => 
                `<div class="bg-white rounded-lg shadow-xl p-6 mb-4">
                    <div class="font-bold">${ev.title}</div>
                    <div class="text-gray-700">${ev.date||''}</div>
                    <div>${ev.desc||''}</div>
                </div>`
            ).join('');
        }
        
        console.log('Section Events mise à jour');
    } catch (e) {
        console.error('Erreur chargement Events:', e);
    }
}

// 13. Files
export async function displayFiles() {
    try {
        const data = await apiGet('files');
        console.log('Données Files reçues:', data);
        
        if (!checkVisibility('files', data)) return;
        
        updateTitle('files-title', data.title);
        
        const files = data.files || [];
        const list = document.getElementById('fileList');
        if (list) {
            list.innerHTML = files.map(f => 
                `<div class="mb-2">
                    <a href="${f.url}" download class="text-blue-600 hover:underline">
                        <i class="fas fa-file-alt mr-1"></i>${f.originalname}
                    </a>
                </div>`
            ).join('');
        }
        
        console.log('Section Files mise à jour');
    } catch (e) {
        console.error('Erreur chargement Files:', e);
    }
}

// 14. Social
export async function displaySocial() {
    try {
        const data = await apiGet('social');
        console.log('Données Social reçues:', data);
        
        if (!checkVisibility('social', data)) return;
        
        updateTitle('social-title', data.title);
        
        const social = data.social || [];
        const list = document.getElementById('socialLinks');
        if (list) {
            list.innerHTML = social.map(s => 
                `<a href="${s.url}" target="_blank" class="text-blue-600 text-2xl hover:text-blue-800">
                    <i class="${s.icon||'fab fa-link'}"></i>
                </a>`
            ).join('');
        }
        
        console.log('Section Social mise à jour');
    } catch (e) {
        console.error('Erreur chargement Social:', e);
    }
}

// 15. Donation
export async function displayDonationCustomText() {
    try {
        const data = await apiGet('don');
        console.log('Données Don reçues:', data);
        
        if (!checkVisibility('don', data)) return;
        
        updateTitle('don-title', data.title);
        
        const el = document.getElementById('donationCustomText');
        if (el && data.customText) {
            el.textContent = data.customText;
        }
        
        console.log('Section Don mise à jour');
    } catch (e) {
        console.error('Erreur chargement Don:', e);
    }
}

// 16. Contact
export async function displayContact() {
    try {
        const data = await apiGet('contact');
        console.log('Données Contact reçues:', data);
        
        if (!checkVisibility('contact', data)) return;
        
        updateTitle('contact-title', data.title);
        
        const emailElement = document.querySelector('#contact input[type="email"]');
        if (emailElement && data.email) {
            emailElement.placeholder = data.email;
        }
        
        console.log('Section Contact mise à jour');
    } catch (e) {
        console.error('Erreur chargement Contact:', e);
    }
}

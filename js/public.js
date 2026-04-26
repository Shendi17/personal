// js/public-complete.js
// Fonctions d'affichage complètes pour TOUTES les sections

import { apiGet } from './api.js';

// Fonction helper pour gérer la visibilité
function checkVisibility(sectionId, data) {
    const section = document.getElementById(sectionId);
    // Accepter : true, "true", 1, "on" (checkbox HTML)
    const isVisible = data.visible === true || data.visible === 'true' || data.visible === 1 || data.visible === 'on';
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

// 0. Hero (Section d'accueil)
export async function displayHero() {
    try {
        const data = await apiGet('hero');
        console.log('Données Hero reçues:', data);
        
        if (!checkVisibility('hero', data)) return;
        
        // Mettre à jour la photo
        const heroPhoto = document.getElementById('hero-photo');
        if (heroPhoto && data.photo) {
            heroPhoto.src = data.photo;
            heroPhoto.classList.remove('hidden');
        } else if (heroPhoto) {
            heroPhoto.classList.add('hidden');
        }
        
        // Gérer le carrousel à gauche
        const heroCarousel = document.getElementById('hero-carousel');
        const heroTitle = document.querySelector('#hero h1');
        const heroSubtitle = document.querySelector('#hero-content > p');
        
        if (data.carousel && Array.isArray(data.carousel) && data.carousel.length > 0) {
            const carouselImages = document.querySelector('.carousel-images');
            if (carouselImages) {
                // Créer les images du carrousel
                carouselImages.innerHTML = data.carousel.map((img, idx) => 
                    `<div class="carousel-image absolute inset-0 transition-opacity duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-0'}">
                        <img src="${img}" alt="Image ${idx + 1}" class="w-full h-full object-cover">
                    </div>`
                ).join('');
                
                // Afficher le carrousel
                heroCarousel.classList.remove('hidden');
                
                // Animation du carrousel
                let currentIndex = 0;
                setInterval(() => {
                    const images = carouselImages.querySelectorAll('.carousel-image');
                    images[currentIndex].classList.remove('opacity-100');
                    images[currentIndex].classList.add('opacity-0');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.remove('opacity-0');
                    images[currentIndex].classList.add('opacity-100');
                }, 5000); // Change toutes les 5 secondes
            }
        } else {
            // Pas de carrousel, masquer
            if (heroCarousel) heroCarousel.classList.add('hidden');
        }
        
        // Mettre à jour le nom
        if (heroTitle && data.name) {
            heroTitle.textContent = data.name;
        }
        
        // Mettre à jour le titre/poste
        if (heroSubtitle && (data.title || data.subtitle)) {
            const fullSubtitle = data.title && data.subtitle ? 
                `${data.title} | ${data.subtitle}` : 
                (data.title || data.subtitle);
            heroSubtitle.textContent = fullSubtitle;
        }
        
        // Mettre à jour le lien LinkedIn
        const linkedinLink = document.querySelector('#hero a[href*="linkedin"]');
        if (linkedinLink && data.linkedin) {
            linkedinLink.href = data.linkedin;
        }
        
        // Mettre à jour le lien GitHub
        const githubLink = document.querySelector('#hero a[href*="github"]');
        if (githubLink && data.github) {
            githubLink.href = data.github;
        }
        
        // Mettre à jour le lien de téléchargement du CV
        const cvLink = document.getElementById('cv-download-link');
        if (cvLink && data.cv) {
            cvLink.href = data.cv;
        }
        
        console.log('Section Hero mise à jour');
    } catch (e) {
        console.error('Erreur chargement Hero:', e);
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
                stepsContainer.innerHTML = data.steps.map(step => {
                    // Support ancien format (string) et nouveau format (objet)
                    if (typeof step === 'string') {
                        return `<li class="timeline-step">
                            <div class="timeline-dot"></div>
                            <div class="timeline-card">
                                <span class="timeline-date">-</span>
                                <h3 class="timeline-title">${step}</h3>
                            </div>
                        </li>`;
                    } else {
                        return `<li class="timeline-step">
                            <div class="timeline-dot"></div>
                            <div class="timeline-card">
                                <span class="timeline-date">${step.date || ''}</span>
                                <h3 class="timeline-title">${step.title}</h3>
                                ${step.company ? `<span class="timeline-where">${step.company}</span>` : ''}
                                ${step.description ? `<p class="timeline-desc">${step.description}</p>` : ''}
                            </div>
                        </li>`;
                    }
                }).join('');
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
            const projectsContainer = document.querySelector('#projects-carousel .carousel-track');
            if (projectsContainer) {
                projectsContainer.innerHTML = data.projects.map(project => {
                    // Support ancien format (string) et nouveau format (objet)
                    if (typeof project === 'string') {
                        return `<div class="carousel-slide glassmorphism shadow-2xl">
                            <div class="carousel-content">
                                <h3 class="carousel-title">${project}</h3>
                            </div>
                        </div>`;
                    } else {
                        return `<div class="carousel-slide glassmorphism shadow-2xl">
                            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="carousel-img">` : ''}
                            <div class="carousel-content">
                                <h3 class="carousel-title">${project.title}</h3>
                                ${project.description ? `<p class="carousel-desc">${project.description}</p>` : ''}
                                ${project.tags ? `<div class="carousel-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>` : ''}
                            </div>
                        </div>`;
                    }
                }).join('');
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
                statsContainer.innerHTML = data.stats.map(stat => {
                    // Support ancien format (string) et nouveau format (objet)
                    if (typeof stat === 'string') {
                        return `<div class="stat-card glassmorphism flex flex-col items-center p-8 shadow-xl">
                            <span class="stat-number text-4xl font-bold text-blue-600">${stat}</span>
                        </div>`;
                    } else {
                        const iconClass = stat.icon || 'fas fa-chart-line';
                        const colorClass = stat.color === 'green' ? 'text-green-500' : 
                                         stat.color === 'yellow' ? 'text-yellow-500' : 
                                         stat.color === 'purple' ? 'text-purple-500' : 
                                         'text-blue-500';
                        return `<div class="stat-card glassmorphism flex flex-col items-center p-8 shadow-xl">
                            <i class="${iconClass} text-3xl ${colorClass} mb-4"></i>
                            <span class="stat-number text-4xl font-bold text-gray-800 dark:text-white" data-target="${stat.number}">${stat.number}</span>
                            <span class="stat-label mt-2 text-gray-600 dark:text-gray-300">${stat.label || ''}</span>
                        </div>`;
                    }
                }).join('');
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
                servicesContainer.innerHTML = data.services.map(service => {
                    // Support ancien format (string) et nouveau format (objet)
                    if (typeof service === 'string') {
                        return `<div class="service-card glassmorphism flex flex-col items-center p-8 shadow-xl">
                            <h3 class="service-title font-bold text-xl mb-2">${service}</h3>
                        </div>`;
                    } else {
                        const iconClass = service.icon || 'fas fa-cog';
                        const colorClass = service.color === 'green' ? 'text-green-500' : 
                                         service.color === 'purple' ? 'text-purple-500' : 
                                         service.color === 'orange' ? 'text-orange-500' : 
                                         service.color === 'red' ? 'text-red-500' : 
                                         service.color === 'teal' ? 'text-teal-500' : 
                                         'text-blue-500';
                        return `<div class="service-card glassmorphism flex flex-col items-center p-8 shadow-xl">
                            <i class="${iconClass} text-4xl ${colorClass} mb-4"></i>
                            <h3 class="service-title font-bold text-xl mb-2">${service.title}</h3>
                            ${service.description ? `<p class="service-desc text-gray-700 dark:text-gray-300 text-center">${service.description}</p>` : ''}
                            ${service.features ? `<div class="mt-4 flex flex-wrap gap-2 justify-center">${service.features.map(f => `<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm">${f}</span>`).join('')}</div>` : ''}
                        </div>`;
                    }
                }).join('');
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
                shopContainer.innerHTML = data.products.map(product => {
                    // Support ancien format (string) et nouveau format (objet)
                    if (typeof product === 'string') {
                        return `<div class="shop-card glassmorphism flex flex-col items-center p-6 shadow-xl">
                            <h4 class="shop-title font-bold text-lg mb-2">${product}</h4>
                        </div>`;
                    } else {
                        return `<div class="shop-card glassmorphism flex flex-col items-center p-6 shadow-xl">
                            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="shop-img mb-4 rounded-xl shadow-md">` : ''}
                            <h3 class="shop-title font-bold text-lg mb-2">${product.name}</h3>
                            ${product.description ? `<p class="shop-desc text-center text-gray-700 dark:text-gray-300 mb-2">${product.description}</p>` : ''}
                            ${product.price ? `<span class="shop-price font-bold text-blue-600 dark:text-blue-400 text-lg mb-3">${product.price}</span>` : ''}
                            <button class="shop-btn bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-all">Commander</button>
                        </div>`;
                    }
                }).join('');
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
            blog.innerHTML = articles.map(a => {
                // Support ancien format (simple) et nouveau format (avec image et excerpt)
                if (typeof a === 'object' && (a.image || a.excerpt)) {
                    return `<article class="bg-white rounded-lg shadow-xl overflow-hidden glassmorphism animate-fadeInUp hover:shadow-2xl transition-all">
                        ${a.image ? `<img src="${a.image}" alt="${a.title}" class="w-full h-48 object-cover">` : ''}
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2 text-gray-800">${a.title}</h3>
                            ${a.date ? `<p class="text-sm text-gray-500 mb-3"><i class="fas fa-calendar-alt mr-1"></i>${a.date}</p>` : ''}
                            ${a.excerpt ? `<p class="text-gray-600 mb-4 line-clamp-3">${a.excerpt}</p>` : ''}
                            <a href="${a.link}" target="_blank" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </article>`;
                } else {
                    // Format ancien (simple)
                    return `<article class="bg-white bg-opacity-70 rounded-lg shadow-xl p-6 glassmorphism animate-fadeInUp">
                        <h3 class="text-xl font-semibold mb-2">${a.title || a}</h3>
                        ${a.link ? `<a href="${a.link}" target="_blank" class="inline-block mt-4 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition">Lire l'article</a>` : ''}
                    </article>`;
                }
            }).join('');
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

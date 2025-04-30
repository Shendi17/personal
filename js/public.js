// js/public.js
// Place ici toutes les fonctions d'affichage dynamique des contenus publics (displayBlogArticles, displayLiensUtiles, displayTestimonials, displayFAQ, displayTeam, displayEvents, displayFiles, displaySocial, displayDonationCustomText) dans ce module, et exporte-les.

import { apiGet } from './api.js';

export async function displayBlogArticles() {
    const articles = (await apiGet('blog')).articles || [];
    const blog = document.getElementById('blogArticles');
    if (blog) {
        blog.innerHTML = articles.map(a => `<article class="bg-white bg-opacity-70 rounded-lg shadow-xl p-6 glassmorphism animate-fadeInUp"><h3 class="text-xl font-semibold mb-2">${a.title}</h3><a href="${a.link}" target="_blank" class="inline-block mt-4 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition">Lire l’article</a></article>`).join('');
    }
}
export async function displayLiensUtiles() {
    const links = (await apiGet('liens-utiles')).links || [];
    const liens = document.getElementById('liensUtiles');
    if (liens) {
        let col1 = '', col2 = '';
        links.forEach((l,i) => {
            const el = `<li><a href="${l.url}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">${l.name}</a></li>`;
            if (i%2===0) col1+=el; else col2+=el;
        });
        liens.innerHTML = `<ul class="space-y-3">${col1}</ul><ul class="space-y-3">${col2}</ul>`;
    }
}
export async function displayTestimonials() {
    const testimonials = (await apiGet('testimonials')).testimonials || [];
    const list = document.getElementById('testimonialList');
    if (list) {
        list.innerHTML = testimonials.map(t => `<blockquote class="bg-white bg-opacity-70 rounded-lg shadow-xl p-6 mb-4"><p class="italic">“${t.text}”</p><footer class="text-right font-semibold mt-2">— ${t.author}</footer></blockquote>`).join('');
    }
}
export async function displayFAQ() {
    const faq = (await apiGet('faq')).faq || [];
    const list = document.getElementById('faqList');
    if (list) {
        list.innerHTML = faq.map(f => `<div class="mb-4"><h4 class="font-bold">Q. ${f.question}</h4><div class="text-gray-700">${f.answer}</div></div>`).join('');
    }
}
export async function displayTeam() {
    const team = (await apiGet('team')).members || [];
    const list = document.getElementById('teamList');
    if (list) {
        list.innerHTML = team.map(m => `<div class="bg-white rounded-lg shadow-xl p-6 text-center"><img src="${m.photo||''}" alt="${m.name}" class="w-20 h-20 mx-auto rounded-full mb-2"><div class="font-bold">${m.name}</div><div class="text-sm text-gray-600">${m.role}</div></div>`).join('');
    }
}
export async function displayEvents() {
    const events = (await apiGet('events')).events || [];
    const list = document.getElementById('eventList');
    if (list) {
        list.innerHTML = events.map(ev => `<div class="bg-white rounded-lg shadow-xl p-6 mb-4"><div class="font-bold">${ev.title}</div><div class="text-gray-700">${ev.date||''}</div><div>${ev.desc||''}</div></div>`).join('');
    }
}
export async function displayFiles() {
    const files = (await apiGet('files')).files || [];
    const list = document.getElementById('fileList');
    if (list) {
        list.innerHTML = files.map(f => `<div class="mb-2"><a href="${f.url}" download class="text-blue-600 hover:underline"><i class="fas fa-file-alt mr-1"></i>${f.originalname}</a></div>`).join('');
    }
}
export async function displaySocial() {
    const social = (await apiGet('social')).social || [];
    const list = document.getElementById('socialLinks');
    if (list) {
        list.innerHTML = social.map(s => `<a href="${s.url}" target="_blank" class="text-blue-600 text-2xl hover:text-blue-800"><i class="${s.icon||'fab fa-link'}"></i></a>`).join('');
    }
}
export async function displayDonationCustomText() {
    try {
        const data = await apiGet('don');
        const el = document.getElementById('donationCustomText');
        if (el && data && data.customText) {
            el.textContent = data.customText;
        }
    } catch (e) {}
}

// js/admin/admin-render.js
import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from '../api.js';
import { adminSectionsConfig } from './admin-config.js';

// Fonction pour générer les champs d'un objet
function renderObjectFields(obj, idx, fieldType, listName = '') {
    const fields = Object.keys(obj);
    return fields.map(key => {
        const value = obj[key];
        const fieldId = `field-${idx}-${key}`;
        
        // Gestion des tableaux (tags, features, etc.)
        if (Array.isArray(value)) {
            const arrayStr = value.join(', ');
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <input type="text" 
                       id="${fieldId}" 
                       class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                       value="${arrayStr}" 
                       placeholder="Séparez par des virgules"
                       data-idx="${idx}" 
                       data-key="${key}"
                       data-type="array">
                <small class="text-gray-500 text-xs">Séparez les éléments par des virgules</small>
            </div>`;
        }
        // Gestion des champs texte longs (description, text, answer)
        else if (key.includes('description') || key.includes('text') || key === 'answer' || key === 'desc') {
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <textarea id="${fieldId}" 
                          class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                          rows="3" 
                          data-idx="${idx}" 
                          data-key="${key}">${value || ''}</textarea>
            </div>`;
        }
        // Gestion des couleurs
        else if (key === 'color') {
            const colors = ['blue', 'green', 'yellow', 'purple', 'orange', 'red', 'teal'];
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <select id="${fieldId}" 
                        class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                        data-idx="${idx}" 
                        data-key="${key}">
                    ${colors.map(c => `<option value="${c}" ${value === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>`;
        }
        // Gestion des icônes pour les réseaux sociaux
        else if (key === 'icon' && listName === 'social') {
            const socialNetworks = [
                { name: 'Facebook', icon: 'fab fa-facebook' },
                { name: 'Twitter', icon: 'fab fa-twitter' },
                { name: 'LinkedIn', icon: 'fab fa-linkedin' },
                { name: 'Instagram', icon: 'fab fa-instagram' },
                { name: 'YouTube', icon: 'fab fa-youtube' },
                { name: 'TikTok', icon: 'fab fa-tiktok' },
                { name: 'GitHub', icon: 'fab fa-github' },
                { name: 'WhatsApp', icon: 'fab fa-whatsapp' },
                { name: 'Telegram', icon: 'fab fa-telegram' },
                { name: 'Discord', icon: 'fab fa-discord' },
                { name: 'Pinterest', icon: 'fab fa-pinterest' },
                { name: 'Snapchat', icon: 'fab fa-snapchat' },
                { name: 'Reddit', icon: 'fab fa-reddit' },
                { name: 'Twitch', icon: 'fab fa-twitch' },
                { name: 'Autre', icon: 'fas fa-link' }
            ];
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">Réseau social :</label>
                <select id="${fieldId}" 
                        class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                        data-idx="${idx}" 
                        data-key="${key}">
                    ${socialNetworks.map(s => `<option value="${s.icon}" ${value === s.icon ? 'selected' : ''}>${s.name} (${s.icon})</option>`).join('')}
                </select>
                <div class="mt-2 text-2xl text-center">
                    <i class="${value || 'fab fa-facebook'}" id="${fieldId}-preview"></i>
                </div>
                <small class="text-gray-500 text-xs">Sélectionne le réseau social pour auto-remplir l'icône</small>
            </div>`;
        }
        // Gestion des icônes normales
        else if (key === 'icon') {
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <input type="text" 
                       id="${fieldId}" 
                       class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                       value="${value || ''}" 
                       placeholder="ex: fas fa-briefcase"
                       data-idx="${idx}" 
                       data-key="${key}">
                <small class="text-gray-500 text-xs">Icône Font Awesome (ex: fas fa-star)</small>
            </div>`;
        }
        // Gestion des champs image/photo
        else if (key === 'image' || key === 'photo') {
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <div class="flex gap-2 items-start">
                    <input type="text" 
                           id="${fieldId}" 
                           class="flex-1 p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                           value="${value || ''}" 
                           placeholder="URL de l'image ou chemin local"
                           data-idx="${idx}" 
                           data-key="${key}">
                    <button type="button" 
                            class="upload-image-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
                            data-target="${fieldId}">
                        📤 Upload
                    </button>
                </div>
                ${value ? `<img src="${value}" alt="Aperçu" class="mt-2 max-w-xs h-32 object-cover rounded border">` : ''}
                <small class="text-gray-500 text-xs">URL externe ou clique "Upload" pour choisir une image</small>
            </div>`;
        }
        // Champs texte normaux
        else {
            return `<div class="mb-3">
                <label class="block text-sm font-semibold text-gray-700 mb-1">${key} :</label>
                <input type="text" 
                       id="${fieldId}" 
                       class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                       value="${value || ''}" 
                       data-idx="${idx}" 
                       data-key="${key}">
            </div>`;
        }
    }).join('');
}

// Helpers pour champs spéciaux
function getFieldHtml(field, value = '') {
    // Champs textarea
    if (field.toLowerCase().includes('content') || field.toLowerCase().includes('description') || field.toLowerCase().includes('text') || field.toLowerCase().includes('customtext')) {
        return `<label>${field} : <textarea name="${field}" rows="4">${value || ''}</textarea></label><br>`;
    }
    // Champs booléens/toggle (y compris "visible")
    if (field === 'visible' || field.startsWith('is') || field.startsWith('has')) {
        const isChecked = value === true || value === 'true' || value === 1;
        return `<label class="flex items-center gap-2">
            <input type="checkbox" name="${field}" ${isChecked ? 'checked' : ''} class="w-4 h-4">
            <span>${field === 'visible' ? 'Section visible' : field}</span>
        </label><br>`;
    }
    // Champs de liste dynamique (ex: steps, projects, stats, services, products, articles, links, testimonials, faq, members, events, files, social, carousel)
    const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social','carousel'];
    if (listFields.includes(field)) {
        return `<div class="admin-list-field" data-list-field="${field}">
            <label>${field} :</label>
            <div class="admin-list-items"></div>
            <button type="button" class="add-list-item" data-list-field="${field}">Ajouter</button>
        </div>`;
    }
    // Champ email
    if (field.toLowerCase().includes('email')) {
        return `<label>${field} : <input type="email" name="${field}" value="${value || ''}" /></label><br>`;
    }
    // Champs photo/image avec bouton upload
    if (field === 'photo' || field === 'image') {
        return `<div class="mb-4">
            <label class="block font-semibold mb-2">${field} :</label>
            <div class="flex gap-2 items-start">
                <input type="text" 
                       name="${field}" 
                       id="field-${field}"
                       class="flex-1 p-2 border border-gray-300 rounded focus:border-blue-500" 
                       value="${value || ''}" 
                       placeholder="URL de l'image ou chemin local" />
                <button type="button" 
                        class="upload-image-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
                        data-target="field-${field}">
                    📤 Upload
                </button>
            </div>
            ${value ? `<img src="${value}" alt="Aperçu" class="mt-2 max-w-xs h-32 object-cover rounded border">` : ''}
            <small class="text-gray-500 text-xs block mt-1">URL externe ou clique "Upload" pour choisir une image</small>
        </div>`;
    }
    // Champ CV avec bouton upload (accepte PDF et documents)
    if (field === 'cv') {
        return `<div class="mb-4">
            <label class="block font-semibold mb-2">CV (PDF) :</label>
            <div class="flex gap-2 items-start">
                <input type="text" 
                       name="${field}" 
                       id="field-${field}"
                       class="flex-1 p-2 border border-gray-300 rounded focus:border-blue-500" 
                       value="${value || ''}" 
                       placeholder="URL du CV ou chemin local" />
                <button type="button" 
                        class="upload-cv-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                        data-target="field-${field}">
                    📄 Upload PDF
                </button>
            </div>
            ${value ? `<a href="${value}" target="_blank" class="inline-block mt-2 text-blue-600 hover:underline">📄 Voir le CV actuel</a>` : ''}
            <small class="text-gray-500 text-xs block mt-1">URL externe ou clique "Upload PDF" pour choisir un fichier PDF</small>
        </div>`;
    }
    // Champ par défaut (texte)
    return `<label>${field} : <input type="text" name="${field}" value="${value || ''}" /></label><br>`;
}

// Fonction générique pour afficher une section admin dynamique
export async function renderAdminSectionGeneric(section) {
    const config = adminSectionsConfig[section];
    const container = document.getElementById(`adminSection-${section}`);
    if (!container || !config) return;
    // Charger les données existantes
    const data = await apiGet(section);
    // Génère le formulaire avec gestion des champs spéciaux
    container.innerHTML = `<form id="adminForm-${section}">
        ${config.fields.map(f => getFieldHtml(f, data[f])).join('')}
        <button type="submit">Enregistrer</button>
    </form>`;
    // Gestion des listes dynamiques
    config.fields.forEach(f => {
        const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social','carousel'];
        if (listFields.includes(f)) {
            const listDiv = container.querySelector(`[data-list-field='${f}'] .admin-list-items`);
            const items = Array.isArray(data[f]) ? data[f] : [];
            
            // Stocker items dans le DOM pour y accéder lors de la soumission
            listDiv.setAttribute('data-items', JSON.stringify(items));
            
            function renderList() {
                // Mettre à jour data-items à chaque rendu
                listDiv.setAttribute('data-items', JSON.stringify(items));
                listDiv.innerHTML = items.map((item, idx) => {
                    // Si l'item est un objet, créer des champs individuels
                    if (typeof item === 'object' && item !== null) {
                        return `<div class="admin-list-item bg-white border-2 border-gray-200 p-4 rounded-lg mb-3 shadow-sm">
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-sm font-bold text-blue-600">Item ${idx + 1}</span>
                                <button type="button" class="remove-list-item text-red-600 hover:text-red-800 font-semibold" data-idx="${idx}">
                                    <i class="fas fa-trash"></i> Supprimer
                                </button>
                            </div>
                            ${renderObjectFields(item, idx, f, f)}
                        </div>`;
                    } else {
                        // Pour le carrousel, afficher un input avec bouton upload
                        if (f === 'carousel') {
                            return `<div class="admin-list-item bg-white border border-gray-300 p-3 rounded mb-2">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-semibold text-gray-600">Photo ${idx + 1}</span>
                                    <button type="button" class="remove-list-item text-red-600 hover:text-red-800 font-semibold" data-idx="${idx}">
                                        <i class="fas fa-trash"></i> Supprimer
                                    </button>
                                </div>
                                <div class="flex gap-2 items-start">
                                    <input type="text" 
                                           id="carousel-${idx}" 
                                           class="flex-1 p-2 border border-gray-300 rounded" 
                                           value="${item}" 
                                           data-idx="${idx}" 
                                           placeholder="URL de l'image" />
                                    <button type="button" 
                                            class="upload-carousel-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
                                            data-idx="${idx}"
                                            data-target="carousel-${idx}">
                                        📤 Upload
                                    </button>
                                </div>
                                ${item ? `<img src="${item}" alt="Aperçu" class="mt-2 w-full h-32 object-cover rounded border">` : ''}
                            </div>`;
                        } else {
                            // Sinon, afficher un input texte simple
                            return `<div class="admin-list-item flex gap-2 mb-2">
                                <input type="text" class="flex-1 p-2 border rounded" value="${item}" data-idx="${idx}" />
                                <button type="button" class="remove-list-item text-red-600 hover:text-red-800 px-3" data-idx="${idx}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>`;
                        }
                    }
                }).join('');
                
                // Gestion suppression
                listDiv.querySelectorAll('.remove-list-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = +btn.getAttribute('data-idx');
                        items.splice(idx, 1);
                        renderList();
                    });
                });
                
                // Gestion édition des champs simples (strings)
                listDiv.querySelectorAll('input[type="text"]:not([data-key])').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const idx = +input.getAttribute('data-idx');
                        items[idx] = input.value;
                    });
                });
                
                // Gestion édition des champs d'objets
                listDiv.querySelectorAll('input[data-key], textarea[data-key], select[data-key]').forEach(field => {
                    const updateField = () => {
                        const idx = +field.getAttribute('data-idx');
                        const key = field.getAttribute('data-key');
                        const isArray = field.getAttribute('data-type') === 'array';
                        
                        if (isArray) {
                            // Convertir la chaîne en tableau
                            items[idx][key] = field.value.split(',').map(s => s.trim()).filter(s => s);
                        } else {
                            items[idx][key] = field.value;
                        }
                        
                        // Mettre à jour data-items
                        listDiv.setAttribute('data-items', JSON.stringify(items));
                        
                        // Mettre à jour l'aperçu de l'icône si c'est un select d'icône sociale
                        if (key === 'icon' && field.tagName === 'SELECT') {
                            const preview = document.getElementById(field.id + '-preview');
                            if (preview) {
                                preview.className = field.value;
                            }
                        }
                    };
                    
                    // Écouter les événements input, change et blur
                    field.addEventListener('input', updateField);
                    field.addEventListener('change', updateField);
                    field.addEventListener('blur', updateField);
                });
                
                // Gestion des boutons d'upload pour le carrousel
                listDiv.querySelectorAll('.upload-carousel-btn').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const idx = +btn.getAttribute('data-idx');
                        const targetId = btn.getAttribute('data-target');
                        const targetInput = document.getElementById(targetId);
                        
                        // Créer un input file temporaire
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = 'image/*';
                        
                        fileInput.onchange = async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            
                            // Afficher un indicateur de chargement
                            btn.textContent = '⏳ Upload...';
                            btn.disabled = true;
                            
                            try {
                                // Créer FormData pour l'upload
                                const formData = new FormData();
                                formData.append('image', file);
                                
                                // Upload via l'API
                                const response = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                    // Mettre à jour le champ et l'item
                                    targetInput.value = data.url;
                                    items[idx] = data.url;
                                    
                                    // Rafraîchir l'affichage pour montrer l'aperçu
                                    renderList();
                                    
                                    alert('✅ Image uploadée avec succès !');
                                } else {
                                    alert('❌ Erreur lors de l\'upload : ' + data.error);
                                }
                            } catch (error) {
                                alert('❌ Erreur lors de l\'upload : ' + error.message);
                            } finally {
                                btn.textContent = '📤 Upload';
                                btn.disabled = false;
                            }
                        };
                        
                        fileInput.click();
                    });
                });
            }
            renderList();
            
            // Ajouter un item
            container.querySelector(`.add-list-item[data-list-field='${f}']`).addEventListener('click', () => {
                // Déterminer le type d'item à ajouter selon la section
                let newItem = '';
                if (f === 'steps') newItem = {date: '', title: '', company: '', description: '', icon: 'fas fa-briefcase'};
                else if (f === 'projects') newItem = {title: '', description: '', image: '', tags: []};
                else if (f === 'stats') newItem = {number: '', label: '', icon: 'fas fa-chart-line', color: 'blue'};
                else if (f === 'services') newItem = {title: '', description: '', icon: 'fas fa-cog', color: 'blue', features: []};
                else if (f === 'products') newItem = {name: '', description: '', price: '', image: ''};
                else if (f === 'articles') newItem = {title: '', excerpt: '', image: '', link: '', date: '', author: ''};
                else if (f === 'links') newItem = {name: '', url: ''};
                else if (f === 'testimonials') newItem = {text: '', author: ''};
                else if (f === 'faq') newItem = {question: '', answer: ''};
                else if (f === 'members') newItem = {name: '', role: '', photo: ''};
                else if (f === 'events') newItem = {title: '', date: '', desc: ''};
                else if (f === 'files') newItem = {originalname: '', url: ''};
                else if (f === 'social') newItem = {url: '', icon: 'fab fa-facebook'};
                
                items.push(newItem);
                renderList();
            });
        }
    });
    
    // Gestion des boutons d'upload d'images
    container.querySelectorAll('.upload-image-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            // Créer un input file temporaire
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                // Afficher un indicateur de chargement
                btn.textContent = '⏳ Upload...';
                btn.disabled = true;
                
                try {
                    // Créer FormData pour l'upload
                    const formData = new FormData();
                    formData.append('image', file);
                    
                    // Upload via l'API
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // Mettre à jour le champ avec l'URL
                        targetInput.value = data.url;
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        
                        // Afficher un aperçu
                        const preview = targetInput.parentElement.nextElementSibling;
                        if (preview && preview.tagName === 'IMG') {
                            preview.src = data.url;
                        } else {
                            const img = document.createElement('img');
                            img.src = data.url;
                            img.alt = 'Aperçu';
                            img.className = 'mt-2 max-w-xs h-32 object-cover rounded border';
                            targetInput.parentElement.parentElement.insertBefore(img, targetInput.parentElement.nextSibling);
                        }
                        
                        alert('✅ Image uploadée avec succès !');
                    } else {
                        alert('❌ Erreur lors de l\'upload : ' + data.error);
                    }
                } catch (error) {
                    alert('❌ Erreur lors de l\'upload : ' + error.message);
                } finally {
                    btn.textContent = '📤 Upload';
                    btn.disabled = false;
                }
            };
            
            fileInput.click();
        });
    });
    
    // Gestion des boutons d'upload de CV (PDF)
    container.querySelectorAll('.upload-cv-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            // Créer un input file temporaire
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,application/pdf';
            
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                // Vérifier que c'est un PDF
                if (!file.type.includes('pdf')) {
                    alert('❌ Veuillez sélectionner un fichier PDF');
                    return;
                }
                
                // Afficher un indicateur de chargement
                btn.textContent = '⏳ Upload...';
                btn.disabled = true;
                
                try {
                    // Créer FormData pour l'upload
                    const formData = new FormData();
                    formData.append('image', file); // Utilise le même endpoint
                    
                    // Upload via l'API
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // Mettre à jour le champ avec l'URL
                        targetInput.value = data.url;
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        
                        alert('✅ CV uploadé avec succès !');
                    } else {
                        alert('❌ Erreur lors de l\'upload : ' + data.error);
                    }
                } catch (error) {
                    alert('❌ Erreur lors de l\'upload : ' + error.message);
                } finally {
                    btn.textContent = '📄 Upload PDF';
                    btn.disabled = false;
                }
            };
            
            fileInput.click();
        });
    });
    
    // Gestion de la soumission
    container.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = {};
        config.fields.forEach(f => {
            // Gestion des listes dynamiques
            const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social','carousel'];
            if (listFields.includes(f)) {
                const listDiv = container.querySelector(`[data-list-field='${f}'] .admin-list-items`);
                // Récupérer les items depuis data-items (format correct avec objets)
                const itemsData = listDiv.getAttribute('data-items');
                if (itemsData) {
                    formData[f] = JSON.parse(itemsData);
                } else {
                    // Fallback vers l'ancienne méthode si data-items n'existe pas
                    formData[f] = Array.from(listDiv.querySelectorAll('input[type="text"]')).map(input => input.value).filter(v => v);
                }
            } else if (f.toLowerCase().includes('content') || f.toLowerCase().includes('description') || f.toLowerCase().includes('texte')) {
                formData[f] = container.querySelector(`[name='${f}']`).value;
            } else if (f === 'visible' || f.startsWith('is') || f.startsWith('has')) {
                formData[f] = container.querySelector(`[name='${f}']`).checked;
            } else {
                const input = container.querySelector(`[name='${f}']`);
                if (input) formData[f] = input.value;
            }
        });
        // Remplace apiPost par apiPatch pour l'enregistrement des modifications admin
        try {
            await apiPatch(section, formData);
            alert('Données enregistrées avec succès !');
            
            // Rafraîchir la section modifiée au lieu de recharger toute la page
            await refreshPublicSection(section);
            
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            alert('Erreur lors de l\'enregistrement des données. Vérifiez la console pour plus de détails.');
        }
    });
}

// Fonction pour rafraîchir une section publique après modification
async function refreshPublicSection(section) {
    // Import dynamique des fonctions d'affichage
    const { 
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
    } = await import('../public.js');
    
    // Mapping des sections vers leurs fonctions d'affichage
    const refreshFunctions = {
        'hero': displayHero,
        'about': displayAbout,
        'timeline': displayTimeline,
        'projects-carousel': displayProjectsCarousel,
        'stats': displayStats,
        'services': displayServices,
        'shop': displayShop,
        'blog': displayBlogArticles,
        'liens-utiles': displayLiensUtiles,
        'testimonials': displayTestimonials,
        'faq': displayFAQ,
        'team': displayTeam,
        'events': displayEvents,
        'files': displayFiles,
        'social': displaySocial,
        'don': displayDonationCustomText,
        'contact': displayContact
    };
    
    // Appeler la fonction de rafraîchissement correspondante
    const refreshFn = refreshFunctions[section];
    if (refreshFn) {
        await refreshFn();
        console.log(`Section "${section}" rafraîchie avec succès`);
    } else {
        console.warn(`Aucune fonction de rafraîchissement trouvée pour la section "${section}"`);
    }
}

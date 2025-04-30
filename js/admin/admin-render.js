// js/admin/admin-render.js
import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from '../api.js';
import { adminSectionsConfig } from './admin-config.js';

// Helpers pour champs spéciaux
function getFieldHtml(field, value = '') {
    // Champs textarea
    if (field.toLowerCase().includes('content') || field.toLowerCase().includes('description') || field.toLowerCase().includes('texte')) {
        return `<label>${field} : <textarea name="${field}" rows="4">${value || ''}</textarea></label><br>`;
    }
    // Champs booléens/toggle
    if (field.startsWith('is') || field.startsWith('has')) {
        return `<label>${field} : <input type="checkbox" name="${field}" ${value ? 'checked' : ''}></label><br>`;
    }
    // Champs de liste dynamique (ex: steps, projects, stats, services, products, articles, links, testimonials, faq, members, events, files, social)
    const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social'];
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
        const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social'];
        if (listFields.includes(f)) {
            const listDiv = container.querySelector(`[data-list-field='${f}'] .admin-list-items`);
            const items = Array.isArray(data[f]) ? data[f] : [];
            function renderList() {
                listDiv.innerHTML = items.map((item, idx) =>
                    `<div class="admin-list-item">
                        <input type="text" value="${item}" data-idx="${idx}" />
                        <button type="button" class="remove-list-item" data-idx="${idx}">Supprimer</button>
                    </div>`
                ).join('');
                // Gestion suppression
                listDiv.querySelectorAll('.remove-list-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = +btn.getAttribute('data-idx');
                        items.splice(idx, 1);
                        renderList();
                    });
                });
                // Gestion édition
                listDiv.querySelectorAll('input[type="text"]').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const idx = +input.getAttribute('data-idx');
                        items[idx] = input.value;
                    });
                });
            }
            renderList();
            // Ajouter un item
            container.querySelector(`.add-list-item[data-list-field='${f}']`).addEventListener('click', () => {
                items.push('');
                renderList();
            });
        }
    });
    // Gestion de la soumission
    container.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = {};
        config.fields.forEach(f => {
            // Gestion des listes dynamiques
            const listFields = ['steps','projects','stats','services','products','articles','links','testimonials','faq','members','events','files','social'];
            if (listFields.includes(f)) {
                const listDiv = container.querySelector(`[data-list-field='${f}'] .admin-list-items`);
                formData[f] = Array.from(listDiv.querySelectorAll('input[type="text"]')).map(input => input.value).filter(v => v);
            } else if (f.toLowerCase().includes('content') || f.toLowerCase().includes('description') || f.toLowerCase().includes('texte')) {
                formData[f] = container.querySelector(`[name='${f}']`).value;
            } else if (f.startsWith('is') || f.startsWith('has')) {
                formData[f] = container.querySelector(`[name='${f}']`).checked;
            } else {
                const input = container.querySelector(`[name='${f}']`);
                if (input) formData[f] = input.value;
            }
        });
        // Remplace apiPost par apiPatch pour l'enregistrement des modifications admin
        await apiPatch(section, formData);
        alert('Données enregistrées !');
    });
}

// js/api.js
// Utilise le même domaine que la page actuelle (grâce au proxy Apache)
export const API_BASE = window.location.origin;

export async function apiGet(entity) {
    const r = await fetch(`${API_BASE}/api/${entity}`);
    return r.json();
}
export async function apiPost(entity, data) {
    const r = await fetch(`${API_BASE}/api/${entity}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return r.json();
}
export async function apiPut(entity, idx, data) {
    const r = await fetch(`${API_BASE}/api/${entity}/${idx}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return r.json();
}
export async function apiDelete(entity, idx) {
    const r = await fetch(`${API_BASE}/api/${entity}/${idx}`, { method: 'DELETE' });
    return r.json();
}
export async function apiPatch(entity, data) {
    const r = await fetch(`${API_BASE}/api/${entity}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return r.json();
}

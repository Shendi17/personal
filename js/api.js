// js/api.js
export const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3001'
    : 'http://waohost:3001';

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

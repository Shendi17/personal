// js/admin/admin-config.js
export const adminSectionsConfig = {
    hero: {
        label: 'Section Hero (Accueil)',
        fields: ['name', 'title', 'subtitle', 'photo', 'carousel', 'cv', 'linkedin', 'github', 'visible'],
        listKey: 'carousel'
    },
    about: {
        label: 'À propos',
        fields: ['title', 'text', 'visible'],
        listKey: null
    },
    timeline: {
        label: 'Timeline',
        fields: ['title', 'visible', 'steps'],
        listKey: 'steps'
    },
    'projects-carousel': {
        label: 'Réalisations',
        fields: ['title', 'visible', 'projects'],
        listKey: 'projects',
        hasImages: true
    },
    stats: {
        label: 'Statistiques',
        fields: ['title', 'visible', 'stats'],
        listKey: 'stats'
    },
    services: {
        label: 'Services',
        fields: ['title', 'visible', 'services'],
        listKey: 'services'
    },
    shop: {
        label: 'Boutique',
        fields: ['title', 'visible', 'products'],
        listKey: 'products'
    },
    don: {
        label: 'Don',
        fields: ['title', 'visible', 'customText'],
        listKey: null
    },
    contact: {
        label: 'Contact',
        fields: ['title', 'visible', 'email'],
        listKey: null
    },
    blog: {
        label: 'Blog',
        fields: ['title', 'visible', 'articles'],
        listKey: 'articles'
    },
    'liens-utiles': {
        label: 'Liens utiles',
        fields: ['title', 'visible', 'links'],
        listKey: 'links'
    },
    testimonials: {
        label: 'Témoignages',
        fields: ['title', 'visible', 'testimonials'],
        listKey: 'testimonials'
    },
    faq: {
        label: 'FAQ',
        fields: ['title', 'visible', 'faq'],
        listKey: 'faq'
    },
    team: {
        label: 'Équipe',
        fields: ['title', 'visible', 'members'],
        listKey: 'members'
    },
    events: {
        label: 'Événements',
        fields: ['title', 'visible', 'events'],
        listKey: 'events'
    },
    files: {
        label: 'Fichiers',
        fields: ['title', 'visible', 'files'],
        listKey: 'files'
    },
    social: {
        label: 'Réseaux sociaux',
        fields: ['title', 'visible', 'social'],
        listKey: 'social',
        itemFields: ['url', 'icon']
    }
};

// js/admin/admin-config.js
export const adminSectionsConfig = {
    about: {
        label: 'À propos',
        fields: ['title', 'content'],
        listKey: null
    },
    timeline: {
        label: 'Timeline',
        fields: ['title', 'steps'],
        listKey: 'steps'
    },
    'projects-carousel': {
        label: 'Réalisations',
        fields: ['title', 'projects'],
        listKey: 'projects'
    },
    stats: {
        label: 'Statistiques',
        fields: ['title', 'stats'],
        listKey: 'stats'
    },
    services: {
        label: 'Services',
        fields: ['title', 'services'],
        listKey: 'services'
    },
    shop: {
        label: 'Boutique',
        fields: ['title', 'products'],
        listKey: 'products'
    },
    don: {
        label: 'Don',
        fields: ['title', 'customText'],
        listKey: null
    },
    contact: {
        label: 'Contact',
        fields: ['title', 'email'],
        listKey: null
    },
    blog: {
        label: 'Blog',
        fields: ['title', 'articles'],
        listKey: 'articles'
    },
    'liens-utiles': {
        label: 'Liens utiles',
        fields: ['title', 'links'],
        listKey: 'links'
    },
    testimonials: {
        label: 'Témoignages',
        fields: ['title', 'testimonials'],
        listKey: 'testimonials'
    },
    faq: {
        label: 'FAQ',
        fields: ['title', 'faq'],
        listKey: 'faq'
    },
    team: {
        label: 'Équipe',
        fields: ['title', 'members'],
        listKey: 'members'
    },
    events: {
        label: 'Événements',
        fields: ['title', 'events'],
        listKey: 'events'
    },
    files: {
        label: 'Fichiers',
        fields: ['title', 'files'],
        listKey: 'files'
    },
    social: {
        label: 'Réseaux sociaux',
        fields: ['title', 'social'],
        listKey: 'social'
    }
};

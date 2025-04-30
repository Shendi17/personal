// Script de régénération de db.json complet pour backend
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const baseDb = {
  "about": {"title": "", "text": "", "visible": true},
  "timeline": {"title": "", "visible": true, "steps": []},
  "projects-carousel": {"title": "", "visible": true, "projects": []},
  "stats": {"title": "", "visible": true, "stats": []},
  "services": {"title": "", "visible": true, "services": []},
  "shop": {"title": "", "visible": true, "products": []},
  "don": {"title": "", "visible": true, "customText": "", "donations": []},
  "contact": {"title": "", "visible": true, "email": ""},
  "blog": {"title": "", "visible": true, "articles": []},
  "liens-utiles": {"title": "", "visible": true, "links": []},
  "testimonials": {"title": "", "visible": true, "testimonials": []},
  "faq": {"title": "", "visible": true, "faq": []},
  "team": {"title": "", "visible": true, "members": []},
  "events": {"title": "", "visible": true, "events": []},
  "files": {"title": "", "visible": true, "files": []},
  "social": {"title": "", "visible": true, "social": []}
};
fs.writeFileSync(dbPath, JSON.stringify(baseDb, null, 2), 'utf-8');
console.log('db.json régénéré avec succès.');

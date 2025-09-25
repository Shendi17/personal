// Backend Express pour site personnel (API gestion complète)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Low, JSONFile } = require('lowdb');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001;

// DB setup
const dbFile = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({
    products: [], articles: [], links: [], testimonials: [], faq: [], team: [], events: [], files: [], social: [], donation: { customText: '', donations: [] }
  }, null, 2));
}
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

app.use(cors());
app.use(bodyParser.json());

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Multer pour upload de fichiers
const upload = multer({ dest: path.join(__dirname, 'uploads/') });
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Middleware pour charger la DB
app.use(async (req, res, next) => {
  await db.read();
  req.db = db;
  next();
});

// --- Ajout du champ "visible" pour chaque section et gestion PATCH générique ---
const sectionDefaults = {
  about: { title: '', text: '', visible: true },
  timeline: { title: '', visible: true, steps: [] },
  'projects-carousel': { title: '', visible: true, projects: [] },
  stats: { title: '', visible: true, stats: [] },
  services: { title: '', visible: true, services: [] },
  shop: { title: '', visible: true, products: [] },
  don: { title: '', visible: true, customText: '', donations: [] },
  contact: { title: '', visible: true, email: '' },
  blog: { title: '', visible: true, articles: [] },
  'liens-utiles': { title: '', visible: true, links: [] },
  testimonials: { title: '', visible: true, testimonials: [] },
  faq: { title: '', visible: true, faq: [] },
  team: { title: '', visible: true, members: [] },
  events: { title: '', visible: true, events: [] },
  files: { title: '', visible: true, files: [] },
  social: { title: '', visible: true, social: [] }
};

// --- Initialisation (à l’ouverture du serveur) : corrige crash si db.data est null ---
(async () => {
  await db.read();
  if (!db.data || typeof db.data !== 'object') db.data = {};
  for (const section in sectionDefaults) {
    if (!db.data[section]) db.data[section] = sectionDefaults[section];
  }
  await db.write();
})();

// PATCH générique pour modifier titre/visible/texte d’une section
app.patch('/api/:section', async (req, res) => {
  const section = req.params.section;
  await db.read();
  if (!db.data[section]) return res.status(404).json({ success: false, error: 'Section inconnue' });
  Object.assign(db.data[section], req.body);
  await db.write();
  res.json({ success: true, data: db.data[section] });
});

// PATCH pour ajouter/supprimer projets dans projects-carousel
app.patch('/api/projects-carousel', async (req, res) => {
  await db.read();
  if (req.body.projectsAdd) {
    db.data['projects-carousel'].projects.push(req.body.projectsAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.projectsRemove === 'number') {
    db.data['projects-carousel'].projects.splice(req.body.projectsRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data['projects-carousel'], req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer chiffres dans stats
app.patch('/api/stats', async (req, res) => {
  await db.read();
  if (req.body.statsAdd) {
    db.data.stats.stats.push(req.body.statsAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.statsRemove === 'number') {
    db.data.stats.stats.splice(req.body.statsRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.stats, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer services dans services
app.patch('/api/services', async (req, res) => {
  await db.read();
  if (req.body.servicesAdd) {
    db.data.services.services.push(req.body.servicesAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.servicesRemove === 'number') {
    db.data.services.services.splice(req.body.servicesRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.services, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer produits dans shop
app.patch('/api/shop', async (req, res) => {
  await db.read();
  if (req.body.productsAdd) {
    db.data.shop.products.push(req.body.productsAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.productsRemove === 'number') {
    db.data.shop.products.splice(req.body.productsRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.shop, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer liens dans liens-utiles
app.patch('/api/liens-utiles', async (req, res) => {
  await db.read();
  if (req.body.linksAdd) {
    db.data['liens-utiles'].links.push(req.body.linksAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.linksRemove === 'number') {
    db.data['liens-utiles'].links.splice(req.body.linksRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data['liens-utiles'], req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer témoignages dans testimonials
app.patch('/api/testimonials', async (req, res) => {
  await db.read();
  if (req.body.testimonialsAdd) {
    db.data.testimonials.testimonials.push(req.body.testimonialsAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.testimonialsRemove === 'number') {
    db.data.testimonials.testimonials.splice(req.body.testimonialsRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.testimonials, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer questions dans faq
app.patch('/api/faq', async (req, res) => {
  await db.read();
  if (req.body.faqAdd) {
    db.data.faq.faq.push(req.body.faqAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.faqRemove === 'number') {
    db.data.faq.faq.splice(req.body.faqRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.faq, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer membres dans team
app.patch('/api/team', async (req, res) => {
  await db.read();
  if (req.body.membersAdd) {
    db.data.team.members.push(req.body.membersAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.membersRemove === 'number') {
    db.data.team.members.splice(req.body.membersRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.team, req.body);
  await db.write();
  res.json({ success: true });
});

// CRUD pour les étapes du parcours (timeline)
app.post('/api/timeline/steps', async (req, res) => {
  await db.read();
  db.data.timeline.steps.push(req.body);
  await db.write();
  res.json({ success: true });
});
app.delete('/api/timeline/steps/:index', async (req, res) => {
  await db.read();
  db.data.timeline.steps.splice(Number(req.params.index), 1);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer événements dans events
app.patch('/api/events', async (req, res) => {
  await db.read();
  if (req.body.eventsAdd) {
    db.data.events.events.push(req.body.eventsAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.eventsRemove === 'number') {
    db.data.events.events.splice(req.body.eventsRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.events, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer fichiers dans files
app.patch('/api/files', async (req, res) => {
  await db.read();
  if (req.body.filesAdd) {
    db.data.files.files.push(req.body.filesAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.filesRemove === 'number') {
    db.data.files.files.splice(req.body.filesRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.files, req.body);
  await db.write();
  res.json({ success: true });
});

// PATCH pour ajouter/supprimer réseaux dans social
app.patch('/api/social', async (req, res) => {
  await db.read();
  if (req.body.socialAdd) {
    db.data.social.social.push(req.body.socialAdd);
    await db.write();
    return res.json({ success: true });
  }
  if (typeof req.body.socialRemove === 'number') {
    db.data.social.social.splice(req.body.socialRemove, 1);
    await db.write();
    return res.json({ success: true });
  }
  // PATCH générique (titre, visible...)
  Object.assign(db.data.social, req.body);
  await db.write();
  res.json({ success: true });
});

// Route GET générique pour toutes les sections (about, timeline, projects-carousel, stats, services, shop, don, contact, blog, liens-utiles, testimonials, faq, team, events, files, social)
app.get('/api/:section', async (req, res) => {
  await db.read();
  const section = req.params.section;
  if (!db.data[section]) {
    return res.status(404).json({ error: 'Section inconnue' });
  }
  res.json(db.data[section]);
});

// --- Endpoints génériques CRUD ---
const entities = ['products','articles','links','testimonials','faq','team','events','files','social'];
entities.forEach(entity => {
  app.get(`/api/${entity}`, (req, res) => {
    res.json(req.db.data[entity] || []);
  });
  app.post(`/api/${entity}`, (req, res) => {
    req.db.data[entity].push(req.body);
    db.write();
    res.status(201).json({ success: true });
  });
  app.put(`/api/${entity}/:idx`, (req, res) => {
    const idx = parseInt(req.params.idx);
    if (req.db.data[entity][idx]) {
      req.db.data[entity][idx] = req.body;
      db.write();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
  app.delete(`/api/${entity}/:idx`, (req, res) => {
    const idx = parseInt(req.params.idx);
    if (req.db.data[entity][idx]) {
      req.db.data[entity].splice(idx, 1);
      db.write();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
});

// Upload de fichiers
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  req.db.data.files.push({
    originalname: req.file.originalname,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`
  });
  db.write();
  res.status(201).json({ success: true, file: req.file });
});

// Servir les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// PATCH pour modifier le texte personnalisé de la section don
app.patch('/api/donation', async (req, res) => {
  await db.read();
  if (typeof req.body.customText === 'string') {
    db.data.donation.customText = req.body.customText;
    await db.write();
    return res.json({ success: true, customText: db.data.donation.customText });
  }
  res.status(400).json({ success: false, error: 'customText requis' });
});

// POST pour enregistrer un nouveau don
app.post('/api/donation', async (req, res) => {
  await db.read();
  const { name, email, amount, message } = req.body;
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ success: false, error: 'Montant invalide' });
  }
  const don = {
    name: name || 'Anonyme',
    email: email || '',
    amount: Number(amount),
    message: message || '',
    date: new Date().toISOString()
  };
  db.data.donation.donations.push(don);
  await db.write();
  // Envoi de notification email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    await transporter.sendMail({
      from: `"Site Anthony Legros" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: 'Nouveau don reçu sur votre site',
      html: `<b>Nouveau don reçu</b><br><b>Nom :</b> ${don.name}<br><b>Email :</b> ${don.email}<br><b>Montant :</b> ${don.amount} €<br><b>Message :</b> ${don.message}<br><b>Date :</b> ${don.date}`
    });
  } catch (err) {
    // Log mais ne bloque pas la réponse
    console.error('Erreur envoi email don :', err);
  }
  res.status(201).json({ success: true, don });
});

// --- Auth (simple, à sécuriser en prod) ---
app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === 'admin' && pass === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`API backend démarrée sur http://localhost:${PORT}`);
});

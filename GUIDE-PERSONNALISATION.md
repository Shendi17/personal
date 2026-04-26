# Guide de personnalisation complète du site

## 🎯 Objectif
Rendre TOUTES les sections du site complètement personnalisables via l'interface d'administration.

## ✅ Modifications appliquées

### 1. Sidebar admin élargie
- **Largeur** : 700px (au lieu de 396px)
- **Responsive** : 90% de la largeur d'écran sur mobile
- **Styles améliorés** : Formulaires plus lisibles et professionnels

### 2. Configuration corrigée
- **Champ `text`** au lieu de `content` pour la section "À propos"
- **Champ `visible`** ajouté pour masquer/afficher les sections
- **Logs console** pour déboguer l'affichage

### 3. Affichage dynamique
- La fonction `displayAbout()` charge maintenant les données depuis l'API
- Gestion de la visibilité des sections
- Mise à jour automatique après modification

## 🧪 Test rapide

### Ouvre la console du navigateur (F12) et teste :

```javascript
// 1. Vérifier les données actuelles
fetch('http://localhost:3001/api/about').then(r => r.json()).then(console.log)

// 2. Mettre à jour la section
fetch('http://localhost:3001/api/about', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Mon Profil',
        text: 'Développeur passionné par les technologies web.',
        visible: true
    })
}).then(r => r.json()).then(console.log)

// 3. Rafraîchir l'affichage
import('./js/public.js').then(m => m.displayAbout())
```

## 📋 Sections personnalisables

### Actuellement configurées :
- ✅ **À propos** : titre, texte, visibilité
- ✅ **Timeline** : titre, étapes
- ✅ **Réalisations** : titre, projets
- ✅ **Statistiques** : titre, stats
- ✅ **Services** : titre, services
- ✅ **Boutique** : titre, produits
- ✅ **Don** : titre, texte personnalisé
- ✅ **Contact** : titre, email
- ✅ **Blog** : titre, articles
- ✅ **Liens utiles** : titre, liens
- ✅ **Témoignages** : titre, témoignages
- ✅ **FAQ** : titre, questions/réponses
- ✅ **Équipe** : titre, membres
- ✅ **Événements** : titre, événements
- ✅ **Fichiers** : titre, fichiers
- ✅ **Réseaux sociaux** : titre, liens sociaux

## 🔧 Prochaines étapes

### Pour que TOUT soit personnalisable, il faut :

1. **Ajouter plus de champs dans `admin-config.js`** :
   - Sous-titres
   - Descriptions
   - Images
   - Couleurs
   - Liens
   - etc.

2. **Créer des fonctions d'affichage pour TOUTES les sections** dans `public.js`

3. **Rendre le HTML complètement dynamique** :
   - Hero section
   - Footer
   - Navigation
   - etc.

## 📝 Exemple : Personnaliser la section Hero

### 1. Ajouter dans `admin-config.js` :
```javascript
hero: {
    label: 'Section Hero',
    fields: ['name', 'subtitle', 'linkedin', 'github', 'visible'],
    listKey: null
}
```

### 2. Ajouter dans `server.js` (backend) :
```javascript
const sectionDefaults = {
    hero: { name: 'Anthony Legros', subtitle: 'Technicien Polyvalent', linkedin: '', github: '', visible: true },
    // ... autres sections
};
```

### 3. Créer la fonction d'affichage dans `public.js` :
```javascript
export async function displayHero() {
    try {
        const data = await apiGet('hero');
        
        const heroSection = document.getElementById('hero');
        if (heroSection && data.visible === false) {
            heroSection.style.display = 'none';
            return;
        }
        
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle && data.name) {
            heroTitle.textContent = data.name;
        }
        
        const heroSubtitle = document.querySelector('#hero p');
        if (heroSubtitle && data.subtitle) {
            heroSubtitle.textContent = data.subtitle;
        }
        
        // Mettre à jour les liens
        const linkedinLink = document.querySelector('#hero a[href*="linkedin"]');
        if (linkedinLink && data.linkedin) {
            linkedinLink.href = data.linkedin;
        }
        
        const githubLink = document.querySelector('#hero a[href*="github"]');
        if (githubLink && data.github) {
            githubLink.href = data.github;
        }
    } catch (e) {
        console.error('Erreur chargement Hero:', e);
    }
}
```

### 4. Appeler la fonction dans `main.js` :
```javascript
displayHero();
```

## 🎨 Personnalisation avancée

### Pour rendre TOUT personnalisable, tu peux ajouter :

1. **Couleurs du thème** :
   ```javascript
   theme: {
       label: 'Thème',
       fields: ['primaryColor', 'secondaryColor', 'backgroundColor'],
       listKey: null
   }
   ```

2. **Navigation** :
   ```javascript
   navigation: {
       label: 'Navigation',
       fields: ['logo', 'menuItems'],
       listKey: 'menuItems'
   }
   ```

3. **Footer** :
   ```javascript
   footer: {
       label: 'Pied de page',
       fields: ['copyright', 'socialLinks'],
       listKey: 'socialLinks'
   }
   ```

4. **SEO** :
   ```javascript
   seo: {
       label: 'SEO',
       fields: ['metaTitle', 'metaDescription', 'metaKeywords'],
       listKey: null
   }
   ```

## 🚀 Utilisation actuelle

### 1. Ouvre l'admin
- Va sur `http://personal-website.local`
- Clique sur l'icône utilisateur
- Connecte-toi (admin / admin123)

### 2. Modifie une section
- Clique sur "À propos" dans le menu
- Change le titre et le texte
- Clique sur "Enregistrer"

### 3. Vérifie l'affichage
- Ouvre la console (F12)
- Tu devrais voir : "Données About reçues: {...}"
- Tu devrais voir : "Section About mise à jour"
- La section devrait être mise à jour sur la page

## 🐛 Débogage

### Si les modifications ne s'affichent pas :

1. **Vérifie la console** (F12) :
   - Y a-t-il des erreurs ?
   - Les logs "Données About reçues" et "Section About mise à jour" apparaissent-ils ?

2. **Vérifie l'API** :
   ```javascript
   fetch('http://localhost:3001/api/about').then(r => r.json()).then(console.log)
   ```

3. **Vérifie le fichier db.json** :
   ```powershell
   Get-Content db.json | ConvertFrom-Json | Select-Object -ExpandProperty about
   ```

4. **Force le rafraîchissement** :
   ```javascript
   import('./js/public.js').then(m => m.displayAbout())
   ```

## 📞 Support

Si tu as besoin d'aide pour :
- Ajouter de nouveaux champs
- Créer de nouvelles sections
- Personnaliser l'affichage
- Déboguer un problème

N'hésite pas à demander !

Date : 01/10/2025

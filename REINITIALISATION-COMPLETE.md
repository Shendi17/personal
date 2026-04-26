# 🔄 Réinitialisation complète du site

## 🎉 Nouvelle fonctionnalité

Le bouton "🔄 Réinitialiser l'ordre" réinitialise maintenant **TOUT** :
1. ✅ **Ordre des sections** - Retour à l'ordre par défaut
2. ✅ **Toutes les données** - Retour aux données de démo
3. ✅ **Configuration Hero** - Photo, carrousel, CV de démo
4. ✅ **Toutes les sections** - Vidées et réinitialisées

## 🎯 Comment utiliser

### 1. Ouvrir l'admin

1. **Va sur** : http://personal-website.local
2. **Connecte-toi** (admin / admin123)

### 2. Cliquer sur Réinitialiser

1. **En bas du menu admin** → Bouton "🔄 Réinitialiser l'ordre"
2. **Une popup apparaît** :
   ```
   ⚠️ ATTENTION : Voulez-vous vraiment TOUT réinitialiser ?
   
   ✅ Ordre des sections
   ✅ Toutes les données
   ✅ Retour aux données de démo
   
   Cette action est irréversible !
   ```
3. **Clique "OK"** pour confirmer
4. ⏳ **Le bouton devient** "⏳ Réinitialisation..."
5. ✅ **La page se recharge** automatiquement

### 3. Résultat

Après rechargement :
- ✅ **Ordre des sections** restauré
- ✅ **Hero** avec photo et carrousel de démo
- ✅ **CV de démo** disponible
- ✅ **Toutes les sections** vides et prêtes

## 📊 Ce qui est réinitialisé

### Hero (Section d'accueil)
```json
{
  "name": "Anthony Legros",
  "title": "Technicien Polyvalent",
  "subtitle": "Maintenance Industrielle | Solutions Techniques | Automatisation",
  "photo": "https://ui-avatars.com/api/?name=Anthony+Legros...",
  "carousel": [
    "https://images.unsplash.com/photo-1581091226825-...",
    "https://images.unsplash.com/photo-1518770660439-...",
    "https://images.unsplash.com/photo-1473341304170-...",
    "https://images.unsplash.com/photo-1485827404703-..."
  ],
  "cv": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  "linkedin": "https://linkedin.com/in/anthonylegros",
  "github": "https://github.com/anthonylegros"
}
```

### Toutes les autres sections
- **À propos** : Texte de démo
- **Timeline** : Vide
- **Réalisations** : Vide
- **Statistiques** : Vide
- **Services** : Vide
- **Boutique** : Vide
- **Blog** : Vide
- **Etc.**

### Ordre des sections
```
1. Section Hero (Accueil)
2. À propos
3. Timeline
4. Réalisations
5. Statistiques
6. Services
7. Boutique
8. Don
9. Contact
10. Blog
11. Liens utiles
12. Témoignages
13. FAQ
14. Équipe
15. Événements
16. Fichiers
17. Réseaux sociaux
```

## ⚠️ Attention

### Cette action est IRRÉVERSIBLE !

- ❌ **Toutes tes modifications** seront perdues
- ❌ **Tous tes contenus** seront supprimés
- ❌ **Toutes tes images uploadées** resteront dans `uploads/` mais ne seront plus référencées
- ✅ **Retour complet** aux données de démo

### Avant de réinitialiser

Si tu veux sauvegarder tes données :

```powershell
# Sauvegarder db.json
Copy-Item db.json db-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss').json
```

### Pour restaurer une sauvegarde

```powershell
# Restaurer depuis une sauvegarde
Copy-Item db-backup-20251006-133000.json db.json

# Redémarrer le serveur
Get-Process -Name node | Stop-Process -Force
npm start
```

## 🔧 Fonctionnement technique

### 1. Fichier de données par défaut

`db-default.json` contient toutes les données de démo :
- Hero avec photo, carrousel, CV
- Toutes les sections avec configuration par défaut
- Textes de démo

### 2. Endpoint API

`POST /api/reset-all` :
- Charge `db-default.json`
- Remplace `db.json` avec les données par défaut
- Retourne un message de succès

### 3. Bouton dans l'admin

Le bouton "🔄 Réinitialiser l'ordre" :
1. Demande confirmation
2. Réinitialise l'ordre des sections (localStorage)
3. Appelle `/api/reset-all`
4. Recharge la page

## 🧪 Test

### 1. Modifier quelque chose

1. **Admin** → Section Hero
2. **Change le nom** : "Test Réinitialisation"
3. **Enregistre**
4. **Vérifie** sur la page → Le nom a changé

### 2. Réinitialiser

1. **Clique** "🔄 Réinitialiser l'ordre"
2. **Confirme**
3. ⏳ **Attends** le rechargement

### 3. Vérifier

1. **Vérifie** la page → Nom = "Anthony Legros"
2. **Vérifie** le carrousel → 4 photos de démo
3. **Vérifie** l'ordre des sections → Ordre par défaut

## 💡 Cas d'usage

### Cas 1 : Recommencer à zéro

Tu as fait plein de tests et tu veux repartir de zéro :
1. Clique "🔄 Réinitialiser l'ordre"
2. Confirme
3. ✅ Tout est réinitialisé !

### Cas 2 : Restaurer après une erreur

Tu as fait une erreur et tu veux revenir en arrière :
1. Clique "🔄 Réinitialiser l'ordre"
2. Confirme
3. ✅ Retour aux données de démo !

### Cas 3 : Démonstration

Tu veux montrer le site avec des données de démo :
1. Clique "🔄 Réinitialiser l'ordre"
2. Confirme
3. ✅ Site prêt pour la démo !

## 📁 Fichiers créés

- ✅ `db-default.json` - Données de démo par défaut
- ✅ Endpoint `/api/reset-all` dans `server.js`
- ✅ Bouton modifié dans `js/main.js`

## 🎯 Résultat final

**Réinitialisation complète en un clic !**

- ✅ Bouton "🔄 Réinitialiser l'ordre"
- ✅ Confirmation avec avertissement
- ✅ Réinitialisation de l'ordre des sections
- ✅ Réinitialisation de toutes les données
- ✅ Rechargement automatique
- ✅ Retour complet aux données de démo

**Ton site peut maintenant être réinitialisé complètement en un clic !** 🔄✨

Date : 06/10/2025 - 13:35

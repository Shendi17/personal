# 🚀 Démarrage rapide du site

## ✅ Ton espace d'administration est DÉJÀ fonctionnel !

Tu as déjà un espace d'administration complet qui te permet de :
- ✅ **Te connecter** avec login/mot de passe
- ✅ **Modifier toutes les sections** (Hero, About, Timeline, etc.)
- ✅ **Ajouter/Supprimer** des articles, produits, liens, etc.
- ✅ **Gérer la visibilité** de chaque section
- ✅ **Voir les changements en temps réel**

## 🔐 Identifiants admin

- **Login** : `admin`
- **Mot de passe** : `admin123`

## 🚀 Démarrer le serveur

### Méthode simple (recommandée)

**Ouvre un terminal PowerShell** et tape :

```powershell
cd C:\Users\Anthony\CascadeProjects\personal-website
npm start
```

**Attends** de voir :
```
Serveur démarré sur le port 3001
```

### Ajouter la section Hero (une seule fois)

**Dans un NOUVEAU terminal** (pendant que le serveur tourne) :

```powershell
cd C:\Users\Anthony\CascadeProjects\personal-website

# Attendre 3 secondes que le serveur soit prêt
Start-Sleep -Seconds 3

# Ajouter Hero
Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body '{"name":"Anthony Legros","title":"Technicien Polyvalent","subtitle":"Maintenance Industrielle | Solutions Techniques | Automatisation","linkedin":"https://linkedin.com/in/anthonylegros","github":"https://github.com/anthonylegros","visible":true}'
```

## 🌐 Accéder au site

1. **Ouvre ton navigateur**
2. **Va sur** : `http://personal-website.local`
3. **Clique sur l'icône utilisateur** (en haut à droite)
4. **Connecte-toi** : admin / admin123
5. ✅ **L'admin s'ouvre !**

## 🎨 Utiliser l'admin

### Modifier une section

1. **Dans la sidebar admin**, clique sur une section (ex: "À propos")
2. **Modifie les champs** directement
3. **Clique "Enregistrer"**
4. ✅ Les changements apparaissent immédiatement !

### Ajouter un article de blog

1. **Clique sur "Blog"**
2. **Clique "Ajouter"** (bouton vert)
3. **Remplis les champs** :
   - title : Titre de l'article
   - excerpt : Aperçu du contenu
   - image : URL de l'image
   - link : Lien vers l'article
   - date : Date de publication
   - author : Ton nom
4. **Enregistre**
5. ✅ L'article apparaît !

### Ajouter un produit

1. **Clique sur "Boutique"**
2. **Clique "Ajouter"**
3. **Remplis** :
   - name : Nom du produit
   - description : Description
   - price : Prix
   - image : URL de l'image
4. **Enregistre**
5. ✅ Le produit apparaît !

### Ajouter un lien utile

1. **Clique sur "Liens utiles"**
2. **Clique "Ajouter"**
3. **Remplis** :
   - name : Nom du lien
   - url : URL complète
4. **Enregistre**
5. ✅ Le lien apparaît !

## 📋 Sections disponibles dans l'admin

1. **Section Hero (Accueil)** - Nom, titre, liens sociaux
2. **À propos** - Présentation
3. **Timeline** - Parcours professionnel
4. **Réalisations** - Projets avec images
5. **Statistiques** - Chiffres clés
6. **Services** - Services proposés
7. **Boutique** - Produits à vendre
8. **Don** - Section donation
9. **Contact** - Informations de contact
10. **Blog** - Articles avec images et aperçus
11. **Liens utiles** - Liens externes
12. **Témoignages** - Avis clients
13. **FAQ** - Questions/Réponses
14. **Équipe** - Membres de l'équipe
15. **Événements** - Actualités
16. **Fichiers** - Documents à télécharger
17. **Réseaux sociaux** - Liens sociaux

## 🔧 Commandes utiles

### Démarrer le serveur
```powershell
npm start
```

### Arrêter le serveur
```powershell
Get-Process -Name node | Stop-Process
```

### Vérifier si le serveur tourne
```powershell
Get-Process -Name node
```

### Tester l'API
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/about"
```

## 🐛 En cas de problème

### "Service Unavailable"
→ Le serveur Node.js n'est pas démarré
→ Lance `npm start`

### "Section inconnue" pour Hero
→ Le serveur n'a pas été redémarré après l'ajout de Hero
→ Arrête et redémarre le serveur

### L'admin ne s'ouvre pas
→ Vérifie que tu es connecté (admin / admin123)
→ Recharge la page (F5)

### Les modifications ne s'affichent pas
→ Vérifie la console (F12) pour voir les erreurs
→ Vérifie que le serveur tourne

## 🎯 Résumé rapide

```powershell
# 1. Démarrer
cd C:\Users\Anthony\CascadeProjects\personal-website
npm start

# 2. Ouvrir le navigateur
# http://personal-website.local

# 3. Se connecter
# Clique sur l'icône utilisateur
# admin / admin123

# 4. Modifier
# Clique sur une section → Modifie → Enregistre
```

**Ton espace d'administration est prêt à l'emploi !** 🎉

Date : 05/10/2025 - 11:00

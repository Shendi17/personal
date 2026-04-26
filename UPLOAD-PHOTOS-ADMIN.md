# ✅ Upload de photos simplifié dans l'admin !

## 🎉 Nouvelle fonctionnalité

Tu peux maintenant **uploader des photos depuis ton ordinateur** directement dans l'admin avec un simple bouton !

## 📸 Comment ça marche

### Pour les champs photo/image

Chaque champ `photo` ou `image` affiche maintenant :
1. **Un champ texte** - Pour coller une URL externe
2. **Un bouton "📤 Upload"** - Pour choisir une image sur ton PC
3. **Un aperçu** - L'image s'affiche automatiquement

## 🎯 Utilisation

### Méthode 1 : Upload depuis ton PC (NOUVEAU !)

1. **Ouvre l'admin** (admin / admin123)
2. **Clique sur "Section Hero (Accueil)"**
3. **Trouve le champ "photo"**
4. **Clique sur "📤 Upload"**
5. **Sélectionne une image** sur ton ordinateur
6. ⏳ **Attends** (le bouton affiche "⏳ Upload...")
7. ✅ **L'image est uploadée** et l'URL apparaît automatiquement
8. **Clique "Enregistrer"**
9. ✅ **Ta photo s'affiche** sur le site !

### Méthode 2 : URL externe (comme avant)

1. **Ouvre l'admin**
2. **Colle l'URL** dans le champ texte
   ```
   https://images.unsplash.com/photo-xxx
   ```
3. **Enregistre**

## 📋 Sections avec upload de photos

### Section Hero
- **photo** : Photo de profil principale
- **carousel** : Liste de photos (chaque item a un bouton upload)

### Réalisations (Projects)
- **image** : Image de chaque projet

### Boutique (Shop)
- **image** : Image de chaque produit

### Blog
- **image** : Image de chaque article

### Équipe (Team)
- **photo** : Photo de chaque membre

## 🎨 Aperçu visuel

```
┌─────────────────────────────────────────┐
│ photo :                                 │
│ ┌─────────────────────┬──────────────┐ │
│ │ [URL ou chemin]     │ 📤 Upload    │ │
│ └─────────────────────┴──────────────┘ │
│                                         │
│ ┌─────────────────────┐                │
│ │                     │                │
│ │   APERÇU IMAGE      │ ← Aperçu auto │
│ │                     │                │
│ └─────────────────────┘                │
│                                         │
│ URL externe ou clique "Upload"          │
└─────────────────────────────────────────┘
```

## ✨ Avantages

1. **✅ Simple** - Un clic pour choisir une image
2. **✅ Rapide** - Upload automatique
3. **✅ Aperçu** - Vois l'image avant de sauvegarder
4. **✅ Flexible** - URL externe OU upload local
5. **✅ Stockage** - Images sauvegardées dans `uploads/images/`

## 🔧 Fonctionnement technique

### 1. Sélection de l'image
```
Clic sur "📤 Upload" → Ouvre dialogue de sélection
```

### 2. Upload automatique
```
Image sélectionnée → Upload vers /api/upload → Retour URL
```

### 3. Mise à jour du champ
```
URL reçue → Rempli automatiquement le champ → Aperçu affiché
```

### 4. Sauvegarde
```
Clic "Enregistrer" → Données envoyées à l'API → Affichage sur le site
```

## 📊 Formats acceptés

- **JPEG / JPG** ✅
- **PNG** ✅
- **GIF** ✅
- **WEBP** ✅

**Taille max** : 5 MB par image

## 💡 Exemples d'utilisation

### Exemple 1 : Photo de profil Hero

1. Admin → Section Hero
2. Champ "photo" → Clic "📤 Upload"
3. Sélectionne `C:\Photos\profil.jpg`
4. ⏳ Upload...
5. ✅ URL : `/uploads/images/1696512345678-123456789.jpg`
6. Aperçu s'affiche
7. Enregistre
8. ✅ Photo visible sur le Hero !

### Exemple 2 : Images du carrousel

1. Admin → Section Hero → carousel
2. Item 1 → Clic "📤 Upload"
3. Sélectionne `C:\Photos\photo1.jpg`
4. ✅ Uploadée
5. Item 2 → Clic "📤 Upload"
6. Sélectionne `C:\Photos\photo2.jpg`
7. ✅ Uploadée
8. Enregistre
9. ✅ Carrousel avec tes photos !

### Exemple 3 : Produit boutique

1. Admin → Boutique
2. Item 1 → Champ "image" → Clic "📤 Upload"
3. Sélectionne `C:\Photos\produit.jpg`
4. ✅ Uploadée
5. Enregistre
6. ✅ Produit avec image !

## 🎯 Workflow complet

```
1. Ouvre l'admin
   ↓
2. Sélectionne une section (Hero, Boutique, etc.)
   ↓
3. Trouve un champ photo/image
   ↓
4. Clique "📤 Upload"
   ↓
5. Choisis une image sur ton PC
   ↓
6. ⏳ Upload automatique
   ↓
7. ✅ URL remplie + Aperçu affiché
   ↓
8. Clique "Enregistrer"
   ↓
9. ✅ Image visible sur le site !
```

## 🔄 Changer une image

### Pour remplacer une image existante :

1. **Clique "📤 Upload"** à nouveau
2. **Sélectionne** une nouvelle image
3. **L'ancienne URL** est remplacée
4. **Enregistre**
5. ✅ **Nouvelle image** affichée

## 📁 Où sont stockées les images ?

Les images uploadées sont dans :
```
uploads/images/
```

**Format du nom** :
```
[timestamp]-[random].jpg
Exemple : 1696512345678-987654321.jpg
```

## 🎨 Mélanger upload et URL externes

Tu peux utiliser les deux méthodes :

```json
{
  "carousel": [
    "/uploads/images/ma-photo.jpg",           // Uploadée
    "https://images.unsplash.com/photo-xxx",  // Unsplash
    "/uploads/images/autre-photo.jpg",        // Uploadée
    "https://example.com/image.jpg"           // Externe
  ]
}
```

## ⚠️ Important

### Avant d'utiliser l'upload :

**Le serveur doit être démarré** :
```powershell
npm start
```

### Si l'upload ne fonctionne pas :

1. **Vérifie** que le serveur tourne
2. **Vérifie** la console (F12) pour les erreurs
3. **Vérifie** que le dossier `uploads/images/` existe
4. **Vérifie** la taille de l'image (< 5 MB)

## 🎯 Résultat final

**Upload de photos ultra-simplifié !**

- ✅ Bouton "📤 Upload" sur tous les champs photo/image
- ✅ Sélection d'image en un clic
- ✅ Upload automatique
- ✅ Aperçu instantané
- ✅ URL remplie automatiquement
- ✅ Fonctionne dans toutes les sections
- ✅ Compatible avec URLs externes

**Ajouter des photos n'a jamais été aussi simple !** 📸✨

Date : 05/10/2025 - 13:30

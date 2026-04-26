# 📸 Système complet de gestion des photos Hero

## 🎉 Fonctionnalités

Tu peux maintenant :
1. ✅ **Ajouter une photo de profil** (principale)
2. ✅ **Créer un carrousel de photos** (plusieurs images en défilement)
3. ✅ **Upload depuis ton ordinateur** (via l'API)
4. ✅ **Utiliser des liens externes** (Unsplash, UI Avatars, etc.)
5. ✅ **Gérer tout depuis l'admin**

## 📋 Structure Hero complète

```json
{
  "name": "Anthony Legros",
  "title": "Technicien Polyvalent",
  "subtitle": "Maintenance | Solutions | Automatisation",
  "photo": "URL de la photo principale",
  "carousel": [
    "URL photo 1",
    "URL photo 2",
    "URL photo 3"
  ],
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "visible": true
}
```

## 🎨 Option 1 : Lien externe (UI Avatars)

### Avantages
- ✅ Rapide et simple
- ✅ Pas de stockage nécessaire
- ✅ Personnalisable

### Comment faire
1. **Ouvre l'admin** → Section Hero
2. **Champ photo** :
   ```
   https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200
   ```
3. **Enregistre**

### Personnalisation UI Avatars
```
Couleurs :
- Bleu :   background=2563eb
- Vert :   background=10b981
- Rouge :  background=ef4444
- Violet : background=8b5cf6

Taille :
- size=128, 200, 400

Options :
- &bold=true
- &rounded=true
- &length=1 (1 lettre)
```

## 🌐 Option 2 : Lien externe (Unsplash)

### Avantages
- ✅ Photos professionnelles
- ✅ Haute qualité
- ✅ Gratuit

### Comment faire
1. **Va sur** : https://unsplash.com
2. **Cherche** une photo
3. **Copie l'URL** :
   ```
   https://images.unsplash.com/photo-xxx?auto=format&fit=crop&w=400&q=80
   ```
4. **Colle dans l'admin** → photo
5. **Enregistre**

## 💻 Option 3 : Upload depuis ton ordinateur

### Avantages
- ✅ Tes propres photos
- ✅ Contrôle total
- ✅ Stockage local

### Via PowerShell (API)
```powershell
# 1. Prépare le fichier
$imagePath = "C:\chemin\vers\ta\photo.jpg"

# 2. Upload via l'API
$form = @{
    image = Get-Item -Path $imagePath
}

$response = Invoke-RestMethod -Uri "http://localhost:3001/api/upload" -Method POST -Form $form

# 3. Récupère l'URL
$imageUrl = $response.url
Write-Host "✅ Image uploadée : $imageUrl"

# 4. Ajoute à Hero
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance | Solutions | Automatisation"
    photo = $imageUrl
    carousel = @()
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $hero
```

### Via JavaScript (dans le navigateur)
```javascript
// 1. Créer un input file
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';

input.onchange = async (e) => {
    const file = e.target.files[0];
    
    // 2. Créer FormData
    const formData = new FormData();
    formData.append('image', file);
    
    // 3. Upload
    const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();
    console.log('Image uploadée :', data.url);
    
    // 4. Utiliser l'URL
    // Tu peux maintenant mettre data.url dans le champ photo
};

input.click();
```

## 🎠 Carrousel de photos

### Qu'est-ce que c'est ?
Un carrousel affiche plusieurs photos en défilement automatique dans le Hero.

### Comment ajouter des photos au carrousel

#### Via l'admin
1. **Ouvre l'admin** → Section Hero
2. **Trouve le champ "carousel"**
3. **Clique "Ajouter"** pour chaque photo
4. **Entre l'URL** de chaque photo :
   ```
   Photo 1 : https://images.unsplash.com/photo-xxx
   Photo 2 : https://images.unsplash.com/photo-yyy
   Photo 3 : https://images.unsplash.com/photo-zzz
   ```
5. **Enregistre**

#### Via PowerShell
```powershell
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance | Solutions | Automatisation"
    photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200"
    carousel = @(
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
    )
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $hero
```

## 📏 Formats d'images recommandés

### Photo de profil
- **Format** : Carré (1:1)
- **Taille** : 200x200 à 400x400 pixels
- **Poids** : < 500 KB
- **Formats** : JPG, PNG, WEBP

### Photos carrousel
- **Format** : Paysage (16:9) ou Carré (1:1)
- **Taille** : 800x600 à 1920x1080 pixels
- **Poids** : < 1 MB par image
- **Formats** : JPG, PNG, WEBP

## 🔧 Limites de l'upload

- **Taille max** : 5 MB par fichier
- **Formats acceptés** : JPEG, JPG, PNG, GIF, WEBP
- **Stockage** : `uploads/images/`

## 🎯 Exemples complets

### Exemple 1 : Photo de profil simple
```json
{
  "photo": "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200",
  "carousel": []
}
```

### Exemple 2 : Photo + Carrousel
```json
{
  "photo": "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200",
  "carousel": [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
  ]
}
```

### Exemple 3 : Images uploadées
```json
{
  "photo": "/uploads/images/1696512345678-123456789.jpg",
  "carousel": [
    "/uploads/images/1696512345678-987654321.jpg",
    "/uploads/images/1696512345678-456789123.jpg"
  ]
}
```

## 🚀 Script complet d'upload

```powershell
# Script pour uploader une photo et l'ajouter au Hero

# 1. Upload de la photo
$imagePath = "C:\chemin\vers\ta\photo.jpg"
$form = @{ image = Get-Item -Path $imagePath }
$uploadResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/upload" -Method POST -Form $form
$photoUrl = $uploadResponse.url

Write-Host "✅ Photo uploadée : $photoUrl" -ForegroundColor Green

# 2. Mise à jour du Hero
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance | Solutions | Automatisation"
    photo = $photoUrl
    carousel = @()
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $hero

Write-Host "✅ Hero mis à jour avec la photo uploadée !" -ForegroundColor Green
```

## 📝 Résumé

**3 façons d'ajouter des photos :**
1. ✅ **Lien externe** (UI Avatars, Unsplash) - Le plus simple
2. ✅ **Upload via API** (PowerShell) - Pour tes propres photos
3. ✅ **Via l'admin** (bientôt avec interface d'upload) - Le plus pratique

**2 types de photos :**
1. ✅ **Photo principale** (profil) - Affichée en haut
2. ✅ **Carrousel** (plusieurs photos) - Défilement automatique

**Tout gérable depuis l'admin !**

Date : 05/10/2025 - 13:10

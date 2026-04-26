# ✅ Carrousel Hero avec photos de démo ajouté !

## 🎉 Résultat

Le Hero affiche maintenant :
- ✅ **Photo de profil** (ronde, en haut)
- ✅ **Carrousel de 4 photos en fond** (défilement automatique)
- ✅ **Overlay sombre** pour meilleure lisibilité
- ✅ **Texte en blanc** sur le carrousel
- ✅ **Transition fluide** entre les photos (5 secondes)

## 📸 Photos du carrousel de démo

1. 🏭 **Maintenance industrielle** - Équipements et machines
2. 💻 **Technologie & IoT** - Capteurs et systèmes connectés
3. 🌱 **Énergie & Environnement** - Solutions vertes
4. 🤖 **Automatisation** - Robotique et automatisation

## 🎨 Aperçu visuel

```
┌─────────────────────────────────────────┐
│ [PHOTO CARROUSEL EN FOND - DÉFILEMENT] │
│                                         │
│      ╭─────────╮                        │
│      │  PHOTO  │  ← Photo de profil     │
│      ╰─────────╯                        │
│                                         │
│    Anthony Legros  (texte blanc)       │
│                                         │
│  Technicien Polyvalent                 │
│  Maintenance | Solutions               │
│                                         │
│  [LinkedIn]  [GitHub]                  │
│                                         │
└─────────────────────────────────────────┘
```

## 🔄 Animation du carrousel

- **Durée** : 5 secondes par photo
- **Transition** : Fondu enchaîné (1 seconde)
- **Boucle** : Infinie
- **Ordre** : Photo 1 → 2 → 3 → 4 → 1...

## 🧪 Test

### 1. Recharge la page
```
Ctrl + Shift + R
```

### 2. Vérifie le Hero
Tu devrais voir :
- ✅ Carrousel de photos en fond
- ✅ Photos qui changent toutes les 5 secondes
- ✅ Texte en blanc pour contraste
- ✅ Photo de profil au-dessus

### 3. Console (F12)
```
Données Hero reçues: {carousel: Array(4), ...}
Section Hero mise à jour
```

## 🎨 Personnaliser le carrousel

### Via l'admin

1. **Ouvre l'admin** (admin / admin123)
2. **Clique sur "Section Hero (Accueil)"**
3. **Trouve le champ "carousel"**
4. **Tu verras 4 photos** :
   ```
   Item 1 : https://images.unsplash.com/photo-xxx
   Item 2 : https://images.unsplash.com/photo-yyy
   Item 3 : https://images.unsplash.com/photo-zzz
   Item 4 : https://images.unsplash.com/photo-www
   ```
5. **Modifie** une URL pour changer une photo
6. **Clique "Ajouter"** pour ajouter une 5ème photo
7. **Clique "Supprimer"** pour retirer une photo
8. **Enregistre**
9. ✅ Le carrousel se met à jour immédiatement !

### Via PowerShell

```powershell
# Changer les photos du carrousel
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance | Solutions | Automatisation"
    photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200"
    carousel = @(
        "https://images.unsplash.com/photo-nouvelle1?w=1200",
        "https://images.unsplash.com/photo-nouvelle2?w=1200",
        "https://images.unsplash.com/photo-nouvelle3?w=1200"
    )
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $hero
```

## 🖼️ Ajouter tes propres photos

### Option 1 : Upload depuis ton PC
```powershell
# Upload une photo
.\upload-photo.ps1 -ImagePath "C:\Photos\photo1.jpg" -AddToCarousel

# Upload plusieurs photos
.\upload-photo.ps1 -ImagePath "C:\Photos\photo2.jpg" -AddToCarousel
.\upload-photo.ps1 -ImagePath "C:\Photos\photo3.jpg" -AddToCarousel
```

### Option 2 : Liens Unsplash
1. Va sur https://unsplash.com
2. Cherche des photos (ex: "industrial", "technology")
3. Copie l'URL de l'image
4. Ajoute dans l'admin → carousel

### Option 3 : Mélange
```json
{
  "carousel": [
    "/uploads/images/ma-photo.jpg",           // Uploadée
    "https://images.unsplash.com/photo-xxx",  // Unsplash
    "/images/locale.jpg",                     // Locale
    "https://example.com/photo.jpg"           // Externe
  ]
}
```

## ⚙️ Paramètres du carrousel

### Changer la vitesse
Dans `public.js`, ligne ~75 :
```javascript
}, 5000); // 5000 = 5 secondes
```

**Exemples** :
- `3000` = 3 secondes (plus rapide)
- `8000` = 8 secondes (plus lent)
- `10000` = 10 secondes (très lent)

### Changer l'opacité de l'overlay
Dans `index.html`, ligne ~80 :
```html
<div class="absolute inset-0 bg-black bg-opacity-40 hidden" id="hero-overlay"></div>
```

**Exemples** :
- `bg-opacity-20` = Plus clair (20%)
- `bg-opacity-40` = Moyen (40%) ← Actuel
- `bg-opacity-60` = Plus sombre (60%)

### Désactiver le carrousel
Dans l'admin :
1. Section Hero → carousel
2. Supprime toutes les photos
3. Enregistre
4. ✅ Le carrousel disparaît, fond normal revient

## 💡 Conseils

### Taille des images
- **Recommandé** : 1920x1080 (Full HD)
- **Minimum** : 1200x800
- **Format** : JPG (meilleur compromis poids/qualité)
- **Poids** : < 500 KB par image

### Thème des photos
Choisis des photos cohérentes :
- ✅ Même style (industriel, tech, nature)
- ✅ Même tonalité de couleurs
- ✅ Même luminosité

### Nombre de photos
- **Minimum** : 2 photos
- **Recommandé** : 3-5 photos
- **Maximum** : 10 photos (au-delà, ça devient long)

## 🎯 Résultat final

**Le Hero est maintenant dynamique et professionnel !**

- ✅ Carrousel de 4 photos en fond
- ✅ Défilement automatique fluide
- ✅ Photo de profil au premier plan
- ✅ Texte lisible avec overlay
- ✅ Tout modifiable via l'admin
- ✅ Upload de tes propres photos possible

**Ton site a maintenant un Hero impressionnant !** 🎠✨

Date : 05/10/2025 - 13:10

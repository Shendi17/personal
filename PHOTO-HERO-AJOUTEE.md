# ✅ Photo de profil ajoutée dans le Hero !

## 🎉 Résumé

Tu peux maintenant ajouter ta photo de profil dans la section Hero. Elle s'affichera en haut de la page, au-dessus de ton nom.

## 📸 Ce qui a été ajouté

### 1. Champ photo dans l'admin
```
photo : [URL de ta photo]
```

### 2. Affichage dans le Hero
```
┌─────────────────────────────┐
│                             │
│      ╭─────────╮            │
│      │  PHOTO  │            │
│      ╰─────────╯            │
│                             │
│    Anthony Legros           │
│                             │
│  Technicien Polyvalent      │
│  Maintenance | Solutions    │
│                             │
│  [LinkedIn]  [GitHub]       │
│                             │
└─────────────────────────────┘
```

### 3. Design de la photo
- **Taille** : 128x128 pixels (w-32 h-32)
- **Forme** : Ronde (rounded-full)
- **Bordure** : Bleue 4px (border-4 border-blue-500)
- **Ombre** : shadow-xl
- **Position** : Centrée au-dessus du nom

## 🎨 Sources d'images recommandées

### 1. UI Avatars (Gratuit, génère un avatar avec initiales)
```
https://ui-avatars.com/api/?name=Ton+Nom&background=2563eb&color=fff&size=200&bold=true
```

**Personnalisation** :
- `name` : Ton nom (ex: Anthony+Legros)
- `background` : Couleur de fond en hex (ex: 2563eb = bleu)
- `color` : Couleur du texte (ex: fff = blanc)
- `size` : Taille en pixels (ex: 200)
- `bold` : Texte en gras (true/false)

**Exemples** :
```
Bleu : https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200
Vert : https://ui-avatars.com/api/?name=Anthony+Legros&background=10b981&color=fff&size=200
Rouge : https://ui-avatars.com/api/?name=Anthony+Legros&background=ef4444&color=fff&size=200
```

### 2. Gravatar (Si tu as un compte)
```
https://www.gravatar.com/avatar/[ton-hash-email]?s=200
```

### 3. Unsplash (Photos professionnelles)
```
https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=200&q=80
```

### 4. Image locale (Upload sur ton serveur)
```
/images/profile.jpg
```

## 🔧 Comment modifier la photo

### Via l'admin (Recommandé)

1. **Ouvre l'admin** (admin / admin123)
2. **Clique sur "Section Hero (Accueil)"**
3. **Trouve le champ "photo"** :
   ```
   photo : [Colle l'URL de ta photo ici]
   ```
4. **Enregistre**
5. ✅ **La photo s'affiche immédiatement !**

### Via PowerShell (API)

```powershell
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance | Solutions | Automatisation"
    photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200"
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $hero
```

## 💡 Exemples d'utilisation

### Avec un avatar généré (UI Avatars)
```
photo : https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200&bold=true
```
**Résultat** : Avatar bleu avec initiales "AL"

### Avec une photo Unsplash
```
photo : https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80
```
**Résultat** : Photo professionnelle

### Avec une image locale
```
photo : /images/mon-profil.jpg
```
**Résultat** : Ta propre photo uploadée

### Sans photo (masquer)
```
photo : 
```
**Résultat** : Pas de photo affichée (laisse le champ vide)

## 🎨 Personnaliser l'avatar UI Avatars

### Changer la couleur de fond
```
Bleu :   background=2563eb
Vert :   background=10b981
Rouge :  background=ef4444
Violet : background=8b5cf6
Orange : background=f97316
```

### Changer la taille
```
Petit :  size=128
Moyen :  size=200
Grand :  size=400
```

### Ajouter des options
```
&bold=true          → Texte en gras
&rounded=true       → Coins arrondis
&uppercase=false    → Pas de majuscules
&length=1           → 1 seule lettre
```

### Exemple complet personnalisé
```
https://ui-avatars.com/api/?name=Anthony+Legros&background=10b981&color=fff&size=200&bold=true&rounded=true
```

## 🧪 Test

### 1. Recharge la page
```
Ctrl + Shift + R
```

### 2. Vérifie le Hero
Tu devrais voir :
- ✅ Ta photo de profil ronde
- ✅ Avec bordure bleue
- ✅ Au-dessus de ton nom
- ✅ Centrée

### 3. Modifie dans l'admin
1. Ouvre l'admin
2. Section Hero → photo
3. Change l'URL
4. Enregistre
5. ✅ La photo change immédiatement !

## 📊 Structure complète Hero

```json
{
  "name": "Anthony Legros",
  "title": "Technicien Polyvalent",
  "subtitle": "Maintenance Industrielle | Solutions Techniques | Automatisation",
  "photo": "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200",
  "linkedin": "https://linkedin.com/in/anthonylegros",
  "github": "https://github.com/anthonylegros",
  "visible": true
}
```

## 🎯 Résultat final

**Le Hero affiche maintenant :**
- ✅ Ta photo de profil (ronde, avec bordure)
- ✅ Ton nom
- ✅ Ton titre
- ✅ Ton sous-titre
- ✅ Tes liens sociaux
- ✅ Tout modifiable via l'admin

**Ta page d'accueil est maintenant complète avec ta photo !** 📸

Date : 05/10/2025 - 12:55

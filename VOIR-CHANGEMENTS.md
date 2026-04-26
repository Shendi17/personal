# 🔄 Pour voir les changements dans l'admin

## 🚨 Problème

Les modifications JavaScript ne sont pas visibles car le navigateur utilise les anciens fichiers en cache.

## ✅ Solution : Vider le cache

### Méthode 1 : Rechargement forcé (RECOMMANDÉ)

**Appuie sur** :
- **Windows** : `Ctrl + Shift + R` ou `Ctrl + F5`
- **Mac** : `Cmd + Shift + R`

### Méthode 2 : Via DevTools (Chrome/Edge)

1. **Appuie sur `F12`** (ouvre les DevTools)
2. **Clic droit** sur le bouton de rechargement (à côté de la barre d'adresse)
3. **Sélectionne** : "Vider le cache et effectuer une actualisation forcée"

### Méthode 3 : Vider tout le cache

**Chrome/Edge** :
1. `Ctrl + Shift + Delete`
2. Coche "Images et fichiers en cache"
3. Clique "Effacer les données"
4. Recharge la page `F5`

**Firefox** :
1. `Ctrl + Shift + Delete`
2. Coche "Cache"
3. Clique "Effacer maintenant"
4. Recharge la page `F5`

## 🧪 Vérification

Après avoir vidé le cache, tu devrais voir :

### Dans Section Hero :

```
┌─────────────────────────────────────┐
│ photo :                             │
│ ┌─────────────────┬──────────────┐ │
│ │ [URL]           │ 📤 Upload    │ │ ← NOUVEAU !
│ └─────────────────┴──────────────┘ │
│                                     │
│ carousel :                          │
│                                     │
│ Photo 1                [🗑️ Supprimer]│
│ ┌─────────────────┬──────────────┐ │
│ │ [URL]           │ 📤 Upload    │ │ ← NOUVEAU !
│ └─────────────────┴──────────────┘ │
│ ┌─────────────────────┐            │
│ │   APERÇU IMAGE      │            │ ← NOUVEAU !
│ └─────────────────────┘            │
└─────────────────────────────────────┘
```

### Ce qui est NOUVEAU :

1. **✅ Bouton "📤 Upload"** à côté du champ photo
2. **✅ Bouton "📤 Upload"** pour chaque photo du carrousel
3. **✅ Aperçu des images** sous chaque champ
4. **✅ Numérotation** "Photo 1", "Photo 2", etc.
5. **✅ Design amélioré** avec bordures et espacement

## 🔍 Console (F12)

Si tu vois des erreurs dans la console :
1. Appuie sur `F12`
2. Va dans l'onglet "Console"
3. Cherche des erreurs en rouge
4. Partage-les si tu en vois

## 📝 Checklist

- [ ] Cache vidé (`Ctrl + Shift + R`)
- [ ] Page rechargée
- [ ] Admin ouvert (admin / admin123)
- [ ] Section Hero sélectionnée
- [ ] Boutons "📤 Upload" visibles
- [ ] Aperçus d'images visibles

## 💡 Si ça ne marche toujours pas

### 1. Vérifier les fichiers JavaScript

```powershell
# Vérifie que le fichier a bien été modifié
Get-Item "C:\Users\Anthony\CascadeProjects\personal-website\js\admin\admin-render.js" | Select-Object LastWriteTime
```

Tu devrais voir une date récente (aujourd'hui).

### 2. Mode navigation privée

Ouvre une **fenêtre de navigation privée** :
- Chrome/Edge : `Ctrl + Shift + N`
- Firefox : `Ctrl + Shift + P`

Puis va sur `http://personal-website.local` et connecte-toi à l'admin.

### 3. Vérifier la console

Ouvre la console (`F12`) et cherche :
- Erreurs JavaScript (en rouge)
- Messages de chargement des modules
- Erreurs 404 (fichiers non trouvés)

## 🎯 Résultat attendu

Après avoir vidé le cache, tu devrais voir :

**Section Hero** :
- ✅ Champ "photo" avec bouton "📤 Upload"
- ✅ Champ "carousel" avec liste de photos
- ✅ Chaque photo du carrousel a un bouton "📤 Upload"
- ✅ Aperçu des images sous chaque champ
- ✅ Numérotation "Photo 1", "Photo 2", etc.

**Autres sections** (Réalisations, Boutique, Blog, Équipe) :
- ✅ Champs "image" ou "photo" avec bouton "📤 Upload"
- ✅ Aperçu des images

Date : 05/10/2025 - 21:45

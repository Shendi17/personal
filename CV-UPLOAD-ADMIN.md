# ✅ Upload de CV ajouté dans l'admin !

## 🎉 Nouvelle fonctionnalité

Tu peux maintenant **uploader ton CV (PDF)** directement depuis l'admin et il sera automatiquement disponible en téléchargement dans le header du site !

## 📄 Comment ça marche

### Dans l'admin

1. **Ouvre l'admin** (admin / admin123)
2. **Clique sur "Section Hero (Accueil)"**
3. **Trouve le champ "CV (PDF)"**
4. **Tu as 2 options** :
   - **Option A** : Clique "📄 Upload PDF" → Choisis ton CV
   - **Option B** : Colle l'URL d'un CV externe
5. **Enregistre**
6. ✅ **Le CV est disponible** dans le header !

### Sur le site

Le bouton "Télécharger mon CV" dans le header (en haut à droite) utilisera automatiquement le CV que tu as uploadé.

## 🎨 Aperçu visuel

### Dans l'admin :

```
┌─────────────────────────────────────────┐
│ CV (PDF) :                              │
│ ┌─────────────────┬──────────────────┐ │
│ │ [URL du CV]     │ 📄 Upload PDF    │ │
│ └─────────────────┴──────────────────┘ │
│                                         │
│ 📄 Voir le CV actuel                    │
│                                         │
│ URL externe ou clique "Upload PDF"      │
└─────────────────────────────────────────┘
```

### Dans le header :

```
┌─────────────────────────────────────────┐
│ Anthony Legros  [📄 Télécharger mon CV] │ ← Cliquable
└─────────────────────────────────────────┘
```

## 🎯 Utilisation

### Uploader ton CV

1. **Admin** → Section Hero
2. **Champ "CV (PDF)"**
3. **Clique "📄 Upload PDF"**
4. **Sélectionne ton CV** (fichier .pdf)
5. ⏳ **Attends** (bouton devient "⏳ Upload...")
6. ✅ **CV uploadé !**
7. **Un lien "📄 Voir le CV actuel"** apparaît
8. **Clique "Enregistrer"**
9. ✅ **Le CV est disponible** dans le header !

### Tester le téléchargement

1. **Va sur le site** : `http://personal-website.local`
2. **Clique sur "Télécharger mon CV"** (en haut à droite)
3. ✅ **Ton CV se télécharge** !

## 📊 Formats acceptés

- **PDF** ✅ (recommandé)
- **Taille max** : 10 MB

## 💡 Exemples

### Exemple 1 : Upload depuis ton PC

```
1. Admin → Section Hero → CV (PDF)
2. Clique "📄 Upload PDF"
3. Sélectionne C:\Documents\CV_Anthony_Legros.pdf
4. ⏳ Upload...
5. ✅ URL : /uploads/images/1696512345678-123456789.pdf
6. Lien "📄 Voir le CV actuel" apparaît
7. Enregistre
8. ✅ CV disponible dans le header !
```

### Exemple 2 : URL externe

```
1. Admin → Section Hero → CV (PDF)
2. Colle : https://example.com/mon-cv.pdf
3. Enregistre
4. ✅ CV disponible dans le header !
```

### Exemple 3 : Remplacer le CV

```
1. Admin → Section Hero → CV (PDF)
2. Clique "📄 Upload PDF"
3. Sélectionne un nouveau CV
4. ✅ L'ancien est remplacé
5. Enregistre
6. ✅ Nouveau CV disponible !
```

## 🔄 Workflow complet

```
1. Prépare ton CV (format PDF)
   ↓
2. Ouvre l'admin (admin / admin123)
   ↓
3. Section Hero → CV (PDF)
   ↓
4. Clique "📄 Upload PDF"
   ↓
5. Sélectionne ton CV
   ↓
6. ⏳ Upload automatique
   ↓
7. ✅ URL remplie + Lien de prévisualisation
   ↓
8. Clique "Enregistrer"
   ↓
9. ✅ CV disponible dans le header !
   ↓
10. Teste en cliquant sur "Télécharger mon CV"
```

## ✨ Avantages

1. **✅ Simple** - Upload en un clic
2. **✅ Automatique** - Lien mis à jour automatiquement
3. **✅ Flexible** - Upload local OU URL externe
4. **✅ Sécurisé** - Stockage local sur ton serveur
5. **✅ Pratique** - Visible directement dans le header

## 📁 Stockage

Les CV uploadés sont stockés dans :
```
uploads/images/
```

**Format du nom** :
```
[timestamp]-[random].pdf
Exemple : 1696512345678-987654321.pdf
```

## 🎯 Résultat final

**Gestion du CV ultra-simplifiée !**

- ✅ Champ CV dans Section Hero
- ✅ Bouton "📄 Upload PDF" 
- ✅ Upload depuis ton PC en un clic
- ✅ Lien de prévisualisation
- ✅ Compatible avec URLs externes
- ✅ Mise à jour automatique dans le header
- ✅ Téléchargement fonctionnel

**Ton CV est maintenant facilement gérable et téléchargeable !** 📄✨

Date : 06/10/2025 - 11:10

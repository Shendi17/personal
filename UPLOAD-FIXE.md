# ✅ Upload fixé - Route en double supprimée !

## 🔧 Problème résolu

Il y avait **DEUX routes `/api/upload`** dans server.js :
1. Ligne 376 : `upload.single('file')` - Ancienne route
2. Ligne 452 : `upload.single('image')` - Nouvelle route

La première route interceptait toutes les requêtes avant la seconde, causant l'erreur "Unexpected field".

## ✅ Solution appliquée

L'ancienne route a été **commentée** (ligne 375-387 de server.js).

## 🔄 Serveur redémarré

Le serveur a été redémarré avec les modifications.

## 🧪 Test

L'endpoint `/api/upload` est maintenant fonctionnel et attend un champ nommé `'image'`.

## 💻 Pour utiliser l'upload dans l'admin

### 1. Vider le cache du navigateur

**IMPORTANT** : Le navigateur a mis en cache l'ancien JavaScript.

```
Ctrl + Shift + R
```

OU via DevTools :
1. F12
2. Clic droit sur ⟳ (bouton recharger)
3. "Vider le cache et effectuer une actualisation forcée"

### 2. Tester l'upload

1. **Ouvre l'admin** : http://personal-website.local
2. **Connecte-toi** (admin / admin123)
3. **Section Hero** → Champ "photo"
4. **Clique "📤 Upload"**
5. **Sélectionne une image** (JPG, PNG, GIF, WEBP)
6. ✅ **Devrait fonctionner !**

### 3. Tester le carrousel

1. **Section Hero** → Champ "carousel"
2. **Photo 1** → **Clique "📤 Upload"**
3. **Sélectionne une image**
4. ✅ **Devrait fonctionner !**

### 4. Tester le CV

1. **Section Hero** → Champ "CV (PDF)"
2. **Clique "📄 Upload PDF"**
3. **Sélectionne un fichier PDF**
4. ✅ **Devrait fonctionner !**

## 📋 Checklist finale

- [x] Route en double supprimée
- [x] Serveur redémarré
- [ ] Cache du navigateur vidé (`Ctrl + Shift + R`)
- [ ] Admin rechargé
- [ ] Upload testé

## 🎯 Formats acceptés

### Images
- JPEG / JPG ✅
- PNG ✅
- GIF ✅
- WEBP ✅

### Documents
- PDF ✅

### Limites
- **Taille max** : 10 MB
- **Stockage** : `uploads/images/`

## 🔍 Si ça ne fonctionne toujours pas

### Vérifier la console du navigateur

1. **F12** pour ouvrir DevTools
2. **Onglet Console**
3. **Cherche des erreurs** en rouge
4. **Partage-les**

### Vérifier les logs du serveur

Dans la console où `npm start` tourne :
- Erreurs en rouge ?
- Message "API backend démarrée sur http://localhost:3001" ?

### Forcer le rechargement complet

1. **Ferme tous les onglets** du site
2. **Vide le cache** : `Ctrl + Shift + Delete` → Cocher "Images et fichiers en cache"
3. **Rouvre** le site
4. **Teste** l'upload

## ✅ Résumé

**Le problème était une route en double dans server.js**

- ✅ Route en double supprimée
- ✅ Serveur redémarré
- ✅ Endpoint `/api/upload` fonctionnel
- ⏳ **Il faut juste vider le cache du navigateur !**

**Vide le cache avec `Ctrl + Shift + R` et l'upload fonctionnera !** 🎉

Date : 06/10/2025 - 13:00

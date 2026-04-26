# 🔄 Redémarrer le serveur pour activer l'upload

## ❌ Problème

L'upload ne fonctionne pas car le serveur a été démarré **AVANT** l'ajout du code d'upload. Les modifications ne sont pas actives.

## ✅ Solution : Redémarrer le serveur

### Méthode 1 : Via PowerShell

```powershell
# 1. Arrêter tous les processus Node
Get-Process -Name node | Stop-Process -Force

# 2. Attendre 2 secondes
Start-Sleep -Seconds 2

# 3. Redémarrer le serveur
npm start
```

### Méthode 2 : Via le script

```powershell
# Utilise le script de démarrage
.\start-server.ps1
```

### Méthode 3 : Manuellement

1. **Ouvre le Gestionnaire des tâches** (`Ctrl + Shift + Esc`)
2. **Cherche "Node.js"** dans les processus
3. **Clique droit** → "Fin de tâche"
4. **Ouvre PowerShell** dans le dossier du projet
5. **Tape** : `npm start`

## 🧪 Vérifier que ça fonctionne

### 1. Teste l'endpoint d'upload

```powershell
# Crée un fichier de test
"Test" | Out-File -FilePath test.txt

# Teste l'upload
$form = @{ image = Get-Item test.txt }
Invoke-RestMethod -Uri "http://localhost:3001/api/upload" -Method POST -Form $form

# Nettoie
Remove-Item test.txt
```

Si tu vois `{"success":true,...}`, l'upload fonctionne !

### 2. Teste dans l'admin

1. **Recharge la page** : `Ctrl + Shift + R`
2. **Ouvre l'admin** (admin / admin123)
3. **Section Hero** → Champ "photo"
4. **Clique "📤 Upload"**
5. **Sélectionne une image**
6. ✅ **Devrait fonctionner !**

## 📋 Checklist de dépannage

- [ ] Serveur redémarré (`Get-Process node | Stop-Process -Force` puis `npm start`)
- [ ] Cache du navigateur vidé (`Ctrl + Shift + R`)
- [ ] Admin rechargé
- [ ] Dossier `uploads/images/` existe
- [ ] Endpoint `/api/upload` accessible

## 🔍 Si ça ne fonctionne toujours pas

### Vérifier les logs du serveur

Regarde la console où le serveur tourne :
- Erreurs en rouge ?
- Message "API backend démarrée sur http://localhost:3001" ?

### Vérifier la console du navigateur

1. **F12** pour ouvrir DevTools
2. **Onglet Console**
3. **Cherche des erreurs** en rouge
4. **Partage-les** si tu en vois

### Vérifier que multer est bien installé

```powershell
npm list multer
```

Devrait afficher : `multer@1.4.5-lts.2`

## 🎯 Résumé

**Le serveur doit être redémarré pour activer l'upload !**

```powershell
# Commande rapide
Get-Process -Name node | Stop-Process -Force; Start-Sleep 2; npm start
```

Après redémarrage :
- ✅ Endpoint `/api/upload` actif
- ✅ Upload de photos fonctionne
- ✅ Upload de CV fonctionne
- ✅ Boutons "📤 Upload" fonctionnels

Date : 06/10/2025 - 12:42

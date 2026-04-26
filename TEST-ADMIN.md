# Guide de test de l'interface d'administration

## 🎯 Objectif
Vérifier que les modifications effectuées dans l'interface admin sont bien enregistrées et affichées sur la page publique.

## ✅ Prérequis

1. **Serveur Node.js démarré** :
   ```powershell
   cd C:\Users\Anthony\CascadeProjects\personal-website
   npm start
   ```
   Vous devriez voir : `API backend démarrée sur http://localhost:3001`

2. **Apache/WAMP démarré** :
   - Vérifiez que l'icône WAMP est verte
   - Apache doit être en cours d'exécution

3. **Navigateur ouvert** :
   - Ouvrez `http://personal-website.local`

## 📋 Procédure de test

### Test 1 : Modification de la section "À propos"

1. **Accéder à l'admin** :
   - Cliquez sur l'icône utilisateur en haut à droite (ou le bouton admin)
   - Le panneau latéral s'ouvre

2. **Se connecter** :
   - Utilisateur : `admin`
   - Mot de passe : `admin123`
   - Cliquez sur "Se connecter"

3. **Modifier la section** :
   - Dans le menu latéral, cliquez sur "À propos"
   - Modifiez le champ "title" : `Mon profil professionnel`
   - Modifiez le champ "text" : `Je suis un développeur passionné...`
   - Cliquez sur "Enregistrer"

4. **Vérifier le résultat** :
   - Un message "Données enregistrées avec succès !" s'affiche
   - La page se recharge automatiquement
   - Scrollez jusqu'à la section "À propos"
   - Vérifiez que vos modifications sont visibles

### Test 2 : Modification d'une liste (Projets)

1. **Accéder à l'admin** et se connecter (si nécessaire)

2. **Modifier les projets** :
   - Cliquez sur "Réalisations" dans le menu admin
   - Cliquez sur "Ajouter" pour ajouter un nouveau projet
   - Entrez le nom du projet : `Site web personnel`
   - Cliquez sur "Enregistrer"

3. **Vérifier le résultat** :
   - La page se recharge
   - Le nouveau projet apparaît dans la section "Réalisations"

### Test 3 : Vérification de la persistance

1. **Fermez le navigateur** complètement

2. **Rouvrez** `http://personal-website.local`

3. **Vérifiez** que les modifications sont toujours présentes
   - Les données sont stockées dans `db.json`
   - Elles persistent même après redémarrage du serveur

## 🐛 Résolution de problèmes

### Problème : "Erreur lors de l'enregistrement"

**Causes possibles** :
- Le serveur Node.js n'est pas démarré
- Le port 3001 est utilisé par un autre processus
- Problème de connexion à l'API

**Solutions** :
1. Vérifiez que le serveur tourne :
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -eq "node"}
   ```

2. Testez l'API directement :
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3001/api/about"
   ```

3. Vérifiez les logs dans la console du navigateur (F12)

### Problème : Les modifications ne s'affichent pas

**Causes possibles** :
- Cache du navigateur
- La page ne s'est pas rechargée
- Erreur JavaScript

**Solutions** :
1. Forcez le rechargement : `Ctrl + F5`
2. Videz le cache du navigateur
3. Vérifiez la console (F12) pour les erreurs JavaScript

### Problème : "Identifiants invalides"

**Solution** :
- Vérifiez que vous utilisez :
  - Utilisateur : `admin`
  - Mot de passe : `admin123`

## 📊 Vérification du fichier db.json

Après chaque modification, vous pouvez vérifier le fichier `db.json` :

```powershell
Get-Content C:\Users\Anthony\CascadeProjects\personal-website\db.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

Ou ouvrez le fichier directement dans un éditeur de texte.

## 🎉 Résultat attendu

Après ces tests, vous devriez avoir :
- ✅ Des modifications visibles sur la page publique
- ✅ Des données persistées dans `db.json`
- ✅ Un rechargement automatique après chaque enregistrement
- ✅ Des messages de confirmation clairs

## 📝 Notes

- Les modifications sont immédiates (pas besoin de redémarrer le serveur)
- Le fichier `db.json` est mis à jour en temps réel
- Toutes les sections peuvent être modifiées de la même manière
- Le rechargement de la page garantit l'affichage des dernières données

Date : 30/09/2025

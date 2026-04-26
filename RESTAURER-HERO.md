# 🔧 Restaurer la section Hero

## 🚨 Problème

La section Hero a disparu car le serveur Node.js n'a pas été redémarré après l'ajout de la configuration Hero.

## ✅ Solution en 3 étapes

### Étape 1 : Redémarrer le serveur Node.js

#### Option A : Via le terminal existant
1. **Trouve le terminal** où le serveur tourne (celui avec `npm start`)
2. **Appuie sur `Ctrl+C`** pour arrêter le serveur
3. **Tape** : `npm start`
4. **Attends** que le serveur démarre (tu verras "Serveur démarré sur le port 3001")

#### Option B : Via PowerShell
```powershell
# Arrêter tous les serveurs Node.js
Get-Process -Name node | Stop-Process -Force

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Redémarrer le serveur
npm start
```

### Étape 2 : Ajouter les données Hero

**Dans un NOUVEAU terminal PowerShell** (pendant que le serveur tourne) :

```powershell
cd C:\Users\Anthony\CascadeProjects\personal-website

# Attendre que le serveur soit prêt
Start-Sleep -Seconds 3

# Ajouter les données Hero
Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body '{"name":"Anthony Legros","title":"Technicien Polyvalent","subtitle":"Maintenance Industrielle | Solutions Techniques | Automatisation","linkedin":"https://linkedin.com/in/anthonylegros","github":"https://github.com/anthonylegros","visible":true}'
```

### Étape 3 : Recharger la page

1. **Va sur** : `http://personal-website.local`
2. **Appuie sur `F5`** ou `Ctrl+R` pour recharger
3. ✅ **La section Hero réapparaît !**

## 🧪 Vérification

### Vérifie que le serveur tourne
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/hero"
```

**Résultat attendu** :
```json
{
  "name": "Anthony Legros",
  "title": "Technicien Polyvalent",
  "subtitle": "Maintenance Industrielle | Solutions Techniques | Automatisation",
  "linkedin": "https://linkedin.com/in/anthonylegros",
  "github": "https://github.com/anthonylegros",
  "visible": true
}
```

### Vérifie la console du navigateur (F12)
Tu devrais voir :
```
Données Hero reçues: {name: "Anthony Legros", ...}
Section Hero mise à jour
```

## 🎯 Pourquoi la section a disparu ?

1. **Modifications du serveur** : J'ai ajouté la section Hero dans `server.js`
2. **Serveur pas redémarré** : Node.js ne recharge pas automatiquement les modifications
3. **Section inconnue** : Le serveur retournait "Section inconnue" pour Hero
4. **Affichage masqué** : Sans données, la section ne s'affiche pas

## 📋 Checklist de dépannage

- [ ] Le serveur Node.js tourne (vérifie avec `Get-Process -Name node`)
- [ ] Le serveur a été redémarré APRÈS les modifications de `server.js`
- [ ] Les données Hero ont été ajoutées via l'API
- [ ] La page a été rechargée (F5)
- [ ] La console ne montre pas d'erreurs (F12)

## 🔄 Script automatique (si besoin)

Si tu veux automatiser tout ça :

```powershell
# 1. Arrêter le serveur
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Attendre
Start-Sleep -Seconds 2

# 3. Redémarrer en arrière-plan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

# 4. Attendre le démarrage
Start-Sleep -Seconds 8

# 5. Ajouter Hero
Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body '{"name":"Anthony Legros","title":"Technicien Polyvalent","subtitle":"Maintenance Industrielle | Solutions Techniques | Automatisation","linkedin":"https://linkedin.com/in/anthonylegros","github":"https://github.com/anthonylegros","visible":true}'

Write-Host "✅ Terminé ! Recharge la page"
```

## 🎉 Résultat attendu

Après avoir suivi ces étapes, tu devrais voir :

```
┌─────────────────────────────────────┐
│                                     │
│         Anthony Legros              │
│                                     │
│    Technicien Polyvalent            │
│    Maintenance Industrielle |       │
│    Solutions Techniques |           │
│    Automatisation                   │
│                                     │
│    [LinkedIn]  [GitHub]             │
│                                     │
└─────────────────────────────────────┘
```

Date : 05/10/2025 - 09:50

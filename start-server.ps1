# Script PowerShell pour démarrer le serveur Node.js du site personnel
Write-Host "Démarrage du serveur Node.js pour personal-website..." -ForegroundColor Green

# Vérifier si Node.js est installé
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERREUR: Node.js n'est pas installé ou pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Aller dans le répertoire du projet
Set-Location "C:\Users\Anthony\CascadeProjects\personal-website"

# Vérifier si package.json existe
if (!(Test-Path "package.json")) {
    Write-Host "ERREUR: package.json introuvable dans le répertoire" -ForegroundColor Red
    exit 1
}

# Installer les dépendances si node_modules n'existe pas
if (!(Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Démarrer le serveur
Write-Host "Serveur disponible sur: http://personal-website.local" -ForegroundColor Cyan
Write-Host "API disponible sur: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Administration: http://personal-website.local/admin.html" -ForegroundColor Cyan
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow

npm start

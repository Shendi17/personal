# Script pour redémarrer le serveur et ajouter la section Hero

Write-Host "🔄 Arrêt du serveur Node.js..." -ForegroundColor Yellow

# Arrêter tous les processus Node.js
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "✅ Serveur arrêté" -ForegroundColor Green

Write-Host "`n🚀 Démarrage du serveur..." -ForegroundColor Cyan

# Démarrer le serveur en arrière-plan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal

Write-Host "⏳ Attente du démarrage du serveur (5 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`n🎯 Ajout de la section Hero..." -ForegroundColor Cyan

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance Industrielle | Solutions Techniques | Automatisation"
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$apiBase/hero" -Method PATCH -Headers $headers -Body $hero
    Write-Host "✅ Section Hero ajoutée avec succès !" -ForegroundColor Green
    Write-Host "`n📊 Données Hero :" -ForegroundColor Cyan
    $result.data | ConvertTo-Json
} catch {
    Write-Host "❌ Erreur lors de l'ajout de Hero : $_" -ForegroundColor Red
}

Write-Host "`n🎉 Terminé ! Recharge la page : http://personal-website.local" -ForegroundColor Green

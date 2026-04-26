# Script de démarrage complet du site avec section Hero

Write-Host "🚀 Démarrage du serveur Node.js..." -ForegroundColor Cyan

# Démarrer le serveur
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🔥 Serveur Node.js' -ForegroundColor Yellow; npm start"

Write-Host "⏳ Attente du démarrage (8 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

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
    Write-Host "✅ Section Hero ajoutée !" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Erreur Hero (normal si déjà existant) : $_" -ForegroundColor Yellow
}

Write-Host "`n✅ Serveur démarré et prêt !" -ForegroundColor Green
Write-Host "📝 Ouvre : http://personal-website.local" -ForegroundColor Cyan
Write-Host "🔐 Login admin : admin / admin123" -ForegroundColor Cyan
Write-Host "`n💡 Pour arrêter : Get-Process -Name node | Stop-Process" -ForegroundColor Gray

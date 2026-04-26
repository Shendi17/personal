# Script pour ajouter la section Hero dans l'admin

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "🎯 Ajout de la section Hero..." -ForegroundColor Cyan

# Section Hero avec données de démonstration
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance Industrielle | Solutions Techniques | Automatisation"
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/hero" -Method PATCH -Headers $headers -Body $hero
Write-Host "✅ Section Hero ajoutée" -ForegroundColor Green

Write-Host "`n🎉 Section Hero disponible dans l'admin !" -ForegroundColor Green
Write-Host "📝 Recharge la page : http://personal-website.local" -ForegroundColor Cyan

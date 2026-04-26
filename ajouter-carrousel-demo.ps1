# Script pour ajouter des photos de démonstration dans le carrousel Hero

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "🎠 Ajout de photos de démonstration dans le carrousel..." -ForegroundColor Cyan

# Mettre à jour Hero avec photo principale + carrousel
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance Industrielle | Solutions Techniques | Automatisation"
    photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200&bold=true"
    carousel = @(
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
    )
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$apiBase/hero" -Method PATCH -Headers $headers -Body $hero
    Write-Host "✅ Carrousel ajouté avec 4 photos !" -ForegroundColor Green
    Write-Host "`n📊 Photos du carrousel :" -ForegroundColor Cyan
    Write-Host "   1. 🏭 Maintenance industrielle" -ForegroundColor Gray
    Write-Host "   2. 💻 Technologie & IoT" -ForegroundColor Gray
    Write-Host "   3. 🌱 Énergie & Environnement" -ForegroundColor Gray
    Write-Host "   4. 🤖 Automatisation" -ForegroundColor Gray
} catch {
    Write-Host "❌ Erreur : $_" -ForegroundColor Red
}

Write-Host "`n💡 Prochaines étapes :" -ForegroundColor Yellow
Write-Host "   1. Recharge la page (Ctrl+Shift+R)" -ForegroundColor Gray
Write-Host "   2. Le carrousel s'affichera dans le Hero" -ForegroundColor Gray
Write-Host "   3. Tu peux modifier les photos dans l'admin (Section Hero → carousel)" -ForegroundColor Gray
Write-Host "`n🎨 Pour personnaliser :" -ForegroundColor Cyan
Write-Host "   - Admin → Section Hero → carousel" -ForegroundColor Gray
Write-Host "   - Clique sur une photo pour la modifier" -ForegroundColor Gray
Write-Host "   - Clique 'Ajouter' pour en ajouter d'autres" -ForegroundColor Gray
Write-Host "   - Clique 'Supprimer' pour en retirer" -ForegroundColor Gray

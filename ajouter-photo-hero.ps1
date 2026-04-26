# Script pour ajouter une photo dans la section Hero

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "📸 Ajout de la photo dans Hero..." -ForegroundColor Cyan

# Mettre à jour Hero avec une photo de démonstration
$hero = @{
    name = "Anthony Legros"
    title = "Technicien Polyvalent"
    subtitle = "Maintenance Industrielle | Solutions Techniques | Automatisation"
    photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200&bold=true"
    linkedin = "https://linkedin.com/in/anthonylegros"
    github = "https://github.com/anthonylegros"
    visible = $true
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$apiBase/hero" -Method PATCH -Headers $headers -Body $hero
    Write-Host "✅ Photo ajoutée dans Hero !" -ForegroundColor Green
    Write-Host "`n📊 Données Hero :" -ForegroundColor Cyan
    $result.data | ConvertTo-Json
} catch {
    Write-Host "❌ Erreur : $_" -ForegroundColor Red
}

Write-Host "`n💡 Tu peux maintenant :" -ForegroundColor Yellow
Write-Host "   1. Recharger la page (Ctrl+Shift+R)" -ForegroundColor Gray
Write-Host "   2. Voir ta photo de profil dans le Hero" -ForegroundColor Gray
Write-Host "   3. La modifier dans l'admin (Section Hero → photo)" -ForegroundColor Gray
Write-Host "`n🎨 Sources d'images recommandées :" -ForegroundColor Cyan
Write-Host "   - UI Avatars : https://ui-avatars.com/api/?name=Ton+Nom" -ForegroundColor Gray
Write-Host "   - Gravatar : https://www.gravatar.com/avatar/[hash]" -ForegroundColor Gray
Write-Host "   - Unsplash : https://images.unsplash.com/photo-xxx" -ForegroundColor Gray
Write-Host "   - Image locale : /images/profile.jpg" -ForegroundColor Gray

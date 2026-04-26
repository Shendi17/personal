# Script pour ajouter un CV de démo dans Hero

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "📄 Ajout du CV de démo dans Hero..." -ForegroundColor Cyan

# Récupérer les données Hero actuelles
try {
    $currentHero = Invoke-RestMethod -Uri "$apiBase/hero"
    
    # Ajouter le CV de démo (lien vers un CV exemple)
    $currentHero.cv = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    
    # Mettre à jour Hero
    $heroJson = $currentHero | ConvertTo-Json -Depth 10
    Invoke-RestMethod -Uri "$apiBase/hero" -Method PATCH -Headers $headers -Body $heroJson | Out-Null
    
    Write-Host "✅ CV de démo ajouté !" -ForegroundColor Green
    Write-Host "📍 URL : $($currentHero.cv)" -ForegroundColor Cyan
    Write-Host "`n💡 Pour ajouter ton propre CV :" -ForegroundColor Yellow
    Write-Host "   1. Admin → Section Hero → CV (PDF)" -ForegroundColor Gray
    Write-Host "   2. Clique '📄 Upload PDF'" -ForegroundColor Gray
    Write-Host "   3. Sélectionne ton CV" -ForegroundColor Gray
    Write-Host "   4. Enregistre" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Erreur : $_" -ForegroundColor Red
}

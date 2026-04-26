# Script pour nettoyer les réseaux sociaux avec URL vide

Write-Host "🧹 Nettoyage des réseaux sociaux..." -ForegroundColor Cyan

# Récupérer les données actuelles
$response = Invoke-RestMethod -Uri "http://localhost:3001/api/social"

Write-Host "📊 Données actuelles :" -ForegroundColor Yellow
$response.social | ForEach-Object {
    Write-Host "  - URL: '$($_.url)' | Icon: $($_.icon)" -ForegroundColor Gray
}

# Filtrer les items avec URL non vide
$cleanedSocial = $response.social | Where-Object { $_.url -and $_.url.Trim() -ne '' }

Write-Host "`n🔍 Items avec URL vide trouvés : $($response.social.Count - $cleanedSocial.Count)" -ForegroundColor Yellow

if ($cleanedSocial.Count -lt $response.social.Count) {
    Write-Host "🧹 Suppression des items vides..." -ForegroundColor Cyan
    
    $body = @{
        social = $cleanedSocial
    } | ConvertTo-Json -Depth 10
    
    try {
        $result = Invoke-RestMethod -Uri "http://localhost:3001/api/social" `
                                    -Method PATCH `
                                    -Headers @{"Content-Type"="application/json"} `
                                    -Body $body
        
        Write-Host "`n✅ Réseaux sociaux nettoyés !" -ForegroundColor Green
        Write-Host "📊 Nombre de réseaux restants : $($cleanedSocial.Count)" -ForegroundColor Cyan
        Write-Host "🔄 Recharge la page : Ctrl + Shift + R" -ForegroundColor Yellow
    } catch {
        Write-Host "`n❌ Erreur : $_" -ForegroundColor Red
    }
} else {
    Write-Host "`n✅ Aucun item vide trouvé !" -ForegroundColor Green
}

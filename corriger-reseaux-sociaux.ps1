# Script pour corriger les données des réseaux sociaux

Write-Host "🔧 Correction des réseaux sociaux..." -ForegroundColor Cyan

# Récupérer les données actuelles
$response = Invoke-RestMethod -Uri "http://localhost:3001/api/social"

Write-Host "📊 Données actuelles :" -ForegroundColor Yellow
Write-Host ($response | ConvertTo-Json -Depth 10) -ForegroundColor Gray

# Vérifier si les données sont au bon format
$needsFix = $false
foreach ($item in $response.social) {
    if ($item -is [string]) {
        $needsFix = $true
        break
    }
}

if ($needsFix) {
    Write-Host "`n⚠️ Les données sont au mauvais format (strings au lieu d'objets)" -ForegroundColor Yellow
    Write-Host "💡 Solution : Réinitialise avec le bouton '🔄 Réinitialiser l'ordre' dans l'admin" -ForegroundColor Cyan
    Write-Host "`nOu utilise cette commande pour corriger manuellement :" -ForegroundColor Yellow
    
    # Créer les données corrigées
    $correctedSocial = @(
        @{
            url = "https://linkedin.com/in/anthonylegros"
            icon = "fab fa-linkedin"
        },
        @{
            url = "https://github.com/anthonylegros"
            icon = "fab fa-github"
        },
        @{
            url = "https://twitter.com/anthonylegros"
            icon = "fab fa-twitter"
        }
    )
    
    $body = @{
        social = $correctedSocial
    } | ConvertTo-Json -Depth 10
    
    Write-Host "`n📝 Données corrigées :" -ForegroundColor Green
    Write-Host $body -ForegroundColor Gray
    
    # Appliquer la correction
    try {
        $result = Invoke-RestMethod -Uri "http://localhost:3001/api/social" `
                                    -Method PATCH `
                                    -Headers @{"Content-Type"="application/json"} `
                                    -Body $body
        
        Write-Host "`n✅ Réseaux sociaux corrigés !" -ForegroundColor Green
        Write-Host "🔄 Recharge la page : Ctrl + Shift + R" -ForegroundColor Cyan
    } catch {
        Write-Host "`n❌ Erreur : $_" -ForegroundColor Red
    }
} else {
    Write-Host "`n✅ Les données sont déjà au bon format !" -ForegroundColor Green
}

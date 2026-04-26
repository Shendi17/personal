# Script pour tester l'upload d'une image

Write-Host "🧪 Test de l'upload d'image..." -ForegroundColor Cyan

# Créer une petite image PNG de test (1x1 pixel transparent)
$pngBytes = [Convert]::FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==")
[System.IO.File]::WriteAllBytes("$PWD\test-image.png", $pngBytes)

Write-Host "📄 Image de test créée : test-image.png" -ForegroundColor Gray

try {
    # Tester l'upload
    $form = @{
        image = Get-Item "test-image.png"
    }
    
    Write-Host "📤 Upload en cours..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/upload" -Method POST -Form $form
    
    Write-Host "✅ Upload réussi !" -ForegroundColor Green
    Write-Host "📍 URL : $($response.url)" -ForegroundColor Cyan
    Write-Host "📊 Taille : $($response.size) bytes" -ForegroundColor Gray
    Write-Host "📝 Nom : $($response.filename)" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Erreur lors de l'upload" -ForegroundColor Red
    Write-Host "Message : $($_.Exception.Message)" -ForegroundColor Yellow
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Détails : $($_.ErrorDetails.Message)" -ForegroundColor Yellow
    }
} finally {
    # Nettoyer
    Remove-Item "test-image.png" -ErrorAction SilentlyContinue
    Write-Host "`n🧹 Fichier de test supprimé" -ForegroundColor Gray
}

Write-Host "`n💡 Si l'upload fonctionne ici, le problème vient du navigateur (cache)" -ForegroundColor Cyan
Write-Host "   Vide le cache : Ctrl + Shift + R" -ForegroundColor Gray

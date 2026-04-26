# Script pour uploader une photo et l'ajouter au Hero

param(
    [Parameter(Mandatory=$false)]
    [string]$ImagePath,
    
    [Parameter(Mandatory=$false)]
    [switch]$AddToCarousel
)

Write-Host "📸 Upload de photo pour le Hero" -ForegroundColor Cyan

# Si aucun chemin n'est fourni, ouvrir un dialogue de sélection
if (-not $ImagePath) {
    Add-Type -AssemblyName System.Windows.Forms
    $openFileDialog = New-Object System.Windows.Forms.OpenFileDialog
    $openFileDialog.Filter = "Images (*.jpg;*.jpeg;*.png;*.gif;*.webp)|*.jpg;*.jpeg;*.png;*.gif;*.webp"
    $openFileDialog.Title = "Sélectionne une image"
    
    if ($openFileDialog.ShowDialog() -eq 'OK') {
        $ImagePath = $openFileDialog.FileName
    } else {
        Write-Host "❌ Aucune image sélectionnée" -ForegroundColor Red
        exit
    }
}

# Vérifier que le fichier existe
if (-not (Test-Path $ImagePath)) {
    Write-Host "❌ Fichier introuvable : $ImagePath" -ForegroundColor Red
    exit
}

Write-Host "📤 Upload de : $ImagePath" -ForegroundColor Yellow

# Upload de l'image
try {
    $form = @{
        image = Get-Item -Path $ImagePath
    }
    
    $uploadResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/upload" -Method POST -Form $form
    $photoUrl = $uploadResponse.url
    
    Write-Host "✅ Image uploadée avec succès !" -ForegroundColor Green
    Write-Host "📍 URL : $photoUrl" -ForegroundColor Cyan
    
    # Récupérer les données Hero actuelles
    $currentHero = Invoke-RestMethod -Uri "http://localhost:3001/api/hero"
    
    # Mettre à jour Hero
    if ($AddToCarousel) {
        # Ajouter au carrousel
        $carousel = @($currentHero.carousel)
        $carousel += $photoUrl
        $currentHero.carousel = $carousel
        Write-Host "➕ Photo ajoutée au carrousel" -ForegroundColor Green
    } else {
        # Remplacer la photo principale
        $currentHero.photo = $photoUrl
        Write-Host "🖼️ Photo principale mise à jour" -ForegroundColor Green
    }
    
    # Sauvegarder
    $heroJson = $currentHero | ConvertTo-Json -Depth 10
    Invoke-RestMethod -Uri "http://localhost:3001/api/hero" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body $heroJson | Out-Null
    
    Write-Host "`n✅ Hero mis à jour !" -ForegroundColor Green
    Write-Host "📝 Recharge la page pour voir les changements" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Erreur lors de l'upload : $_" -ForegroundColor Red
}

Write-Host "`n💡 Exemples d'utilisation :" -ForegroundColor Yellow
Write-Host "   .\upload-photo.ps1                    # Ouvre un dialogue de sélection" -ForegroundColor Gray
Write-Host "   .\upload-photo.ps1 -ImagePath photo.jpg    # Upload photo principale" -ForegroundColor Gray
Write-Host "   .\upload-photo.ps1 -ImagePath photo.jpg -AddToCarousel    # Ajoute au carrousel" -ForegroundColor Gray

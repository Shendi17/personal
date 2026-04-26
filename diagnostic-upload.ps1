# Script de diagnostic complet pour l'upload

Write-Host "🔍 Diagnostic de l'upload" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# 1. Vérifier que le serveur tourne
Write-Host "`n1️⃣ Vérification du serveur..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "✅ Serveur Node.js en cours d'exécution" -ForegroundColor Green
    $nodeProcesses | ForEach-Object {
        Write-Host "   PID: $($_.Id) | Démarré: $($_.StartTime)" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Aucun serveur Node.js en cours d'exécution" -ForegroundColor Red
    Write-Host "   Démarre le serveur avec: npm start" -ForegroundColor Yellow
    exit
}

# 2. Vérifier que l'API répond
Write-Host "`n2️⃣ Vérification de l'API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/hero" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ API accessible sur http://localhost:3001" -ForegroundColor Green
} catch {
    Write-Host "❌ API non accessible sur http://localhost:3001" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Yellow
    exit
}

# 3. Vérifier que le dossier uploads existe
Write-Host "`n3️⃣ Vérification du dossier uploads..." -ForegroundColor Yellow
$uploadsDir = Join-Path $PWD "uploads\images"
if (Test-Path $uploadsDir) {
    Write-Host "✅ Dossier uploads/images existe" -ForegroundColor Green
    Write-Host "   Chemin: $uploadsDir" -ForegroundColor Gray
} else {
    Write-Host "⚠️ Dossier uploads/images n'existe pas, création..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $uploadsDir -Force | Out-Null
    Write-Host "✅ Dossier créé" -ForegroundColor Green
}

# 4. Vérifier le fichier server.js
Write-Host "`n4️⃣ Vérification de la configuration server.js..." -ForegroundColor Yellow
$serverContent = Get-Content "server.js" -Raw
if ($serverContent -match "app\.post\('/api/upload', upload\.single\('image'\)") {
    Write-Host "✅ Route /api/upload configurée avec upload.single('image')" -ForegroundColor Green
} else {
    Write-Host "❌ Route /api/upload non trouvée ou mal configurée" -ForegroundColor Red
}

if ($serverContent -match "// app\.post\('/api/upload', upload\.single\('file'\)") {
    Write-Host "✅ Ancienne route commentée" -ForegroundColor Green
} else {
    Write-Host "⚠️ Ancienne route peut-être encore active" -ForegroundColor Yellow
}

# 5. Tester l'endpoint d'upload avec une vraie image
Write-Host "`n5️⃣ Test de l'endpoint d'upload..." -ForegroundColor Yellow

# Créer une petite image PNG valide (pixel transparent)
$pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
$pngBytes = [Convert]::FromBase64String($pngBase64)
$tempFile = Join-Path $env:TEMP "test-upload.png"
[System.IO.File]::WriteAllBytes($tempFile, $pngBytes)

Write-Host "   Fichier de test créé: $tempFile" -ForegroundColor Gray

# Utiliser curl.exe (plus fiable)
if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
    Write-Host "   Utilisation de curl.exe..." -ForegroundColor Gray
    $curlResult = & curl.exe -s -X POST -F "image=@$tempFile" http://localhost:3001/api/upload 2>&1
    
    if ($curlResult -match '"success":true') {
        Write-Host "✅ Upload réussi !" -ForegroundColor Green
        Write-Host "   Réponse: $curlResult" -ForegroundColor Gray
    } else {
        Write-Host "❌ Upload échoué" -ForegroundColor Red
        Write-Host "   Réponse: $curlResult" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ curl.exe non disponible, test ignoré" -ForegroundColor Yellow
}

Remove-Item $tempFile -ErrorAction SilentlyContinue

# 6. Vérifier les fichiers JavaScript
Write-Host "`n6️⃣ Vérification des fichiers JavaScript..." -ForegroundColor Yellow
$adminRenderPath = "js\admin\admin-render.js"
if (Test-Path $adminRenderPath) {
    $adminRenderContent = Get-Content $adminRenderPath -Raw
    $uploadCount = ([regex]::Matches($adminRenderContent, "fetch\('http://localhost:3001/api/upload'")).Count
    Write-Host "✅ Fichier admin-render.js trouvé" -ForegroundColor Green
    Write-Host "   Nombre d'appels à /api/upload: $uploadCount" -ForegroundColor Gray
} else {
    Write-Host "❌ Fichier admin-render.js non trouvé" -ForegroundColor Red
}

# Résumé
Write-Host "`n" + ("=" * 50) -ForegroundColor Gray
Write-Host "📊 RÉSUMÉ" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

Write-Host "`n💡 Actions recommandées :" -ForegroundColor Yellow
Write-Host "   1. Vide le cache du navigateur : Ctrl + Shift + R" -ForegroundColor Gray
Write-Host "   2. Ouvre la console du navigateur : F12" -ForegroundColor Gray
Write-Host "   3. Essaie d'uploader une image dans l'admin" -ForegroundColor Gray
Write-Host "   4. Regarde les erreurs dans la console" -ForegroundColor Gray
Write-Host "   5. Partage les erreurs si le problème persiste" -ForegroundColor Gray

Write-Host "`n🔗 URLs à tester :" -ForegroundColor Cyan
Write-Host "   - Site: http://personal-website.local" -ForegroundColor Gray
Write-Host "   - API: http://localhost:3001/api/hero" -ForegroundColor Gray
Write-Host "   - Upload: http://localhost:3001/api/upload" -ForegroundColor Gray

# Script pour ajouter les IDs manquants dans index.html

$indexPath = "C:\Users\Anthony\CascadeProjects\personal-website\index.html"
$content = Get-Content $indexPath -Raw

# Sauvegarder l'original
Copy-Item $indexPath "$indexPath.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

# Timeline
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Mon Parcours</h2>', '<h2 id="timeline-title" class="text-3xl font-bold text-center mb-12">Mon Parcours</h2>'
$content = $content -replace '<ol class="timeline-horizontal flex items-center gap-12', '<ol id="timeline-steps" class="timeline-horizontal flex items-center gap-12'

# Projects Carousel
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Réalisations marquantes</h2>', '<h2 id="projects-title" class="text-3xl font-bold text-center mb-12">Réalisations marquantes</h2>'
$content = $content -replace '<div class="carousel-container mx-auto max-w-3xl relative">', '<div id="projects-list" class="carousel-container mx-auto max-w-3xl relative">'

# Stats
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Chiffres clés</h2>', '<h2 id="stats-title" class="text-3xl font-bold text-center mb-12">Chiffres clés</h2>'
$content = $content -replace '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">', '<div id="stats-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">'

# Services
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Mes services</h2>', '<h2 id="services-title" class="text-3xl font-bold text-center mb-12">Mes services</h2>'
$content = $content -replace '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">', '<div id="services-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">' -replace 'id="services-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">\s+<div class="service-card', 'id="services-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">' + "`n                <div class='service-card'"

# Shop
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Ma boutique</h2>', '<h2 id="shop-title" class="text-3xl font-bold text-center mb-12">Ma boutique</h2>'
$content = $content -replace 'id="shop"[^>]*>\s+<h2 id="shop-title"[^>]*>[^<]+</h2>\s+<div class="grid', 'id="shop" class="py-16 animate-fadeInUp">' + "`n            <h2 id=`"shop-title`" class=`"text-3xl font-bold text-center mb-12`">Ma boutique</h2>`n            <div id=`"shop-products`" class=`"grid"

# Don
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-8">Faire un don</h2>', '<h2 id="don-title" class="text-3xl font-bold text-center mb-8">Faire un don</h2>'

# Blog
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Blog</h2>', '<h2 id="blog-title" class="text-3xl font-bold text-center mb-12">Blog</h2>'

# Liens utiles
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Liens utiles</h2>', '<h2 id="liens-title" class="text-3xl font-bold text-center mb-12">Liens utiles</h2>'

# Testimonials
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Témoignages</h2>', '<h2 id="testimonials-title" class="text-3xl font-bold text-center mb-12">Témoignages</h2>'

# FAQ
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">FAQ</h2>', '<h2 id="faq-title" class="text-3xl font-bold text-center mb-12">FAQ</h2>'

# Team
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">L''équipe</h2>', '<h2 id="team-title" class="text-3xl font-bold text-center mb-12">L''équipe</h2>'

# Events
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Actualités & Événements</h2>', '<h2 id="events-title" class="text-3xl font-bold text-center mb-12">Actualités & Événements</h2>'

# Files
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Fichiers à télécharger</h2>', '<h2 id="files-title" class="text-3xl font-bold text-center mb-12">Fichiers à télécharger</h2>'

# Social
$content = $content -replace '<h2 class="text-3xl font-bold text-center mb-12">Réseaux sociaux</h2>', '<h2 id="social-title" class="text-3xl font-bold text-center mb-12">Réseaux sociaux</h2>'

# Sauvegarder
$content | Set-Content $indexPath -Encoding UTF8

Write-Host "✅ IDs ajoutés avec succès !" -ForegroundColor Green
Write-Host "📁 Backup créé : $indexPath.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')" -ForegroundColor Cyan

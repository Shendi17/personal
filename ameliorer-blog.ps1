# Script pour améliorer la section Blog avec images et aperçus

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "📰 Amélioration de la section Blog..." -ForegroundColor Cyan

# Blog amélioré avec images et aperçus
$blog = @{
    title = "Blog"
    visible = $true
    articles = @(
        @{
            title = "Les bonnes pratiques de maintenance préventive"
            excerpt = "Découvrez comment mettre en place une stratégie de maintenance préventive efficace pour réduire les pannes et optimiser la durée de vie de vos équipements industriels."
            image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
            link = "https://example.com/blog/maintenance-preventive"
            date = "15 Mars 2024"
            author = "Anthony Legros"
        },
        @{
            title = "IoT et Industrie 4.0 : Guide complet"
            excerpt = "L'Internet des Objets révolutionne l'industrie. Apprenez à intégrer des capteurs IoT pour le monitoring en temps réel et la maintenance prédictive de vos installations."
            image = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
            link = "https://example.com/blog/iot-industrie"
            date = "8 Mars 2024"
            author = "Anthony Legros"
        },
        @{
            title = "Optimiser la consommation énergétique de vos équipements"
            excerpt = "Réduisez vos coûts énergétiques jusqu'à 30% grâce à des techniques d'optimisation simples et efficaces. Découvrez les meilleures pratiques pour une industrie plus verte."
            image = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
            link = "https://example.com/blog/energie"
            date = "1 Mars 2024"
            author = "Anthony Legros"
        },
        @{
            title = "Automatisation : Par où commencer ?"
            excerpt = "Guide pratique pour démarrer votre projet d'automatisation industrielle. De l'analyse des besoins au choix des technologies, suivez notre méthodologie éprouvée."
            image = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
            link = "https://example.com/blog/automatisation"
            date = "22 Février 2024"
            author = "Anthony Legros"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/blog" -Method PATCH -Headers $headers -Body $blog
Write-Host "✅ Blog amélioré avec images et aperçus" -ForegroundColor Green

Write-Host "`n🎉 Section Blog améliorée avec succès !" -ForegroundColor Green
Write-Host "📝 Recharge la page : http://personal-website.local" -ForegroundColor Cyan

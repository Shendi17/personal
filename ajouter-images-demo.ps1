# Script pour ajouter les images aux données de démonstration

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "🖼️ Ajout des images aux données de démonstration..." -ForegroundColor Cyan

# Réalisations avec images
$projects = @{
    title = "Réalisations marquantes"
    visible = $true
    projects = @(
        @{
            title = "Supervision IoT Usine"
            description = "Déploiement d'un système de monitoring connecté pour la maintenance prédictive"
            image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            tags = @("IoT", "Industrie 4.0", "Monitoring")
        },
        @{
            title = "Interface Web Maintenance"
            description = "Application web pour la gestion des interventions et le suivi des équipements"
            image = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
            tags = @("Web", "JavaScript", "Tailwind")
        },
        @{
            title = "Optimisation énergétique"
            description = "Système d'analyse pour réduire la consommation énergétique des machines"
            image = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
            tags = @("Énergie", "Optimisation", "Green Tech")
        },
        @{
            title = "Support technique 24/7"
            description = "Service de support technique réactif avec base de connaissances interactive"
            image = "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80"
            tags = @("Support", "24/7", "Assistance")
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/projects-carousel" -Method PATCH -Headers $headers -Body $projects
Write-Host "✅ Réalisations avec images" -ForegroundColor Green

# Boutique avec images
$shop = @{
    title = "Ma boutique"
    visible = $true
    products = @(
        @{
            name = "Audit technique"
            description = "Diagnostic complet de vos installations industrielles"
            price = "149€"
            image = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
        },
        @{
            name = "Pack maintenance"
            description = "Forfait d'interventions préventives et correctives sur site"
            price = "399€"
            image = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80"
        },
        @{
            name = "Formation personnalisée"
            description = "Sessions sur-mesure en automatisme, IoT ou maintenance industrielle"
            price = "249€"
            image = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/shop" -Method PATCH -Headers $headers -Body $shop
Write-Host "✅ Boutique avec images" -ForegroundColor Green

# Équipe avec photos
$team = @{
    title = "L'équipe"
    visible = $true
    members = @(
        @{
            name = "Anthony Legros"
            role = "Technicien Polyvalent"
            photo = "https://ui-avatars.com/api/?name=Anthony+Legros&background=2563eb&color=fff&size=200"
        },
        @{
            name = "Sophie Bernard"
            role = "Assistante technique"
            photo = "https://ui-avatars.com/api/?name=Sophie+Bernard&background=10b981&color=fff&size=200"
        },
        @{
            name = "Marc Dubois"
            role = "Développeur IoT"
            photo = "https://ui-avatars.com/api/?name=Marc+Dubois&background=8b5cf6&color=fff&size=200"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/team" -Method PATCH -Headers $headers -Body $team
Write-Host "✅ Équipe avec photos" -ForegroundColor Green

Write-Host "`n🎉 Images ajoutées avec succès !" -ForegroundColor Green
Write-Host "📝 Recharge la page : http://personal-website.local" -ForegroundColor Cyan

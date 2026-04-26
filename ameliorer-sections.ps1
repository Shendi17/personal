# Script pour améliorer la présentation des sections Timeline, Stats et Services

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "🎨 Amélioration des sections Timeline, Stats et Services..." -ForegroundColor Cyan

# 1. Timeline améliorée avec dates, lieux et descriptions
$timeline = @{
    title = "Mon Parcours"
    visible = $true
    steps = @(
        @{
            date = "2023 - Présent"
            title = "Technicien Polyvalent"
            company = "Solutions Techniques Avancées"
            description = "Expertise en maintenance industrielle, automatisation et développement de solutions IoT"
            icon = "fas fa-briefcase"
        },
        @{
            date = "2020 - 2023"
            title = "Technicien de Maintenance"
            company = "IndustrielX"
            description = "Maintenance préventive et corrective, amélioration continue, formation des équipes"
            icon = "fas fa-tools"
        },
        @{
            date = "2018 - 2020"
            title = "Formation BTS Maintenance"
            company = "Lycée Technique"
            description = "Spécialisation en maintenance des systèmes industriels et automatisation"
            icon = "fas fa-graduation-cap"
        },
        @{
            date = "2016 - 2018"
            title = "Bac Pro MEI"
            company = "Lycée Professionnel"
            description = "Maintenance des Équipements Industriels - Formation initiale"
            icon = "fas fa-school"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/timeline" -Method PATCH -Headers $headers -Body $timeline
Write-Host "✅ Timeline améliorée" -ForegroundColor Green

# 2. Statistiques améliorées avec icônes et couleurs
$stats = @{
    title = "Chiffres clés"
    visible = $true
    stats = @(
        @{
            number = "5+"
            label = "Années d'expérience"
            icon = "fas fa-calendar-alt"
            color = "blue"
        },
        @{
            number = "50+"
            label = "Projets réalisés"
            icon = "fas fa-project-diagram"
            color = "green"
        },
        @{
            number = "98%"
            label = "Satisfaction client"
            icon = "fas fa-smile"
            color = "yellow"
        },
        @{
            number = "120+"
            label = "Interventions techniques"
            icon = "fas fa-tools"
            color = "purple"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/stats" -Method PATCH -Headers $headers -Body $stats
Write-Host "✅ Statistiques améliorées" -ForegroundColor Green

# 3. Services améliorés avec icônes, descriptions et prix
$services = @{
    title = "Mes services"
    visible = $true
    services = @(
        @{
            title = "Maintenance industrielle"
            description = "Entretien, réparation et optimisation de vos équipements pour garantir leur performance et leur sécurité"
            icon = "fas fa-cogs"
            color = "blue"
            features = @("Préventive", "Corrective", "Optimisation")
        },
        @{
            title = "Automatisation & IoT"
            description = "Solutions connectées, supervision, automatisation des processus industriels et collecte de données"
            icon = "fas fa-network-wired"
            color = "green"
            features = @("IoT", "Monitoring", "Automatisation")
        },
        @{
            title = "Développement web"
            description = "Création de sites vitrines, applications métiers, interfaces de gestion et outils personnalisés"
            icon = "fas fa-laptop-code"
            color = "purple"
            features = @("Web Apps", "Interfaces", "API")
        },
        @{
            title = "Audit technique"
            description = "Diagnostic complet de vos installations, identification des points d'amélioration et recommandations"
            icon = "fas fa-clipboard-check"
            color = "orange"
            features = @("Diagnostic", "Analyse", "Recommandations")
        },
        @{
            title = "Formation"
            description = "Transfert de compétences, formation sur-mesure en maintenance, automatisation et technologies industrielles"
            icon = "fas fa-chalkboard-teacher"
            color = "red"
            features = @("Sur-mesure", "Pratique", "Certifiante")
        },
        @{
            title = "Support technique 24/7"
            description = "Assistance technique permanente, dépannage à distance et intervention rapide sur site si nécessaire"
            icon = "fas fa-headset"
            color = "teal"
            features = @("24/7", "À distance", "Sur site")
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/services" -Method PATCH -Headers $headers -Body $services
Write-Host "✅ Services améliorés" -ForegroundColor Green

Write-Host "`n🎉 Sections améliorées avec succès !" -ForegroundColor Green
Write-Host "📝 Recharge la page : http://personal-website.local" -ForegroundColor Cyan

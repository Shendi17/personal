# Script pour remplir toutes les sections avec des données de démonstration

$apiBase = "http://localhost:3001/api"
$headers = @{"Content-Type"="application/json"}

Write-Host "🚀 Remplissage des données de démonstration..." -ForegroundColor Cyan

# 1. À propos
$about = @{
    title = "À propos de moi"
    text = "Je suis un Technicien Polyvalent passionné par la maintenance industrielle et les solutions techniques. Mon expertise couvre un large éventail de compétences techniques, de la maintenance préventive et corrective à l'optimisation des équipements industriels. Je m'engage à assurer le bon fonctionnement des installations tout en contribuant à l'amélioration continue des processus."
    visible = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/about" -Method PATCH -Headers $headers -Body $about
Write-Host "✅ À propos" -ForegroundColor Green

# 2. Timeline
$timeline = @{
    title = "Mon Parcours"
    visible = $true
    steps = @(
        "2023 - Présent : Technicien Polyvalent - Solutions techniques avancées",
        "2020 - 2023 : Technicien de Maintenance - Maintenance préventive et corrective",
        "2018 - 2020 : Formation BTS Maintenance - Spécialisation industrielle",
        "2016 - 2018 : Bac Pro MEI - Maintenance des Équipements Industriels"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/timeline" -Method PATCH -Headers $headers -Body $timeline
Write-Host "✅ Timeline" -ForegroundColor Green

# 3. Réalisations
$projects = @{
    title = "Réalisations marquantes"
    visible = $true
    projects = @(
        "Automatisation d'une ligne de production - Gain de 30% de productivité",
        "Interface Web de gestion maintenance - Suivi en temps réel",
        "Optimisation système de ventilation - Réduction 25% consommation énergétique",
        "Installation système IoT - Monitoring équipements industriels"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/projects-carousel" -Method PATCH -Headers $headers -Body $projects
Write-Host "✅ Réalisations" -ForegroundColor Green

# 4. Statistiques
$stats = @{
    title = "Chiffres clés"
    visible = $true
    stats = @(
        "5+ années d'expérience",
        "50+ projets réalisés",
        "98% satisfaction client",
        "120+ interventions techniques"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/stats" -Method PATCH -Headers $headers -Body $stats
Write-Host "✅ Statistiques" -ForegroundColor Green

# 5. Services
$services = @{
    title = "Mes services"
    visible = $true
    services = @(
        "Maintenance industrielle - Préventive et corrective",
        "Automatisation & IoT - Solutions connectées",
        "Développement web - Applications métiers",
        "Audit technique - Diagnostic complet",
        "Formation - Transfert de compétences",
        "Support technique - Assistance 24/7"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/services" -Method PATCH -Headers $headers -Body $services
Write-Host "✅ Services" -ForegroundColor Green

# 6. Boutique
$shop = @{
    title = "Ma boutique"
    visible = $true
    products = @(
        "Audit technique - 149€",
        "Pack maintenance mensuel - 299€",
        "Formation personnalisée - 499€",
        "Consultation IoT - 199€"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/shop" -Method PATCH -Headers $headers -Body $shop
Write-Host "✅ Boutique" -ForegroundColor Green

# 7. Don
$don = @{
    title = "Faire un don"
    visible = $true
    customText = "Soutenez mes projets open-source et mes initiatives de formation gratuite pour les techniciens."
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/don" -Method PATCH -Headers $headers -Body $don
Write-Host "✅ Don" -ForegroundColor Green

# 8. Contact
$contact = @{
    title = "Contactez-moi"
    visible = $true
    email = "anthony.legros@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$apiBase/contact" -Method PATCH -Headers $headers -Body $contact
Write-Host "✅ Contact" -ForegroundColor Green

# 9. Blog
$blog = @{
    title = "Blog"
    visible = $true
    articles = @(
        @{
            title = "Les bonnes pratiques de maintenance préventive"
            link = "https://example.com/blog/maintenance-preventive"
        },
        @{
            title = "IoT et Industrie 4.0 : Guide complet"
            link = "https://example.com/blog/iot-industrie"
        },
        @{
            title = "Optimiser la consommation énergétique"
            link = "https://example.com/blog/energie"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/blog" -Method PATCH -Headers $headers -Body $blog
Write-Host "✅ Blog" -ForegroundColor Green

# 10. Liens utiles
$liens = @{
    title = "Liens utiles"
    visible = $true
    links = @(
        @{
            name = "Documentation technique"
            url = "https://docs.example.com"
        },
        @{
            name = "Forum maintenance industrielle"
            url = "https://forum.example.com"
        },
        @{
            name = "Catalogue fournisseurs"
            url = "https://catalogue.example.com"
        },
        @{
            name = "Normes et certifications"
            url = "https://normes.example.com"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/liens-utiles" -Method PATCH -Headers $headers -Body $liens
Write-Host "✅ Liens utiles" -ForegroundColor Green

# 11. Témoignages
$testimonials = @{
    title = "Témoignages"
    visible = $true
    testimonials = @(
        @{
            text = "Anthony a résolu notre problème de production en un temps record. Professionnel et efficace !"
            author = "Jean Dupont, Directeur Technique"
        },
        @{
            text = "Excellent travail sur l'automatisation de notre ligne. Résultats au-delà de nos espérances."
            author = "Marie Martin, Responsable Production"
        },
        @{
            text = "Un expert qui sait écouter et proposer des solutions adaptées. Je recommande vivement !"
            author = "Pierre Durand, Chef d'atelier"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/testimonials" -Method PATCH -Headers $headers -Body $testimonials
Write-Host "✅ Témoignages" -ForegroundColor Green

# 12. FAQ
$faq = @{
    title = "FAQ"
    visible = $true
    faq = @(
        @{
            question = "Quels sont vos délais d'intervention ?"
            answer = "Je m'engage à intervenir sous 24h pour les urgences et sous 48h pour les interventions planifiées."
        },
        @{
            question = "Travaillez-vous sur tous types d'équipements ?"
            answer = "Oui, je suis polyvalent et interviens sur la plupart des équipements industriels : mécanique, électrique, pneumatique, hydraulique."
        },
        @{
            question = "Proposez-vous des contrats de maintenance ?"
            answer = "Absolument ! Je propose des contrats de maintenance préventive adaptés à vos besoins et votre budget."
        },
        @{
            question = "Êtes-vous disponible en dehors des heures ouvrées ?"
            answer = "Oui, je propose un service d'astreinte 24/7 pour les urgences et interventions critiques."
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/faq" -Method PATCH -Headers $headers -Body $faq
Write-Host "✅ FAQ" -ForegroundColor Green

# 13. Équipe
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
Write-Host "✅ Équipe" -ForegroundColor Green

# 14. Événements
$events = @{
    title = "Actualités & Événements"
    visible = $true
    events = @(
        @{
            title = "Salon de la Maintenance Industrielle 2025"
            date = "15-17 Mars 2025"
            desc = "Retrouvez-moi au stand B42 pour échanger sur les dernières innovations en maintenance."
        },
        @{
            title = "Webinar : IoT et Maintenance Prédictive"
            date = "5 Avril 2025"
            desc = "Session en ligne gratuite sur l'utilisation de l'IoT pour anticiper les pannes."
        },
        @{
            title = "Formation : Automatisation Industrielle"
            date = "20-22 Mai 2025"
            desc = "Formation pratique de 3 jours sur l'automatisation des processus industriels."
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/events" -Method PATCH -Headers $headers -Body $events
Write-Host "✅ Événements" -ForegroundColor Green

# 15. Fichiers
$files = @{
    title = "Fichiers à télécharger"
    visible = $true
    files = @(
        @{
            originalname = "Guide_Maintenance_Preventive.pdf"
            url = "/downloads/guide-maintenance.pdf"
        },
        @{
            originalname = "Checklist_Securite.pdf"
            url = "/downloads/checklist-securite.pdf"
        },
        @{
            originalname = "Catalogue_Pieces_Detachees.pdf"
            url = "/downloads/catalogue-pieces.pdf"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/files" -Method PATCH -Headers $headers -Body $files
Write-Host "✅ Fichiers" -ForegroundColor Green

# 16. Réseaux sociaux
$social = @{
    title = "Réseaux sociaux"
    visible = $true
    social = @(
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
        },
        @{
            url = "https://youtube.com/@anthonylegros"
            icon = "fab fa-youtube"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$apiBase/social" -Method PATCH -Headers $headers -Body $social
Write-Host "✅ Réseaux sociaux" -ForegroundColor Green

Write-Host "`n🎉 Toutes les données de démonstration ont été ajoutées avec succès !" -ForegroundColor Green
Write-Host "📝 Recharge la page pour voir les modifications : http://personal-website.local" -ForegroundColor Cyan

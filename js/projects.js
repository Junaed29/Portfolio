/**
 * Projects Module (projects.js)
 *
 * Renders the projects section. Each project card shows a title, role/type,
 * one-line tagline, a short description, tech tags, and links (App Store,
 * GitHub, live demo).
 */

const projectsData = [
    {
        title: "MediVault AI",
        tagline: "Privacy-first on-device medical RAG",
        type: "Personal flagship / open source",
        description: "Open-source iOS app that runs a Qwen 2.5-1.5B LLM and a Core ML MiniLM embedder entirely on-device. Medical PDFs and photos are OCR-ingested, embedded, retrieved through cosine search over a GRDB vector store, then answered with cited sources via a GBNF-constrained typed JSON response. Measured 22 tokens per second median on iPhone 14 Pro and a three-layer medical-advice safety filter.",
        tech: ["Swift", "SwiftUI", "llama.cpp", "Core ML", "GRDB", "Apple Vision OCR", "RAG"],
        links: [
            { label: "GitHub", url: "https://github.com/Junaed29/MediVault-AI", icon: "fab fa-github" }
        ]
    },
    {
        title: "PilgrimPro",
        tagline: "Flutter app for Umrah and Hajj travel",
        type: "Theta Edge Berhad / current",
        description: "Cross-platform pilgrimage companion built in Flutter with a PHP/Laravel backend. As one of three mobile developers on the product team I am building booking, document upload, and trip management flows, integrating Senangpay payments through a hosted WebView, and I designed the team's GitHub Actions CI/CD workflow. Live on the App Store (pre-release).",
        tech: ["Flutter", "Dart", "PHP", "Laravel", "GitHub Actions", "Senangpay"],
        links: [
            { label: "App Store", url: "https://apps.apple.com/us/app/pilgrimpro/id6743296193", icon: "fab fa-app-store-ios" }
        ]
    },
    {
        title: "DailyTrack: Plan, Track, Achieve",
        tagline: "Gamified productivity with a GitHub-style streak heatmap",
        type: "Personal / live on App Store",
        description: "SwiftUI and SwiftData habit tracker with zero third-party dependencies. Features a custom calendar heatmap, an Apple Swift Charts streak visualization, smart task rollover, shareable social cards, full Dynamic Type and VoiceOver support, and a glassmorphism UI. Shipped end-to-end including Xcode Cloud CI/CD and App Store release.",
        tech: ["Swift", "SwiftUI", "SwiftData", "Swift Charts", "Combine", "Xcode Cloud"],
        links: [
            { label: "App Store", url: "https://apps.apple.com/il/app/dailytrack-plan-track-achieve/id6753106752", icon: "fab fa-app-store-ios" }
        ]
    },
    {
        title: "LinkBay: Smart Link Manager",
        tagline: "Offline-first link manager with CloudKit sync",
        type: "Personal / live on App Store",
        description: "Privacy-first link library with iCloud sync, Share Extension support for Safari, YouTube, and X, hand-rolled Open Graph extraction (~5 to 10× faster than LPMetadataProvider on average), tag and category filters, and an actor-isolated SwiftData repository. Zero tracking, zero accounts, all data local-first.",
        tech: ["Swift", "SwiftUI", "SwiftData", "CloudKit", "Share Extension", "LinkPresentation"],
        links: [
            { label: "App Store", url: "https://apps.apple.com/il/app/linkbay-smart-link-manager/id6753339145", icon: "fab fa-app-store-ios" }
        ]
    },
    {
        title: "TFMS: Task Force Management System",
        tagline: "M.Sc. capstone, Project Leader of a 6-person team",
        type: "UTM / Universiti Teknologi Malaysia",
        description: "Django 5 web app that replaces a faculty's spreadsheet workflow for assigning lecturers to academic task forces. Five role-based dashboards (Admin, HOD, PSM, Dean, Lecturer) wired through a multi-step approval workflow with audit logging, RBAC enforced via a custom mixin, PDF and Excel reporting via reportlab and openpyxl, and a configurable workload-fairness engine. I led six engineers through the full SE lifecycle and authored a MIL-STD-style documentation set (URS, SDP, SRS, SDD, STD, STR).",
        tech: ["Python", "Django 5", "Bootstrap 5", "PostgreSQL", "reportlab", "openpyxl"],
        links: [
            { label: "Live Demo", url: "https://junaed.pythonanywhere.com", icon: "fas fa-external-link-alt" },
            { label: "GitHub", url: "https://github.com/Junaed29/TFMS-CodeForce", icon: "fab fa-github" }
        ]
    },
    {
        title: "Hooray Health & WellCall 360",
        tagline: "White-label multi-tenant healthcare iOS apps",
        type: "Beyond Innovations & Technologies / 2024 to 2025",
        description: "Contributed to a shared Xcode project producing two App Store products on a 5-person iOS team. Led UIKit to SwiftUI migrations across major modules, built a MapKit-backed provider search over a REST backend, owned the onboarding flow, integrated Firebase Crashlytics and Cloud Messaging, and reviewed up to 15-20 pull requests per week while mentoring 2 junior iOS developers.",
        tech: ["Swift", "SwiftUI", "UIKit", "MapKit", "Firebase", "REST APIs"],
        links: [
            { label: "Hooray Health", url: "https://apps.apple.com/us/app/hooray-health/id1285135333", icon: "fab fa-app-store-ios" },
            { label: "WellCall 360", url: "https://apps.apple.com/us/app/wellcall360/id1485296723", icon: "fab fa-app-store-ios" }
        ]
    },
    {
        title: "Native Android Portfolio (4 production apps)",
        tagline: "Solo-shipped 2 of 4 Play Store apps, 30+ version releases over 3 years",
        type: "Beyond Innovations & Technologies / 2021 to 2024",
        description: "Owned full Play Store publishing across four production apps including Hooray Health Android (10K+ downloads, ~90% crash-free) and Purity, The Muhammadi Islam (5K+ downloads, 5-star average from 487 reviews). Solo-built WellCall 360 Android and Hooray Health 365 end-to-end. Modernized the stack across tenure: Java to Kotlin, XML to Jetpack Compose, LiveData to StateFlow, Groovy to Kotlin DSL Gradle.",
        tech: ["Kotlin", "Jetpack Compose", "Java", "XML", "Room", "Retrofit", "Coroutines", "Clean Architecture"],
        links: [
            { label: "Purity", url: "https://play.google.com/store/apps/details?id=com.sul.purity", icon: "fab fa-google-play" },
            { label: "WellCall 360", url: "https://play.google.com/store/apps/details?id=com.hoorayhealthcare.wellcall", icon: "fab fa-google-play" },
            { label: "Hooray Health 365", url: "https://play.google.com/store/apps/details?id=com.hoorayhealthcare.hoorayhealthsol", icon: "fab fa-google-play" }
        ]
    }
];

function initializeProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Remove any previous dynamic content (keep the section heading)
    projectsSection.querySelectorAll('.project').forEach(el => el.remove());

    projectsData.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';

        // Header row: title + type pill
        const header = document.createElement('div');
        header.className = 'project-header';

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;
        header.appendChild(projectTitle);

        if (project.type) {
            const typePill = document.createElement('span');
            typePill.className = 'project-type';
            typePill.textContent = project.type;
            header.appendChild(typePill);
        }
        projectDiv.appendChild(header);

        // Tagline
        if (project.tagline) {
            const tagline = document.createElement('p');
            tagline.className = 'project-tagline';
            tagline.textContent = project.tagline;
            projectDiv.appendChild(tagline);
        }

        // Description
        const description = document.createElement('p');
        description.className = 'project-description text-justify';
        description.textContent = project.description;
        projectDiv.appendChild(description);

        // Tech tags
        if (project.tech && project.tech.length) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'project-tags';
            project.tech.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = 'tech-tag';
                tagEl.textContent = tag;
                tagsContainer.appendChild(tagEl);
            });
            projectDiv.appendChild(tagsContainer);
        }

        // Links row
        if (project.links && project.links.length) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'project-links';
            project.links.forEach(link => {
                const linkEl = document.createElement('a');
                linkEl.href = link.url;
                linkEl.target = '_blank';
                linkEl.rel = 'noopener noreferrer';
                linkEl.className = 'project-link';
                linkEl.innerHTML = `<i class="${link.icon}"></i> ${link.label}`;
                linksContainer.appendChild(linkEl);
            });
            projectDiv.appendChild(linksContainer);
        }

        projectsSection.appendChild(projectDiv);
    });
}

window.initializeProjects = initializeProjects;

/**
 * Profile Module (profile.js)
 *
 * Holds Junaed's personal information in one place. Update values here and the
 * whole site reflects the change.
 */

const profileData = {
    name: "Junaed Muhammad Chowdhury",
    title: "Senior iOS Developer / iOS / Android / Flutter / On-Device AI",
    image: "assets/profile.jpeg",
    tagline: "Senior iOS Developer with 5+ years across native iOS, native Android, and cross-platform Flutter, with real depth in on-device AI/ML.",
    description: "I build polished, production-grade mobile apps and the on-device intelligence that makes them feel magical. Over 5+ years I have shipped native iOS (Swift / SwiftUI / SwiftData), native Android (Kotlin / Jetpack Compose), and cross-platform Flutter, owned full Play Store releases across 4 production apps (30+ releases), and mentored 2 junior iOS developers while reviewing 15 to 20 pull requests per week at peak. I am now Senior iOS Developer at Rakuten Trade, where I was the sole engineer on the SwiftUI rewrite of iSPEED.my, their multi-market stock trading app: 163 screens off a 649-file Objective-C codebase, rebuilt on The Composable Architecture. Alongside that I am completing an M.Sc. Software Engineering at UTM with a perfect 4.00 / 4.00 GPA. My flagship MediVault AI runs a Qwen 2.5 LLM on-device at ~22 tokens/sec via llama.cpp Metal, with a Core ML embedder and on-device RAG over private medical documents.",
    email: "junaed.dev@gmail.com",
    phone: "+60 11-3971 4017",
    location: "Kuala Lumpur, Malaysia",
    linkedin: "https://linkedin.com/in/junaed29",
    github: "https://github.com/Junaed29",
    resume: "assets/Junaed-Mobile-Engineer.pdf",
    availability: "Senior iOS Developer at Rakuten Trade. Kuala Lumpur, Malaysia.",
    stats: [
        { value: "5+", label: "Years in mobile" },
        { value: "4.00", label: "M.Sc. CGPA (UTM)" },
        { value: "163", label: "Screens rewritten in SwiftUI" },
        { value: "4", label: "Apps live on App Store" }
    ]
};

function initializeProfile() {
    document.title = `${profileData.name} / ${profileData.title}`;

    const headerNameEl = document.querySelector('header h1');
    if (headerNameEl) headerNameEl.textContent = profileData.name;

    const headerTitleEl = document.querySelector('header .header-title');
    if (headerTitleEl) headerTitleEl.textContent = profileData.title;

    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
            <p><i class="fas fa-envelope"></i> <a href="mailto:${profileData.email}">${profileData.email}</a></p>
            <p><i class="fas fa-phone"></i> <a href="tel:${profileData.phone.replace(/\s+/g, '')}">${profileData.phone}</a></p>
            <p><i class="fas fa-location-dot"></i> ${profileData.location}</p>
            <p class="social-links">
                <a href="${profileData.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="${profileData.github}" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><i class="fab fa-github"></i></a>
            </p>
        `;
    }

    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.src = profileData.image;
        profileImage.alt = `${profileData.name} Profile Picture`;
        profileImage.onerror = function() {
            this.onerror = null;
            this.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%236a3de8"/><text x="50%" y="50%" font-family="Arial,sans-serif" font-size="100" fill="white" text-anchor="middle" dominant-baseline="central">JM</text></svg>`.replace('%236a3de8', '#6a3de8')
            );
        };
    }

    const profileHeading = document.querySelector('.profile-content h2');
    if (profileHeading) {
        profileHeading.innerHTML = `Hi, I'm <span class="name-mark">Junaed</span> <span class="wave-emoji">👋</span>`;
    }

    const profileTagline = document.querySelector('.profile-content .profile-tagline');
    if (profileTagline) {
        profileTagline.textContent = profileData.tagline;
    }

    const profileDescription = document.querySelector('.profile-content .profile-description');
    if (profileDescription) {
        profileDescription.textContent = profileData.description;
    }

    const availabilityEl = document.querySelector('.profile-content .availability-pill');
    if (availabilityEl) {
        availabilityEl.innerHTML = `<i class="fas fa-circle"></i> ${profileData.availability}`;
    }

    const ctaLinkedIn = document.querySelector('.profile-cta .cta-linkedin');
    if (ctaLinkedIn) ctaLinkedIn.href = profileData.linkedin;
    const ctaGitHub = document.querySelector('.profile-cta .cta-github');
    if (ctaGitHub) ctaGitHub.href = profileData.github;
    const ctaEmail = document.querySelector('.profile-cta .cta-email');
    if (ctaEmail) ctaEmail.href = `mailto:${profileData.email}`;
    const ctaResume = document.querySelector('.profile-cta .cta-resume');
    if (ctaResume) ctaResume.href = profileData.resume;

    const statsContainer = document.querySelector('.profile-stats');
    if (statsContainer) {
        statsContainer.innerHTML = '';
        profileData.stats.forEach(stat => {
            const item = document.createElement('div');
            item.className = 'stat-item';
            item.innerHTML = `<span class="stat-value">${stat.value}</span><span class="stat-label">${stat.label}</span>`;
            statsContainer.appendChild(item);
        });
    }
}

window.initializeProfile = initializeProfile;

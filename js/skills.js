/**
 * Skills Module (skills.js)
 *
 * Renders the skills grid, grouped by category. Each card shows the skill name,
 * experience level, and an icon.
 */

const skillsData = [
    // iOS / Apple platform
    {
        name: "Swift",
        experience: "5+ years",
        category: "iOS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
    },
    {
        name: "SwiftUI",
        experience: "3 years",
        category: "iOS",
        iconUrl: "https://img.icons8.com/?size=512&id=3cCrxzZF7LfB&format=png"
    },
    {
        name: "SwiftData",
        experience: "2 years",
        category: "iOS",
        iconUrl: "https://developer.apple.com/assets/elements/icons/swiftdata/swiftdata-96x96_2x.png"
    },
    {
        name: "UIKit / Combine",
        experience: "3 years",
        category: "iOS",
        iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg"
    },

    // Android
    {
        name: "Kotlin",
        experience: "3 years",
        category: "Android",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
    },
    {
        name: "Jetpack Compose",
        experience: "2 years",
        category: "Android",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetpackcompose/jetpackcompose-original.svg"
    },
    {
        name: "Android SDK",
        experience: "5+ years",
        category: "Android",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg"
    },
    {
        name: "Java",
        experience: "3 years",
        category: "Android",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },

    // Cross-platform
    {
        name: "Flutter",
        experience: "Current at Theta Edge",
        category: "Cross-platform",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
    },
    {
        name: "Dart",
        experience: "Current",
        category: "Cross-platform",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg"
    },

    // AI / ML
    {
        name: "On-Device LLM",
        experience: "llama.cpp + Metal",
        category: "AI / ML",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
    },
    {
        name: "Core ML",
        experience: "RAG embeddings",
        category: "AI / ML",
        iconUrl: "https://developer.apple.com/assets/elements/icons/core-ml/core-ml-96x96_2x.png"
    },

    // Backend / Web
    {
        name: "Python / Django",
        experience: "Capstone (Project Leader)",
        category: "Backend",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"
    },
    {
        name: "PHP / Laravel",
        experience: "Current at Theta Edge",
        category: "Backend",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-plain.svg"
    },

    // Tools & DevOps
    {
        name: "Xcode Cloud",
        experience: "Personal apps CI/CD",
        category: "DevOps",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg"
    },
    {
        name: "GitHub Actions",
        experience: "Designed Theta Edge workflow",
        category: "DevOps",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
    },
    {
        name: "Firebase",
        experience: "4+ years",
        category: "DevOps",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
    },
    {
        name: "Git",
        experience: "5+ years",
        category: "DevOps",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    }
];

function initializeSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    skillsContainer.innerHTML = '';

    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';

        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'skill-category';
        categoryBadge.textContent = skill.category;

        const skillIcon = document.createElement('div');
        skillIcon.className = 'skill-icon';

        const img = document.createElement('img');
        img.src = skill.iconUrl;
        img.alt = `${skill.name} icon`;
        img.loading = 'lazy';
        img.onerror = function() {
            this.onerror = null;
            this.style.display = 'none';
        };

        const skillName = document.createElement('h3');
        skillName.textContent = skill.name;

        const experience = document.createElement('p');
        experience.textContent = skill.experience;

        skillIcon.appendChild(img);
        skillCard.appendChild(categoryBadge);
        skillCard.appendChild(skillIcon);
        skillCard.appendChild(skillName);
        skillCard.appendChild(experience);

        skillsContainer.appendChild(skillCard);
    });
}

window.initializeSkills = initializeSkills;

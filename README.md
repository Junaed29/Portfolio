# Portfolio Website

Personal portfolio site for **Junaed Muhammad Chowdhury**, mobile engineer based in Kuala Lumpur. 5+ years across native iOS (Swift / SwiftUI), native Android (Kotlin / Jetpack Compose), and cross-platform Flutter, now extending into on-device AI/ML.

> **Live:** [junaed.pro.bd](https://junaed.pro.bd)
>
> **GitHub Pages backup:** [junaed29.github.io/portfolio-website](https://junaed29.github.io/portfolio-website/)

---

## What's on the site

A single-page portfolio with five sections:

1. **Hero / About** with availability status, statement greeting, and magazine-style stats (years, GPA, releases, apps).
2. **Skills** grouped by category (iOS, Android, Cross-platform, AI/ML, Backend, DevOps).
3. **Projects** as numbered case-study cards, each with tech tags and live App Store / GitHub / demo links.
4. **Education** as a vertical timeline (M.Sc. UTM at 4.00 GPA, B.Sc. BAUET).
5. **Recommendations** of curated testimonials plus a working contact form that emails me directly.

Other UX details:

- Three-state theme toggle (Light / System / Dark) with no flash on first paint and live OS-theme sync while on "System".
- Sticky header with amber accent stripe, smooth scroll, back-to-top button, animated section reveals.
- Fully responsive, keyboard-navigable, accessible focus states.
- Custom favicon and proper Open Graph metadata so link previews look right when shared.

No build step. Open `index.html` directly in a browser, or push to GitHub Pages.

---

## Stack

| Layer       | Tech                                                                                    |
|-------------|-----------------------------------------------------------------------------------------|
| Markup      | HTML5                                                                                   |
| Styling     | CSS3 with custom properties; theme tokens flip on `[data-theme="dark"]`                 |
| Behavior    | Vanilla JavaScript modules, no bundler, no npm install                                  |
| Typography  | Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (numbers + labels)  |
| Icons       | Font Awesome 6 (Font Awesome CDN), Devicon (brand logos via jsDelivr)                   |
| Form        | Web3Forms (submissions land in my inbox at junaed.dev@gmail.com)                        |
| Hosting     | GitHub Pages with a custom `.pro.bd` domain                                             |
| HTTPS       | Let's Encrypt certificate auto-issued by GitHub Pages                                   |

---

## Project structure

```
portfolio-website/
├── CNAME                  # GitHub Pages custom-domain config (junaed.pro.bd)
├── index.html             # Page structure + inline theme-bootstrap script (prevents FOUC)
├── assets/
│   ├── profile.jpeg       # Hero profile picture
│   └── favicon.svg        # Ink-dark square with amber "J"
├── css/
│   └── styles.css         # All styling. Theme tokens live at the top of :root.
└── js/
    ├── theme.js           # Three-state theme controller (persists to localStorage)
    ├── profile.js         # profileData object: bio, contact, stats, availability
    ├── skills.js          # skillsData array: name, experience, category, iconUrl
    ├── projects.js        # projectsData array: title, tagline, type, description, tech, links
    ├── recommendations.js # initialRecommendations array + Web3Forms POST flow
    ├── animations.js      # IntersectionObserver fade-ins, smooth scroll, back-to-top
    └── script.js          # DOMContentLoaded entry point
```

---

## Editing content

All content lives in plain JavaScript data objects. No CMS, no build step.

### Profile

Edit `profileData` in [js/profile.js](js/profile.js):

```javascript
const profileData = {
    name: "Your Name",
    title: "Your title or stack summary",
    tagline: "One-line punchy statement under the greeting",
    description: "Longer bio paragraph",
    email: "you@example.com",
    phone: "+xx ...",
    location: "City, Country",
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    availability: "Open to roles ...",
    image: "assets/profile.jpeg",
    stats: [
        { value: "5+", label: "Years in mobile" },
        // up to 4 stats look best
    ]
};
```

### Skills

Edit `skillsData` in [js/skills.js](js/skills.js):

```javascript
{
    name: "Swift",
    experience: "5+ years",
    category: "iOS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
}
```

### Projects

Edit `projectsData` in [js/projects.js](js/projects.js):

```javascript
{
    title: "MediVault AI",
    tagline: "Privacy-first on-device medical RAG",
    type: "Personal flagship / open source",
    description: "Longer paragraph describing scope and impact.",
    tech: ["Swift", "SwiftUI", "llama.cpp", "Core ML"],
    links: [
        { label: "GitHub",    url: "https://github.com/...",  icon: "fab fa-github" },
        { label: "App Store", url: "https://apps.apple.com/...", icon: "fab fa-app-store-ios" }
    ]
}
```

### Recommendations

The visible recommendation cards are curated and live in `initialRecommendations` inside [js/recommendations.js](js/recommendations.js). The form on the page submits to Web3Forms and emails the message; it does not auto-append a card to the curated list. To promote a real submission to the visible grid, add a new entry to the array by hand.

---

## Theme system

Three themes: Light, System (follows the OS), Dark. Implementation notes:

- The toggle is a segmented `radiogroup` in the header (sun / monitor / moon).
- User choice persists to `localStorage["theme"]`.
- An inline script in `<head>` resolves the saved choice and sets `data-theme="dark"` on `<html>` before the body paints, so dark-mode users never see a light flash.
- A `matchMedia` listener keeps the rendered theme in sync with the OS while "System" is selected.

CSS variable layout:

- `:root` holds light-theme defaults.
- `:root[data-theme="dark"]` overrides them for dark mode.
- Two semantic groups of tokens:
  - **Flipping tokens** like `--ink` and `--text-on-ink` intentionally swap between modes so headings stay high-contrast and the primary CTA inverts (dark button in light mode, light button in dark mode).
  - **Static-dark tokens** like `--surface-strong` stay dark in both modes so the header, footer, and "Leave a Recommendation" form keep their grounding aesthetic.

Change a brand color by editing the variables at the top of [css/styles.css](css/styles.css).

---

## Recommendation form (Web3Forms)

The form POSTs JSON to `https://api.web3forms.com/submit` with a public access key. A honeypot field (`botcheck`, off-screen via CSS) silently rejects automated form-fillers. The access key is public by design; Web3Forms validates each request against the allowed-domain list configured in the dashboard, not by key secrecy.

To swap to your own Web3Forms account, replace `WEB3FORMS_ACCESS_KEY` near the top of [js/recommendations.js](js/recommendations.js) with your key, and add your domain in the Web3Forms dashboard.

---

## Local development

```bash
# Simplest
open index.html

# Or run a static server (so relative paths behave like production)
python3 -m http.server 8000
# then visit http://localhost:8000
```

No install step, no build step, no watcher.

---

## Deployment

Hosted on GitHub Pages. Pushing to `main` triggers an automatic redeploy in about a minute.

The custom domain `junaed.pro.bd` is configured via:

- **DNS:** four `A` records on the apex pointing to GitHub Pages load balancers (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), and a `CNAME` on `www` to `junaed29.github.io`.
- **Repo:** a `CNAME` file in the root containing `junaed.pro.bd` (auto-created by GitHub when the custom domain was set; do not delete it).
- **Repo settings:** Settings → Pages → Custom domain = `junaed.pro.bd`, Enforce HTTPS enabled.

---

## License

Source code: MIT. Content (bio, projects, photos, recommendations) is mine. Please feel free to fork the structure and patterns for your own portfolio, but replace the content with your own.

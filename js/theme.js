/**
 * Theme Module (theme.js)
 *
 * Three-state theme manager:
 *   - "light"   user explicitly picked light
 *   - "dark"    user explicitly picked dark
 *   - "system"  follow the OS preference (default)
 *
 * The user's choice is persisted to localStorage["theme"]. The actual rendered
 * theme is applied by setting (or removing) data-theme="dark" on <html>.
 *
 * A small inline script in <head> already applies the saved choice before paint
 * to avoid a flash of the wrong theme. This module wires the toggle UI and
 * keeps the rendered theme in sync with system changes while "system" is selected.
 */

(function() {
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function getPreference() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
        } catch (e) { /* localStorage may be blocked */ }
        return 'system';
    }

    function resolveEffective(pref) {
        if (pref === 'system') return mediaQuery.matches ? 'dark' : 'light';
        return pref;
    }

    function applyTheme(pref) {
        const effective = resolveEffective(pref);
        if (effective === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        root.setAttribute('data-theme-pref', pref);
        try { localStorage.setItem(STORAGE_KEY, pref); } catch (e) { /* ignore */ }
        updateToggleUI(pref);
    }

    function updateToggleUI(pref) {
        const buttons = document.querySelectorAll('.theme-toggle button[data-theme-set]');
        buttons.forEach(btn => {
            const isActive = btn.getAttribute('data-theme-set') === pref;
            btn.setAttribute('aria-checked', String(isActive));
            // Refresh title to reflect both choice and effective mode for the "system" button
            if (btn.getAttribute('data-theme-set') === 'system') {
                const eff = resolveEffective('system');
                btn.title = 'System (' + eff + ')';
            }
        });
    }

    function initializeTheme() {
        applyTheme(getPreference());

        document.querySelectorAll('.theme-toggle button[data-theme-set]').forEach(btn => {
            btn.addEventListener('click', () => {
                applyTheme(btn.getAttribute('data-theme-set'));
            });
        });

        // When the user is on "system", react live to OS theme changes.
        const handleSystemChange = () => {
            if (getPreference() === 'system') applyTheme('system');
        };
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleSystemChange);
        } else if (mediaQuery.addListener) {
            // Safari < 14 fallback
            mediaQuery.addListener(handleSystemChange);
        }
    }

    window.initializeTheme = initializeTheme;
})();

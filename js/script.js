/**
 * Main Application Entry Point (script.js)
 * 
 * WHAT THIS FILE DOES:
 * This is the main starting point of your website. Think of it like the director of a movie - 
 * it doesn't do all the acting itself, but it tells all the other parts when to start working!
 * 
 * HOW IT WORKS:
 * 1. It waits for the page to fully load (using DOMContentLoaded)
 * 2. Then it calls functions from the other JS files in the right order
 * 3. This keeps our code organized and easier to understand
 * 
 * The functionality has been split into separate modules:
 * - profile.js: Contains your personal information (name, photo, description)
 * - skills.js: Lists all your skills with icons
 * - projects.js: Shows your project portfolio
 * - recommendations.js: Displays recommendations and handles the form
 * - animations.js: Makes the page look nice with smooth animations
 * 
 * WHY WE USE SEPARATE FILES:
 * - Easier to find and fix problems
 * - Helps keep related code together
 * - Makes the website easier to update later
 */

// Wait for the DOM to fully load before initializing the application
// The DOM (Document Object Model) is the browser's way of representing your HTML as objects
document.addEventListener('DOMContentLoaded', function() {
    // This message will appear in the browser's console (press F12 to see it)
    console.log('Portfolio application starting...');
    
    // STEP 1: Initialize profile information
    // This function comes from profile.js and adds your name, photo, etc. to the page
    initializeProfile();
    
    // STEP 2: Initialize projects section
    // This function comes from projects.js and adds all your projects to the page
    initializeProjects();
    
    // STEP 3: Initialize skills section
    // This function comes from skills.js and adds all your skills to the page
    initializeSkills();
    console.log('Skills initialized'); // DEBUG LOG
   
    // STEP 4: Initialize recommendations section
    // This function comes from recommendations.js and adds the recommendations to the page
    console.log('About to initialize recommendations...'); // DEBUG LOG
    initializeRecommendations();
    console.log('Recommendations initialization called'); // DEBUG LOG
    
    // STEP 5: Initialize animations and UI interactions
    // This function comes from animations.js and sets up all the smooth animations
    initializeScrollAnimations();
    
    // STEP 6: Set up navigation links for smooth scrolling
    // This function comes from animations.js and makes clicking navigation links smooth
    setupNavigationLinks();
    
    // STEP 7: Track active section while scrolling
    // This function comes from animations.js and highlights the current section in the nav menu
    trackActiveSection();
    
    // STEP 8: Check if styles are properly loaded
    checkStylesLoaded();

    // STEP 9: Footer year
    const footerYearEl = document.querySelector('.footer-year');
    if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();

    // This message will appear in the browser's console when everything is ready
    console.log('Portfolio application initialized successfully!');
});

/**
 * Checks if CSS styles are properly loaded by testing a few key elements
 */
function checkStylesLoaded() {
    console.log('Checking if styles are loaded properly...');
    
    // Check recommendations card styling
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    if (recommendationCards.length > 0) {
        const styles = window.getComputedStyle(recommendationCards[0]);
        console.log('Recommendation card background color:', styles.backgroundColor);
        console.log('Recommendation card border-radius:', styles.borderRadius);
        console.log('Recommendation card box-shadow:', styles.boxShadow);
    } else {
        console.warn('No recommendation cards found to check styles');
    }
    
    // Check form styling
    const form = document.querySelector('.add-recommendation');
    if (form) {
        const formStyles = window.getComputedStyle(form);
        console.log('Form background color:', formStyles.backgroundColor);
        console.log('Form border-radius:', formStyles.borderRadius);
        console.log('Form padding:', formStyles.padding);
    } else {
        console.warn('Recommendation form not found to check styles');
    }
}

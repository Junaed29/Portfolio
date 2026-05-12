/**
 * Recommendations Module (recommendations.js)
 * 
 * WHAT THIS FILE DOES:
 * This file handles everything related to the recommendations section, including:
 * 1. Displaying existing recommendations
 * 2. Adding new recommendations through the form
 * 3. Showing confirmation and thank you dialogs
 * 
 * HOW IT WORKS:
 * 1. We start with an array of initial recommendations
 * 2. We create functions to display these recommendations
 * 3. We set up the form to allow users to add new recommendations
 * 4. We create interactive modal dialogs for a better user experience
 * 
 * IMPORTANT CONCEPTS:
 * - Event Listeners: Functions that wait for specific actions (like form submission)
 * - DOM Manipulation: Creating and changing HTML elements with JavaScript
 * - Modal Dialogs: Pop-up windows that appear over the page content
 */

console.log('Recommendations.js loaded'); // DEBUG LOG

// Web3Forms endpoint configuration. The access key is a public, throwaway identifier
// (Web3Forms validates the request against the access key + allowed domain set in the dashboard).
// Submissions land in junaed.dev@gmail.com.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '30e1a2da-07a1-458e-b2f2-d1d0f1136cfc';

// Initial recommendation data
// This is an array of objects, where each object represents one recommendation
// Each recommendation has:
// - text: The recommendation message
// - name: The name of the person giving the recommendation
console.log('Defining initialRecommendations array'); // DEBUG LOG
const initialRecommendations = [
    {
        text: "Junaed is a highly talented iOS developer with a deep understanding of mobile architecture. During our collaboration, I was consistently impressed by his ability to translate complex requirements into smooth, intuitive user experiences. His SwiftUI skills are particularly strong, and he always goes the extra mile to deliver polished, scalable solutions.",
        name: "Abu Jafor Saleh"
    },
    {
        text: "It’s been a pleasure working with Junaed. He’s not only technically proficient but also an excellent communicator who understands project goals clearly. His experience in both Android and iOS development gives him a unique perspective when solving cross-platform challenges. I’d love to collaborate again in the future",
        name: "Sadia Tasnim"
    },
    {
        text: "Junaed joined our mobile team at a crucial phase, and his contributions were immediately felt. He quickly took ownership of core features, proactively suggested improvements, and delivered clean, maintainable code. His passion for mobile technology and continuous learning make him a valuable asset to any team.",
        name: "Md. Rafiq Hassan"
    }
];
console.log('initialRecommendations defined with length:', initialRecommendations.length); // DEBUG LOG

/**
 * Initializes the recommendations section with existing recommendations
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds the recommendations container in the HTML
 * 2. Clears any existing content
 * 3. Creates a new card for each recommendation in our data
 * 4. Adds each card to the container
 * 5. Sets up the recommendation form
 */
function initializeRecommendations() {
    console.log('initializeRecommendations function called'); // DEBUG LOG
    // STEP 1: Find the recommendations container in the HTML
    const recommendationsContainer = document.querySelector('.recommendations-container');
    console.log('Recommendations container found:', recommendationsContainer); // DEBUG LOG Checking if the container exists
    
    // STEP 2: Clear any existing hardcoded recommendations
    recommendationsContainer.innerHTML = '';
    
    // STEP 3: Check if we have recommendations to add
    if (initialRecommendations && initialRecommendations.length > 0) {
        console.log(`Found ${initialRecommendations.length} initial recommendations to add`); // DEBUG LOG 
        
        // STEP 4: Add each recommendation to the DOM
        initialRecommendations.forEach((rec, index) => {
            console.log(`Creating recommendation card ${index + 1}`); // DEBUG LOG 
            // Create recommendation card
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            // Create blockquote with the message
            const blockquote = document.createElement('blockquote');
            blockquote.textContent = `"${rec.text}"`;
            blockquote.className = 'text-justify'; // Add the text-justify class for justified text
            
            
            // Add recommender name if available
            if (rec.name) {
                const nameSpan = document.createElement('span');
                nameSpan.className = 'recommender-name';
                nameSpan.textContent = ` - ${rec.name}`;
                blockquote.appendChild(nameSpan);
            }
            
            // Add to card and then to container
            card.appendChild(blockquote);
            recommendationsContainer.appendChild(card);
            console.log('Added card to container:', card); // DEBUG LOG
        });
    } else {
        console.warn('No initial recommendations found to display'); // DEBUG LOG
    }
    
    // STEP 5: Set up the recommendation form event listener
    setupRecommendationForm();
    
    console.log('Recommendations initialization complete'); // DEBUG LOG
}

/**
 * Sets up the event listener for the recommendation form submission
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Finds the recommendation form in the HTML
 * 2. Attaches a submit event listener
 * 3. When the form is submitted, it prevents the normal submission
 * 4. It then shows a confirmation dialog before adding the recommendation
 */
function setupRecommendationForm() {
    console.log('Setting up recommendation form'); // DEBUG LOG
    
    // STEP 1: Find the recommendation form in the HTML
    const recommendationForm = document.getElementById('recommendationForm');
    console.log('Form found:', recommendationForm); // DEBUG LOG
    
    // STEP 2: Only proceed if the form exists
    if (recommendationForm) {
        // STEP 3: Add event listener for form submission
        recommendationForm.addEventListener('submit', function(event) {
            // STEP 4: Prevent the form from submitting normally
            // This stops the page from reloading
            event.preventDefault();
            
            // STEP 5: Get the input values from the form
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            
            // STEP 6: Only proceed if there is a message (name is optional)
            if (messageInput.value.trim() !== '') {
                // STEP 7: Show confirmation dialog before adding the recommendation
                showConfirmationDialog(nameInput.value, messageInput.value);
            }
        });
    }
}

/**
 * Shows a confirmation dialog before adding a new recommendation
 * 
 * @param {string} name - The name provided in the recommendation form (optional)
 * @param {string} message - The recommendation message
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Creates a modal dialog if it doesn't exist
 * 2. Adds content to the dialog asking for confirmation
 * 3. Adds Yes/No buttons with event handlers
 * 4. Displays the modal with a fade-in animation
 */
function showConfirmationDialog(name, message) {
    // STEP 1: Check if the modal already exists
    let modal = document.getElementById('confirmationModal');
    
    // STEP 2: If the modal doesn't exist, create it
    if (!modal) {
        // Create the modal container
        modal = document.createElement('div');
        modal.id = 'confirmationModal';
        modal.className = 'modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Add close button (the X in the top-right)
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;'; // This creates the X symbol
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Add confirmation message
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Confirm Submission';
        
        const modalText = document.createElement('p');
        modalText.textContent = 'Are you sure you want to submit this recommendation?';
        
        // Add button container for Yes/No buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        // Add Yes button
        const yesButton = document.createElement('button');
        yesButton.className = 'modal-button';
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', function() {
            closeModal(modal);
            // If Yes is clicked, add the recommendation
            addRecommendation(name, message);
        });
        
        // Add No button
        const noButton = document.createElement('button');
        noButton.className = 'modal-button';
        noButton.style.backgroundColor = '#888'; // Gray color for No
        noButton.textContent = 'No';
        noButton.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Assemble the modal by appending elements
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        
        // Add the modal to the document body
        document.body.appendChild(modal);
    } else {
        // STEP 3: Update existing modal content if it already exists
        const modalTitle = modal.querySelector('h3');
        modalTitle.textContent = 'Confirm Submission';
        
        const modalText = modal.querySelector('p');
        modalText.textContent = 'Are you sure you want to submit this recommendation?';
        
        // Find or create button container
        let buttonContainer = modal.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.appendChild(buttonContainer);
        }
        
        // Clear existing buttons
        buttonContainer.innerHTML = '';
        
        // Add Yes button
        const yesButton = document.createElement('button');
        yesButton.className = 'modal-button';
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', function() {
            closeModal(modal);
            addRecommendation(name, message);
        });
        
        // Add No button
        const noButton = document.createElement('button');
        noButton.className = 'modal-button';
        noButton.style.backgroundColor = '#888';
        noButton.textContent = 'No';
        noButton.addEventListener('click', function() {
            closeModal(modal);
        });
        
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
    }
    
    // STEP 4: Display the modal with animation
    modal.style.display = 'flex'; // Make it visible
    setTimeout(() => {
        modal.classList.add('visible'); // Add the visible class for animation
    }, 10);
    
    // STEP 5: Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

/**
 * Closes a modal dialog with animation
 * 
 * @param {HTMLElement} modal - The modal element to close
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Removes the 'visible' class to start the fade-out animation
 * 2. After the animation completes (0.3 seconds), hides the modal
 */
function closeModal(modal) {
    // Remove the visible class to start the fade-out animation
    modal.classList.remove('visible');
    // After the animation completes, hide the modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Match transition duration in CSS (0.3 seconds)
}

/**
 * Shows a thank you message after submitting a recommendation
 * 
 * WHAT THIS FUNCTION DOES:
 * 1. Creates a thank you modal if it doesn't exist
 * 2. Displays the modal with animation
 * 3. Adds a close button and OK button
 * 4. Shows appreciation to the user for their submission
 */
function showThankYouModal() {
    // STEP 1: Check if modal already exists
    let modal = document.getElementById('thankYouModal');
    
    // STEP 2: If modal doesn't exist, create it
    if (!modal) {
        // Create the main modal container
        modal = document.createElement('div');
        modal.id = 'thankYouModal';
        modal.className = 'modal';
        
        // Create modal content container
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Add close button (the X in the top-right)
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;'; // This creates the X symbol
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Add thank you message
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Thank You!';
        
        const modalText = document.createElement('p');
        modalText.textContent = 'Your recommendation has been successfully submitted.';
        
        // Add OK button
        const okButton = document.createElement('button');
        okButton.className = 'modal-button';
        okButton.textContent = 'OK';
        okButton.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Assemble the modal by appending elements
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(okButton);
        modal.appendChild(modalContent);
        
        // Add modal to the document body
        document.body.appendChild(modal);
    }
    
    // STEP 3: Display the modal with animation
    modal.style.display = 'flex'; // Make it visible
    setTimeout(() => {
        modal.classList.add('visible'); // Add the visible class for animation
    }, 10);
    
    // STEP 4: Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

/**
 * Submits a new recommendation to Web3Forms, then (on success) adds it to the page.
 *
 * Flow:
 *   1. Disable the submit button so the user cannot double-fire while the request is in flight.
 *   2. POST { access_key, name, message, subject, from_name, botcheck } to Web3Forms.
 *   3. On success: append the card to the DOM, reset the form, show the thank-you modal.
 *   4. On failure (network error, invalid key, spam-rejected): show the error modal.
 *   5. Always re-enable the submit button at the end.
 *
 * @param {string} name - Optional name from the form
 * @param {string} message - The recommendation text
 */
async function addRecommendation(name, message) {
    const form = document.getElementById('recommendationForm');
    const submitButton = form ? form.querySelector('.btn-submit') : null;
    const botcheck = form ? form.querySelector('.botcheck') : null;
    const originalSubmitText = submitButton ? submitButton.textContent : 'Submit';
    const cleanName = (name || '').trim();
    const displayName = cleanName !== '' ? cleanName : 'Anonymous';

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
    }

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `New portfolio recommendation from ${displayName}`,
                from_name: displayName,
                name: displayName,
                message: message,
                botcheck: botcheck && botcheck.checked ? 'true' : ''
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
            throw new Error(data.message || `Web3Forms returned status ${response.status}`);
        }

        // === SUCCESS PATH ===
        // The email is delivered to junaed.dev@gmail.com via Web3Forms.
        // We intentionally do NOT render a temporary card in the recommendations list,
        // because that card would disappear on the next refresh and confuse the submitter
        // into thinking their message had been "lost". Only persistent recommendations
        // (curated and hard-coded in `initialRecommendations`) belong in the visible list.
        if (form) form.reset();
        showThankYouModal();
    } catch (err) {
        console.error('Recommendation submission failed:', err);
        showErrorModal(err && err.message ? err.message : 'Network error');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalSubmitText;
        }
    }
}

/**
 * Shows an error modal when the Web3Forms submission fails. Mirrors the
 * thank-you modal layout so the UX stays consistent.
 */
function showErrorModal(errorDetail) {
    let modal = document.getElementById('errorModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'errorModal';
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() { closeModal(modal); });

        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Couldn\'t send';

        const modalText = document.createElement('p');
        modalText.className = 'error-modal-text';

        const okButton = document.createElement('button');
        okButton.className = 'modal-button';
        okButton.textContent = 'Try again';
        okButton.addEventListener('click', function() { closeModal(modal); });

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(okButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    const detailEl = modal.querySelector('.error-modal-text');
    if (detailEl) {
        detailEl.textContent = 'Something went wrong while delivering your recommendation. Please check your connection and try again.' + (errorDetail ? ` (Details: ${errorDetail})` : '');
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);

    window.addEventListener('click', function(event) {
        if (event.target === modal) closeModal(modal);
    });
}

// Make the functions available globally so they can be called from other scripts
window.initializeRecommendations = initializeRecommendations;

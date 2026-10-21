document.addEventListener("DOMContentLoaded", function() {
    // Find the rating container on the current page
    const ratingContainer = document.querySelector('.star-rating');
    if (!ratingContainer) return;

    const stars = ratingContainer.querySelectorAll('.star');
    const statusText = document.querySelector('[id^="status-"]');
    const pageId = ratingContainer.id; // This gets 'rating-p1', 'rating-p2', etc.

    // 1. Load existing rating from LocalStorage
    const savedRating = localStorage.getItem(pageId);
    if (savedRating) {
        updateStars(savedRating);
        statusText.innerText = `You rated this ${savedRating} stars!`;
    }

    // 2. Add click event to stars
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Save the rating to the browser's memory using the unique Page ID
            localStorage.setItem(pageId, value);
            
            // Update UI
            updateStars(value);
            statusText.innerText = `You rated this ${value} stars!`;
        });
    });

    // Function to color the stars gold
    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});

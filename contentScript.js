// Function to remove "Member-only" articles
function removeMemberOnlyArticles() {
    document.querySelectorAll('article').forEach(article => {
        const memberOnlyButton = article.querySelector('button[aria-label="Member-only story"]');
        if (memberOnlyButton) {
            article.remove();
        }
    });
}

// Execute the function once initially to clean up already loaded articles
removeMemberOnlyArticles();

// MutationObserver callback to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use the function whenever new nodes are added to the DOM
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            removeMemberOnlyArticles();
        }
    }
};

// Create a MutationObserver instance and pass the callback function
const observer = new MutationObserver(callback);

// Specify what to observe (in this case, the entire document body for simplicity)
const config = { childList: true, subtree: true };

// Start observing the document body for DOM mutations
observer.observe(document.body, config);
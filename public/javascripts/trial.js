window.onload = function() {
  document.getElementById("button01").addEventListener("click", changeColor);
  document.getElementById("button01").addEventListener("click", show);
}
function changeColor() {
  if(document.getElementById("button01").style.background == "red")
    document.getElementById("button01").style.background = "blue";
  else
    document.getElementById("button01").style.background = "red";
}

var xmlhttp = new XMLHttpRequest();
var resp = "";
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    resp = xmlhttp.responseText;
    document.getElementById("p01").innerHTML = resp;
  }
}

function show() {
  document.getElementById("p01").innerHTML = "Button Clicked";
  xmlhttp.open("GET", "//localhost:3000/ajax/responseAjax", true);
  xmlhttp.send();
  alert(resp);
}

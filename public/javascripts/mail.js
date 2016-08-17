var mailNodes,
    text = '';

window.onload = function() {
  count();
}

function count() {
  var mails = document.getElementById("mailshow");
  for(var i = 1; i < document.getElementById("mailshow").childNodes.length; i+=2) {
    mailNodes = document.getElementById("mailshow").childNodes[i].childNodes;
    text += mailNodes[9].innerHTML;
    
  }
  document.getElementById("p011").innerHTML = text;
}

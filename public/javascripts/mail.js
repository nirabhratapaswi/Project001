var mailNodes;
var text = '';
var xmlhttp = new XMLHttpRequest();
var resp = '';
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    resp = xmlhttp.response;
    document.getElementById('p011').innerHTML = resp;
    location.reload();
  }
};


window.onload = function() {
  count();
}

function count() {
  var mails = document.getElementById("mailshow");
  for(var i = 1; i < document.getElementById("mailshow").childNodes.length; i+=2) {
    mailNodes = document.getElementById("mailshow").childNodes[i].childNodes;
    text += mailNodes[11].innerHTML;
    mailNodes[11].id = mailNodes[9].innerHTML;
    mailNodes[11].innerHTML = "<td><a href='#' onclick='run(" + mailNodes[9].innerHTML + ")'>Delete</a></td>";
  }
  document.getElementById("p011").innerHTML = text;
}

function run(pass) {
  var data = { id: pass };
  //var id = document.getElementById("1").id;
  //document.getElementById("p011").innerHTML = pass;
  xmlhttp.open('POST', '//localhost:3000/ajax/deleteMail', true);
  xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(data));
  console.log("xmlhttp request sent!!");
}

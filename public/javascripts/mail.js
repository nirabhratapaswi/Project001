var mailNodes;
var text = '';
var xmlhttp = new XMLHttpRequest();
var resp = '';
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var response = JSON.parse(xmlhttp.responseText);
    //document.getElementById("p011").innerHTML = response["data"];
    if(response["data"] == "Mail Sent!!") {
      $('#close_button').click();
    }
    else {
      document.getElementById("error_para").innerHTML = "Error detected : " + response["data"];
    }
    //window.reload();
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
  xmlhttp.open('POST', '//localhost:3000/ajax/deleteMail', true);
  xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(data));
}

function sendAjax() {
  var formElement = document.getElementById("mail_form");
  var formData = new FormData(formElement);
  //document.getElementById("p011").innerHTML = formData.get("attachment");
  var values = {};
  var text;
  $.each($('#mail_form').serializeArray(), function(i, field) {
    values[field.name] = field.value;
    console.log(field.name);
  });

  xmlhttp.open('POST', '//localhost:3000/Email/sendmail', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var ft = document.getElementById('input_file').files[0];
  document.getElementById("p011").innerHTML = ft;
  xmlhttp.send(JSON.stringify(values));
}

function changeText() {
  xmlhttp.open('POST', '//localhost:3000/ajax/responseAjax', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var datasend = { "data" : "This is some data" };
  xmlhttp.send(JSON.stringify(datasend));
}

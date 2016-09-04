var mailNodes;
var text = '';
var xmlhttp = new XMLHttpRequest();
var resp = '';
var finish = false;

document.getElementById("input_file").addEventListener("change", function() {
  var filename = document.getElementById("input_file").value.split('\\');
  document.getElementById("fileButtonDisplay").childNodes[1].childNodes[3].innerHTML = filename[filename.length-1];
});

xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 1) {
      document.getElementById("unified").innerHTML = "Upload in progress!!";
      document.getElementById("error_para").innerHTML = "Upload in progress!!";
      var rawResp = xmlhttp.response;
      document.getElementById("unified").innerHTML = rawResp;
    }
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var response = JSON.parse(xmlhttp.responseText);
    var rawResp = xmlhttp.responseText;
    document.getElementById("unified").innerHTML = "Reading done";
    if(response["data"] == "Mail Sent!!") {
      $('#close_button').click();
      //document.getElementById("unified").innerHTML = "Mail Sent!!";
    }
    else if(response["data"] == "download") {
      document.getElementById("unified").innerHTML = response["filename"].toString();
    }
    else {
      document.getElementById("error_para").innerHTML = "Error detected : " + response["data"];
    }
    //window.reload();
  }
};


function downloadPost(key) {
  document.getElementById('unified').innerHTML = "Download button clicked!!" + key;
    var method = "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", "./ajax/downloadFile");

            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("id", "hiddenFieldForm");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "key");
            hiddenField.setAttribute("value", key);

            form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}



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
    mailNodes[13].id = mailNodes[9].innerHTML.toString() + "i";
    mailNodes[13].innerHTML = "<td><a href='#' onclick='download11(" + mailNodes[9].innerHTML + ")'>Download</a></td>";
  }
  //document.getElementById("p011").innerHTML = text;
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
  xmlhttp.upload.addEventListener("loadstart", function() {
    document.getElementById("progress-div").style.visibility = "visible";
  }, false);
  xmlhttp.upload.addEventListener("progress", progressFunction, false);
  xmlhttp.upload.addEventListener("load", function() {
    document.getElementById("progress-div").style.visibility = "hidden";
  }, false);
  xmlhttp.open('POST', '//localhost:3000/Email/sendmail', true);
  xmlhttp.send(formData);
}

function changeText() {
  xmlhttp.open('POST', '//localhost:3000/ajax/responseAjax', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var datasend = { "data" : "This is some data" };
  xmlhttp.send(JSON.stringify(datasend));
}

function download11(pass) {
  downloadPost(pass);
}

function progressFunction(evt){
         var progressBar = document.getElementById("progressBar");
         var percentageDiv = document.getElementById("percentageCalc");
         if (evt.lengthComputable) {
           var max = "aria-valuemax";
           progressBar.max = evt.total;
           progressBar.style.width = ((evt.loaded/evt.total) * 100) + "%";
           percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
         }
 }

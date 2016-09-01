var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var btoa = require('btoa');
var fs = require('fs');
var multer = require('multer');
var path = require('path');

var sqlQuery = '';
var receiverName = '';

var user = [];

/* POST Registration page. */

var sess;

router.get('/', function(req, res, next) {
  res.render('register', { notice: "Register" } );
});

router.post('/',  function(req, res, next) {
  res.writeHead(200, { "Content-Type" : "application/json" });
  //console.log(req.body);
  console.log(req.files);
  console.log(req.files[0].originalname);
  var connection = req.app.locals.connection;
  req.checkBody('receiver', 'Enter 9 digit Chemical Dept specific roll number!').matches(/(1021150[0-6]\d|102115070)/g);
  res.locals.err = req.validationErrors(true);
  if(res.locals.err) {
    console.log("Error detected while sending mail : " + res.locals.err.receiver.msg);
    var response = { "data" : "Wrong Roll Number!!" };
    res.write(JSON.stringify(response));
    res.end();
    //res.render("LoggedIn/createMail", { notice: "Wrong Roll Number!!" } );
  }
  else {
    req.sanitize('receiver').escape().trim();
    req.body.subject = b64EncodeUnicode(req.body.subject);
    req.body.bodytext = b64EncodeUnicode(req.body.bodytext);
    //req.sanitize('subject').escape().trim();
    //req.sanitize('bodytext').escape().trim();
    //console.log("Subject encoded='" + req.body.subject + "' AND Body encoded='" + req.body.bodytext + "'.");
    var checkSqlQuery = "SELECT Roll FROM USERS";
    connection.query(checkSqlQuery, function(error, row, field) {
      if (error)
        throw error;
      for(var i = 0; i < row.length; i++) {
        if(req.body.receiver == row[i].Roll && req.body.receiver != req.session.user.Roll) {
          next();
          break;
        }
        else if(req.body.receiver == req.session.user.Roll) {
          //res.render("LoggedIn/createMail", { notice: "Cant send yourself a mail!!" } );
          var response = { "data" : "Cant send yourself a mail!!" };
          res.write(JSON.stringify(response));
          res.end();
          break;
        }
        else if((req.body.receiver != row[i].Roll &&  i == row.length - 1)) {
          //res.render("LoggedIn/createMail", { notice: "Incorrect Reviever Roll Number!" } );
          var response = { "data" : "Incorrect Reviever Roll Number!" };
          res.write(JSON.stringify(response));
          res.end();
        }
      }
    });
  }
}, function(req, res, next) {
    var connection = req.app.locals.connection;
    sqlQuery = "SELECT Name FROM USERS WHERE Roll ='";
    connection.query(sqlQuery + req.body.receiver + "';", function(err, rows, fields) {
      if (err)
        throw err;
      receiverName = rows[0].Name;
      next();
    });
}, function(req, res, next) {
    if(req.files) {
      console.log("Files are present!!");
      var filename = req.files[0].originalname;
      var readFile = fs.createReadStream('./public/Files/' + req.files[0].filename);
      readFile.pipe(fs.createWriteStream('./public/Files/' + req.session.user.Roll + '/' + filename));
      readFile.pipe(fs.createWriteStream('./public/Files/' + req.body.receiver + '/' + filename));
      //stream.on('error', function(err) {});
      readFile.on('close', function() {
        fs.unlink('./public/Files/' + req.files[0].filename);
      });
      console.log(req.files);
      /*
      var storage = multer.diskStorage({
          destination: function (req, file, cb) {
              cb(null, __dirname + '/public/Files');
          },
          filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + Date.now());
        }
      });

      var upload = multer({ storage: storage }).single('file');
      */
    }
    /*var attachedFile = req.files.attachment;
    //console.log(attachedFile);

    attachedFile.mv('/home/nirabhra/Desktop/ChemWeb19Nitt/public/Files/file01.jpg', function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('File uploaded!');
        }
    });*/

    var connection = req.app.locals.connection;
    sqlQuery = "INSERT INTO " + req.body.receiver + "Email(Sender, SenderName, Attachment, Subject, Body, MailStatus) VALUES('"
    + req.session.user.Roll + "','"
    + req.session.user.Name + "','"
    + req.files[0].originalname + "','"
    + req.body.subject + "','"
    + req.body.bodytext + "', 'R');";
    var sqlQueryS = "INSERT INTO " + req.session.user.Roll + "Email(Sender, SenderName, Attachment, Subject, Body, MailStatus) VALUES('"
    + req.body.receiver + "','"
    + receiverName + "','"
    + req.files[0].originalname + "','"
    + req.body.subject + "','"
    + req.body.bodytext + "', 'S');";
    connection.query(sqlQueryS, function(err, rows, fields) {
      if(err)
        throw err;
    });
    connection.query(sqlQuery, function(err, rows, fields) {
      if(err)
        throw err;
      console.log("Local Email sent successfully!!");
      var response = { "data" : "Mail Sent!!" };
      res.write(JSON.stringify(response));
      res.end();
    });
});





router.post('/jjsabdkjbas',  function(req, res, next) {
  //res.writeHead(200, { "Content-Type" : "application/json" });
  console.log(req.files);
  console.log(req.body);
  var fstream;
  /*req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);

  });
  */
});

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

module.exports = router;

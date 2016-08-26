var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var btoa = require('btoa');

var sqlQuery = '';
var receiverName = '';

var user = [];

/* POST Registration page. */

var sess;

router.get('/', function(req, res, next) {
  res.render('register', { notice: "Register" } );
});

router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  req.checkBody('receiver', 'Enter 9 digit Chemical Dept specific roll number!').matches(/(1021150[0-6]\d|102115070)/g);
  res.locals.err = req.validationErrors(true);
  if(res.locals.err) {
    console.log("Error detected while sending mail : " + res.locals.err.receiver.msg);
    res.render("LoggedIn/createMail", { notice: "Wrong Roll Number!!" } );
  }
  else {
    req.sanitize('receiver').escape().trim();
    req.body.subject = b64EncodeUnicode(req.body.subject);
    req.body.bodytext = b64EncodeUnicode(req.body.bodytext);
    //req.sanitize('subject').escape().trim();
    //req.sanitize('bodytext').escape().trim();
    console.log("Subject encoded='" + req.body.subject + "' AND Body encoded='" + req.body.bodytext + "'.");
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
          res.render("LoggedIn/createMail", { notice: "Cant send yourself a mail!!" } );
          break;
        }
        else if((req.body.receiver != row[i].Roll &&  i == row.length - 1))
          res.render("LoggedIn/createMail", { notice: "Incorrect Reviever Roll Number!" } );
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
    if(req.files)
      console.log("Files are present!!");
    var attachedFile = req.files.attachment;
    //console.log(attachedFile);

    attachedFile.mv('/home/nirabhra/Desktop/ChemWeb19Nitt/public/Files/file01.jpg', function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('File uploaded!');
        }
    });



    var connection = req.app.locals.connection;
    sqlQuery = "INSERT INTO " + req.body.receiver + "Email(Sender, SenderName, Subject, Body, MailStatus) VALUES('"
    + req.session.user.Roll + "','"
    + req.session.user.Name + "','"
    + req.body.subject + "','"
    + req.body.bodytext + "', 'R');";
    var sqlQueryS = "INSERT INTO " + req.session.user.Roll + "Email(Sender, SenderName, Subject, Body, MailStatus) VALUES('"
    + req.body.receiver + "','"
    + receiverName + "','"
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
      res.redirect('/auth');
    });
});

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

module.exports = router;

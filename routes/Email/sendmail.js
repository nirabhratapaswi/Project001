var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var nodemailer = require('nodemailer');

var user = [];

/* POST Registration page. */

var sess;

router.get('/', function(req, res, next) {
  res.render('register', { notice: "Register" } );
});

router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
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
}, function(req, res, next) {
    var connection = req.app.locals.connection;
    var time = new Date();
    var sqlQuery = "INSERT INTO EMAILS(Sender, Receiver, Subject, Body, Time, Date) VALUES('"
    + req.session.user.Name + "','"
    + req.body.receiver + "','"
    + req.body.subject + "','"
    + req.body.bodytext + "','"
    + time.getTime().toString() + "','"
    + time +"');";
    connection.query(sqlQuery, function(err, rows, fields) {
      if(err)
        throw err;
      console.log("Local Email sent successfully!!");
      res.redirect('/auth');
    });
});


module.exports = router;

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
  var sqlQuery = "INSERT INTO EMAILS(Roll, Subject, Body) VALUES('"
  + "102115029" + "','"
  + req.body.subject + "','"
  + req.body.bodytext + "');";
  connection.query(sqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    console.log("Local Email sent successfully!!");
    //var text = 'Hi ' + req.body.Name + ', this is the Official Chemcial Website Responding!';
    res.redirect('/');
    //res.render('success', { notice: "Success!!" } );
  });
});


module.exports = router;

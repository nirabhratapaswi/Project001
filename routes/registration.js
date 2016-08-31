var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var fs = require('fs');

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'chemicalnitt19@gmail.com', // Your email id
            pass: 'cnitt1519' // Your password
        }
});

var user = [];

/* POST Registration page. */

var sess;

router.get('/', function(req, res, next) {
  res.render('register', { notice: "Register" } );
});

router.post('/', function(req, res, next) {
  var saltRounds = 10;
  var stpass;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.Password, salt, function(err, hash) {
      stpass = hash;

      var connection = req.app.locals.connection;
      var sqlQuery = "INSERT INTO USERS(Roll, Name, Email, Mobile, DOB, Place, Auth, Password) VALUES('"
      + req.body.Roll +"','"
      + req.body.Name +"','"
      + req.body.Email +"','"
      + req.body.Mobile +"','"
      + req.body.DaOB +"','"
      + req.body.Place +"','"
      + req.body.Auth +"','"
      + stpass +"');";
      var roll = req.body.Roll;
      var sqlCreateTable = "CREATE TABLE " + req.body.Roll + "Email(id int NOT NULL AUTO_INCREMENT, Sender char(9) NOT NULL, SenderName varchar(100) NOT NULL, Subject text, Body longtext, Time timestamp, Attachment longblob, MailStatus char(1), PRIMARY KEY(id));";
      connection.query(sqlCreateTable, function(err, rows, fields) {
        if(err)
          throw err;
        fs.mkdirSync('./public/Files/' + roll,0744);
        console.log("Table created!");
      });
      connection.query(sqlQuery, function(err, rows, fields) {
        if(err)
          throw err;
        console.log("Row added successfully!!");
        var text = 'Hi ' + req.body.Name + ', this is the Official Chemcial Website Responding!';
        var mailOptions = {
          from: 'bluff@gmail.com', // sender address
          to: req.body.Email, // list of receivers
          subject: 'Email Example', // Subject line
          text: text
        };
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          };
        });





        res.render('success', { notice: "Success!!" } );
      });
    });
  });
});


module.exports = router;

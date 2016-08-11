var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');

var mysql = require('mysql');

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
      connection.query(sqlQuery, function(err, rows, fields) {
        if(err)
          throw err;
        console.log("Row added successfully!!");
        res.render('success', { notice: "Success!!" } );
      });
    });
  });
});


module.exports = router;

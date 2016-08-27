var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var session = require('client-sessions');
var mysql = require('mysql');
var atob = require('atob');

var user = [];

/* POST Authorization page. */

//var sess;

router.post('/', function(req, res, next) {
  //console.log(req.body);
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('pragma', 'no-cache');
  req.checkBody('roll', 'Enter 9 digit Chemical Dept specific roll number!').matches(/(1021150[0-6]\d|102115070)/g);
  req.sanitize('roll').escape().trim();
  req.sanitize('pwd').escape().trim();
  res.locals.err = req.validationErrors(true);
  if(res.locals.err) {
    console.log(res.locals.err.roll.msg);
    res.render('login', { notice: "Invalid Username!" } );
  }
  else {
    var found = 0;
    var notFound = 0;
    var connection = req.app.locals.connection;
    connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
      if(err) throw err;
      var i = 0;
      function forloop() {
        for(i = 0; i < rows.length ; i++) {
          if( (rows[i].Roll == req.body.roll || rows[i].Name == req.body.roll) ) {
            next();
            break;
          }
          else if( (rows[i].Roll != req.body.roll && rows[i].Name != req.body.roll) && (i == rows.length-1) ) {
            res.render('login', { notice: "User not found!" } );
          }
        }
      }
      forloop();
    });
  }
}, function(req, res, next) {
  var connection = req.app.locals.connection;
  connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
    if(err) throw err;
    var i = 0;
    function forloop() {
      for(i = 0; i < rows.length ; i++) {
        if( (rows[i].Roll == req.body.roll || rows[i].Name == req.body.roll) ) {
          var user = rows[i];
          bcrypt.compare(req.body.pwd, rows[i].Password, function(err, resp) {
          if(resp) {
            req.user = user;
            delete req.user.Password;
            req.session.user = user;
            res.locals.user = user;
            found = 1;
            console.log("Login by " + user.Name + "...");
            res.redirect('/auth');
          }
          else
            res.render('login', { notice: "Incorrect username/password" } );
          });
        }
      }
    }
    forloop();
  });
});

router.get('/', function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('pragma', 'no-cache');
  if(req.session && req.session.user) {
    var connection = req.app.locals.connection;
    var sqlQuery = 'SELECT * FROM ' + req.session.user.Roll + 'Email WHERE MailStatus = "R" ORDER BY Time DESC;';
    var sqlQueryName = 'SELECT Name FROM USERS WHERE Roll = "';
    connection.query(sqlQuery, function(err, rows, fields) {
      if(err) throw err;
      for(var i = 0; i < rows.length; i++) {
        rows[i].Subject = b64DecodeUnicode(rows[i].Subject);
        rows[i].Body = b64DecodeUnicode(rows[i].Body);
      }
      res.render('LoggedIn/mail', { username: req.session.user.Name, notice: "Logged In", mails: rows });
    });
  }
  else {
    res.redirect('/login');
  }
});

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

module.exports = router;

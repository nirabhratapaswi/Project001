var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');
var session = require('client-sessions');
var mysql = require('mysql');
var Promise = require('promise');
var atob = require('atob');

var user = [];

/* GET Sent Mail page. */

router.get('/', function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('pragma', 'no-cache');
  if(req.session && req.session.user) {
    var connection = req.app.locals.connection;
    var sqlQuery = 'SELECT * FROM ' + req.session.user.Roll + 'Email WHERE MailStatus = "S" ORDER BY Time DESC;';
    var sqlQueryName = 'SELECT Name FROM USERS WHERE Roll = "';
    new Promise(function(resolve, reject) {
      connection.query(sqlQuery, function(err, rows, fields) {
        if(err) {
          //throw err;
          reject(err);
        }
        resolve(rows);
      });
    })
      .then(function(results) {
        for(var i = 0; i < results.length; i++) {
          results[i].Subject = b64DecodeUnicode(results[i].Subject);
          results[i].Body = b64DecodeUnicode(results[i].Body);
        }
        res.render('LoggedIn/sentmail', { username: req.session.user.Name, notice: "Logged In", mails: results });
      })
      .catch(function(results) {
        console.log("Error occured-" + results);
      });
  } //end if(req.session && req.session.user)

});

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

module.exports = router;

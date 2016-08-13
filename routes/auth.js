var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');
var bcrypt = require('bcrypt');

var mysql = require('mysql');

var user = [];

/* POST Authorization page. */

var sess;

router.post('/', function(req, res, next) {
  var found = 0;
  var notFound = 0;
  sess = req.session;
  var connection = req.app.locals.connection;
  connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
    if(err) throw err;
    var i = 0;
    function forloop() {
      for(i = 0; i < rows.length ; i++) {
        if( (rows[i].Roll == req.body.roll || rows[i].Name == req.body.roll) ) {
          sess.username = rows[i].Name;
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
}, function(req, res, next) {
  sess = req.session;
  var connection = req.app.locals.connection;
  connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
    if(err) throw err;
    var i = 0;
    function forloop() {
      for(i = 0; i < rows.length ; i++) {
        if( (rows[i].Roll == req.body.roll || rows[i].Name == req.body.roll) ) {
          var name = rows[i].Name;
          bcrypt.compare(req.body.pwd, rows[i].Password, function(err, resp) {
          if(resp) {
            sess.regenerate(function() {
              sess.auth = name;
            });
            sess.username = name;
            found = 1;
            console.log("Password is correct!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            sess.state = 1;
            res.render('auth', { username: sess.username } );
          }
          else
            //sess.username = "";
            res.render('login', { notice: "Incorrect username/password" } );
          });
        }
      }
    }
    forloop();
  });
});


module.exports = router;

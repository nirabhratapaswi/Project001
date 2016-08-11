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
    for(i = 0; i < rows.length ; i++) {
      if( (rows[i].Roll == req.body.roll)) {
        //console.log(req.body.pwd + "--" + rows[i].Password);
        console.log("Entered");
        sess.username = rows[i].Name;
        bcrypt.compare(req.body.pwd, rows[i].Password, function(err, resp) {
        if(resp) {
          found = 1;
          console.log("Password is correct!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          sess.state = 1;
          //sess.username = rows[i].Name;
          res.render('auth', { username: sess.username } );
        }
        else
          sess.username = "";
          res.render('login', { notice: "Incorrect username/password" } );
        });
      }
    }
    if(found == 20)
      res.render('login', { notice: "Incorrect username/password" } );
  });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');

var mysql = require('mysql');

var user = [];

/* GET login page. */

var sess;

router.post('/', function(req, res, next) {
  sess = req.session;
  var connection = req.app.locals.connection;
  connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
    if(err) throw err;
    var i = 0;
    for(i = 0; i < 2 ; i++) {
      console.log(rows[i].Name.toString() + "--" + rows[i].Password.toString() + "||||");
      if( (rows[i].Name == req.body.username) && (rows[i].Password == req.body.pwd) ) {
        console.log("Password is correct!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        sess.state = 1;
        sess.username = req.body.username;
        res.render('auth', { username: sess.username } );
      }
    }
    if(sess.state != 1)
      res.render('login', { notice: "Incorrect username/password" } );
  });
});


module.exports = router;

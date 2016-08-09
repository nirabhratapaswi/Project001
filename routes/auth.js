var express = require('express');
var router = express.Router();
var session = require('express-session');
var dataStore = '';
var bodyParser = require('body-parser');
var redirect = require('express-redirect');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'capital1197',
  database  : 'chemstudents'
});

var user = [];

/*connection.connect();
connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
  if(err) throw err;
  dataStore = rows[0].Password;
  console.log('Connected!');
});

connection.end();*/

/* GET login page. */

var sess;

router.post('/', function(req, res, next) {
  if(checkDetails(req.body.username, req.body.pwd)) {
    console.log("Valid Password");
    sess = req.session;
    sess.username = req.body.username;
    sess.count = 1;
    //res.render('auth', { username: sess.username } );
    next();
  }
  else {
    console.log("Authentication Error!" + req.body.pwd + " -- " + dataStore);
    res.render('index', { notice: "Authentication Failed" } );
  }
}, function(req, res, next) {
  if(req.session)
    console.log("Session is sooooooooo much working!!!!!!!!!!!!!");
  res.render('auth', { username: sess.username } );
});

function checkDetails (username, password) {
  connection.connect();
  connection.query('SELECT * FROM USERS;', function(err, rows, fields) {
    if(err) throw err;
    //dataStore = rows[0].Password;
    var i = 0;
    for(i = 0; i < 2 ; i++) {
      console.log("hello");
      if( (rows[i].Password.toLowerCase() == password.toLowerCase()) && (rows[i].Name.toLowerCase() == username.toLowerCase()) )
        return true;
    }
    return false;
  });

  connection.end();
}


module.exports = router;

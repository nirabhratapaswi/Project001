var express = require('express');
var router = express.Router();
var dataStore = '';

var mysql = require('mysql');

var user = [];

/* GET login page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  if(sess.state == 0)
    res.render('login', { notice: "Logged Out" } );
  else
    res.render('loggedIn', { username: sess.secret } );//sess.username } );
});

module.exports = router;

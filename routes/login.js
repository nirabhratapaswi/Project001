var express = require('express');
var router = express.Router();
var dataStore = '';

var mysql = require('mysql');

var user = [];

/* GET login page. */
router.get('/', function(req, res, next) {
  /*var views = req.session.views;
  if(views) {
    views++;
  }
  else {
    views = 1;
  }
  req.session.destroy(function (err) {
    //
  });
  if(req.session) {
    views = 0;
  }
  if(!req.session) {
    views = 10;
  }*/
  var sess = req.session;
  if(sess.state == 0)
    res.render('login', { notice: "Logged Out" } );
  else
    res.render('loggedIn', { username: sess.username } );
});

module.exports = router;

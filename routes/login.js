var express = require('express');
var router = express.Router();
var dataStore = '';
var session = require('client-sessions');
var mysql = require('mysql');

var user = [];

/* GET login page. */
router.get('/', function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('pragma', 'no-cache');
  if(req.session && req.session.user) {
    res.render('loggedIn', { username: req.session.user.Name })
  }
  else {
    res.render('login', { notice: "Logged Out" } );
  }

  /*if(req.session == null)
    res.render('login', { notice: "Logged Out" } );
  else
    res.render('loggedIn', { username: req.session.username } );
  */
});

module.exports = router;

var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');

/* GET login page. */

var sess;

router.get('/', function(req, res, next) {

  req.session.reset();
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('pragma', 'no-cache');
  res.redirect('/login');
});


module.exports = router;

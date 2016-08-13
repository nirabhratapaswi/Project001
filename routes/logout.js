var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');

/* GET login page. */

var sess;

router.get('/', function(req, res, next) {
  /*if(req.session) {
    //req.session.auth = null;
    //res.clearCookie('auth');
    req.session.destroy(function() {});
  }
  res.redirect('/login');*/
  req.session.state = 0;
  //req.session.state = 0;
  res.redirect('/login');
});


module.exports = router;

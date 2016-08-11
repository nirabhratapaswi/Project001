var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var redirect = require('express-redirect');

/* GET login page. */

var sess;

router.get('/', function(req, res, next) {
  req.session.state = 0;
  //req.session.state = "loggedout";
  //res.render('login', { notice: "Failed" } );
  res.redirect('/login');
});


module.exports = router;

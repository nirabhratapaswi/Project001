var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session)
    console.log("Session is sooooooooo much working!!!!!!!!!!!!!");
  res.render('auth');
});

module.exports = router;

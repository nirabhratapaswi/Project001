var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { notice: "Logged In" } );
});

/* GET form trial page. */
router.get('/form', function(req, res, next) {
  res.render('form', { notice: "Logged In" } );
});

module.exports = router;

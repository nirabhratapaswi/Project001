var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('Data is posted!!');
  console.log(req.files);
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;

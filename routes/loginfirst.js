var express = require('express');
var router = express.Router();

var user = [];

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { notice: "Login Page" } );
});

module.exports = router;

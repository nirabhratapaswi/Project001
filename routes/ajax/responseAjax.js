var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var sqlQuery = "SELECT Body FROM EMAILS;";
  connection.query(sqlQuery, function(err, rows, fields) {
    res.type('text/plain');
    for(var i = 0; i < rows.length; i++) {
      res.write(rows[i].Body);
    }
    res.end();
  });
});

module.exports = router;

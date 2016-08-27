var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  res.writeHead(200, { "Content-Type" : "application/json" });
  var response = { "data" : "This is ajax response!!" };
  /*for(var i = 0; i < rows.length; i++) {
    res.write(rows[i].Body);
  }*/
  res.write(JSON.stringify(response));
  res.end();
});

module.exports = router;

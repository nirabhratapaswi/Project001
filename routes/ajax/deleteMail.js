var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var dataReceived = req.body.id;
  //console.log(dataReceived);
  var mysqlQuery = "DELETE FROM " + req.session.user.Roll + "Email WHERE id = " + dataReceived + ";";
  connection.query(mysqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    console.log("Mail deleted!!");
    res.type('text/plain');
    res.write("This is ajax response!");
    res.end();
  });
});

module.exports = router;

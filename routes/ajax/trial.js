var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ajax/trial', { notice: "Logged In" } );
});

module.exports = router;






var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var dataReceived = req.body.id;
  //console.log(dataReceived);
  var mysqlQuery = "DELETE FROM EMAILS WHERE id = " + dataReceived + ";";
  connection.query(mysqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    console.log("Mail deleted!!");

  });
});

module.exports = router;

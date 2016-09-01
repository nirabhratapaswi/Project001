var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var dataReceived = req.body.id;
  //console.log("Download call made : ",dataReceived);
  var mysqlQuery = "SELECT Attachment FROM " + req.session.user.Roll + "Email WHERE id = " + dataReceived + ";";
  connection.query(mysqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    //console.log(rows[0].Attachment);
    var response = { "data" : "download", "filename" : rows[0].Attachment };
    //res.writeHead(200, { "Content-Type" : "application/json" });
    //res.write(JSON.stringify(response));
    console.log(path.join(__dirname + '/public/Files/' + rows[0].Attachment));
    res.sendFile(path.join(__dirname + '/public/Files/' + rows[0].Attachment));
    res.end();
  });
});

module.exports = router;

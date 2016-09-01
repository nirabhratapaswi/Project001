var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var dataReceived = req.body.key;
  var mysqlQuery = "SELECT Attachment FROM " + req.session.user.Roll + "Email WHERE id = " + dataReceived + ";";
  connection.query(mysqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    var file = '/home/nirabhra/Desktop/ChemWeb19Nitt/public/Files/' + req.session.user.Roll + '/' + rows[0].Attachment;
    var fileStream = fs.createReadStream(file);
    /*fileStream.on('end', function() {
      console.log("Reading done!!");
    });*/
    //res.end();

    res.download(file);
    console.log(file);
  });
});

module.exports = router;

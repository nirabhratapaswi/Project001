var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var dataReceived = req.body.id;
  //console.log("Download call made : ",dataReceived);
  var mysqlQuery = "SELECT Attachment FROM " + req.session.user.Roll + "Email WHERE id = " + dataReceived + ";";
  connection.query(mysqlQuery, function(err, rows, fields) {
    if(err)
      throw err;
    var file = './public/Files/' + req.session.user.Roll + '/' + rows[0].Attachment;
    //var file = path.join('/home/nirabhra/Desktop/ChemWeb19Nitt/public/Files/' + req.session.user.Roll + '/' + rows[0].Attachment);


    var response = { "data" : "download", "filename" : rows[0].Attachment };
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + file);
    res.setHeader('Content-type', mimetype);
    console.log(mimetype);
    var fileStream = fs.createReadStream(file);
    //fileStream.pipe(fs.createWriteStream('./public/Files/' + rows[0].Attachment));
    fileStream.pipe(res);
    fileStream.on('end', function() {
      console.log("Reading done!!");
    });
    //res.end();

    //res.download(file);
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'chemicalnitt19@gmail.com', // Your email id
            pass: 'cnitt1519' // Your password
        }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var text = 'Hello world from Nirabhra!';
  var mailOptions = {
    from: 'chemicalnitt19@gmail.com', // sender address
    to: 'nirabhratapaswi112121@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
  //res.render('index');
});

module.exports = router;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');
var session = require('client-sessions');

var routes = require('./routes/index');
var login = require('./routes/login');
var auth = require('./routes/auth');
var logout = require('./routes/logout');
var loginfirst = require('./routes/loginfirst');
var registration = require('./routes/registration');
var mail = require('./routes/mail');
var Emailcreate = require('./routes/Email/createmail');
var Emailsend = require('./routes/Email/sendmail');
var trial = require('./routes/ajax/trial');
var responseAjax = require('./routes/ajax/responseAjax');
//var users = require('./routes/users');

var app = express();

//mail config

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'session',
  secret: 'this_is_a_secret_string',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 60,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use('/', routes);
app.use('/login', login);
app.use('/auth', auth);
app.use('/logout', logout);
app.use('/loginfirst', loginfirst);
app.use('/registration', registration);
app.use('/mail', mail);
app.use('/Email/sendmail', Emailsend);
app.use('/Email/createmail', Emailcreate);
app.use('/ajax/trial', trial);
app.use('/ajax/responseAjax', responseAjax);

//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
//module.exports = transporter;

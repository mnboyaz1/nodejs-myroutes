var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require(__dirname+'/helpers/db');

//create models and controllers
var models = {
	user:require(__dirname+'/models/user'),
	//new
	lake:require(__dirname+'/models/lake'),
	user_email:require(__dirname+'/models/user_email'),
	weather_condition:require(__dirname+'/models/weather_condition'),
}

var controllers = {
	users:require(__dirname+'/controllers/users'),
	user_emails:require(__dirname+'/controllers/user_emails')
	
}

// Initialize App & Models
var app = express();
app.models = {
	user:new models.user(db),
	lake:new models.lake(db),
	user_email:new models.user_email(db),
	weather_condition:new models.weather_condition(db)
}

app.controllers = {
	users:new controllers.users(app, express),
	user_emails:new controllers.user_emails(app, express)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Controllers w/ Routes
for (var x in app.controllers) {
	console.log(x)
	app.controllers[x].init()
}

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
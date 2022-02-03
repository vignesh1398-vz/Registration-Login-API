var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('./logger/logger').logger;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  next(createError(404));
});

(async() => {
  try{
    logger.info('Server is up and running');
  }
  catch(error){
    logger.error(error.message);
  }
})();
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

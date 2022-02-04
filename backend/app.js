var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
var mongoose = require('mongoose');
var session = require('express-session')

const logger = require('./logger/logger').logger;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
require('./routes')(app);

app.use(function(req, res, next) {
  next(createError(404));
});

(async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
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
  res.json({message: err.message});
});

module.exports = app;

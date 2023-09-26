var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require ('session-file-store')(session); //this will import the session-file-store module and then call it with the session module as an argument
const passport = require('passport');
const authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const mongoose = require('mongoose'); 

const url = 'mongodb://localhost:27017/nucampsite'; //url to connect to MongoDB server
const connect = mongoose.connect(url, {
  useCreateIndex: true, //these are options for the connect method
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(()=> console.log('Connected correctly to server'), 
    err => console.log(err)
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321')); //this is the secret key for signed cookies. Doesnt have to be anything specific

app.use(session({
    name:'session-id', //this is the name of the session ID cookie that will be sent to the client
    secret:'12345-67890-09876-54321',
    saveUninitialized: false, //this will prevent us from having a bunch of empty session files - these are common 
    resave: false, //this will prevent us from resaving the session data back to the session store if its not been modified - these are common 
    store: new FileStore() // saves to the users hard memory insetad of sevrer
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
  } else {
          return next();
  }
}

app.use(auth); //this is the middleware function that we created above

app.use(express.static(path.join(__dirname, 'public')));

app.use ('/campsites', campsiteRouter);
app.use ('/promotions', promotionRouter);
app.use ('/partners', partnerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; ////////////////////////////////////////////////////////////////////// comeback and check on this?

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

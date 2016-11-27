require('dotenv').config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const api = require('./routes/api');
const users = require('./routes/users');
const models = require('./models')

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

/** *********************************************************
 *  PassportJS
 ********************************************************* */
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.User.find({ where: {username: username, password: crypto.createHash('md5').update(password).digest("hex") } })
      .then(function (user) {
        console.log('user : ', user);
        if (user !== null) {
          console.log('[AUTH] Success with username: ' + user.username + ' and password (md5-hash): ' + user.password);
          return done(null, user);
        }
        else {
          console.log('[AUTH] Error with username: ' + username + ' and password:' + password);
          console.log('[AUTH] md5-hash of passed password: ' + crypto.createHash('md5').update(password).digest("hex"));
          return done(null, false);
        }
      })
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Define a middleware function to be used for every secured routes
const auth = function (req, res, next) {
  if (!req.isAuthenticated()){
    console.log('[AUTH] Error 401');
    res.send(401);
  }else{
    console.log('[AUTH] Success by Session');
    next();
  }
};

app.use('/api', api);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;

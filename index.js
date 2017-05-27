/*jshint esversion: 6*/

//server
const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.envPORT || 6969;
const bodyParser = require('body-parser');

//User Auth
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = db;

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

app.use(bodyParser.json({extended: true}));

//startup Session
app.use(session({
  store: new RedisStore(),
  secret: 'letTheRythemJust',
  resave: false,
  saveUninitialized: true
}));

//set up passport
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy
passport.serializeUser(function(user, done) {
  console.log('SERIAL');
// ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('DESERIAL');
  // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    console.log("DESERIALIZEING USER", user);
    return done(null, user); // <------- inserts into the request object
  });
});

passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    User.findOne({
      where: {
        username: username
      }
    })
    .then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }
      else {
        console.log(user, user.password);
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }
));

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    req.login(user, function(err){
      if(err){
        res.send(err);
      }
      return res.send({"success" : true});
    });
  })(req,res,next);
});

app.get('/logout', function(req, res){
  console.log('hit logout');
  req.logout();
  res.json({successLogOut: true});
});

app.use('/api', require('./api'));

app.listen(6969, () =>{
  console.log(`server listening on port: ${PORT}`);
  db.sequelize.sync({forceSync: true});
});

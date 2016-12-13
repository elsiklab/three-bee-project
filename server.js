var express = require("express");
var app     = express();
var path    = require("path");
var passport = require("passport");
var passport_http = require("passport-http");


//app.use(express.static(path.join(__dirname, 'resources')));
app.use('/resources', express.static('resources'));

passport.use(new passport_http.BasicStrategy(
  function(username, password, done) {
    console.log("Inside middleware");
    if (username.valueOf() === 'test1' && password.valueOf() === 'test1') {
      console.log("VALID credentials");
        return done(null, true);
    }
    else {
      console.log("INVALID credentials");
      return done(null, false);
    }
  }
));

app.get('/',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log("Redirecting / to /index.html after successful authentication");
    res.redirect('/index.html');
});

app.get('/index.html',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log("Serving /index.html after successful authentication");
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(function (req, res, next) {
  console.log(req.url);
  console.log("Servinc 404.html");
  res.status(404).sendFile(path.join(__dirname+'/404.html'));
})

app.listen(4444);

console.log("Running at Port 4444");

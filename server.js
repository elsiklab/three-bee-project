var express = require("express");
var app     = express();
var path    = require("path");
var passport = require("passport");
var passport_http = require("passport-http");

passport.use(new passport_http.BasicStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.validPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
    if (username.valueOf() === 'test123' && password.valueOf() === 'test123') {
        return done(null, true);
    }
    else {
      return done(null, false);
    }
  }
));

app.get('/',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

// app.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });
//
// app.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

app.listen(4444);

console.log("Running at Port 4444");

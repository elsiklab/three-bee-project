var express = require("express");

var path    = require("path");
var passport = require("passport");
var passport_http = require("passport-http");
var port = 4444

var router = express.Router();
var app = express();
// router.get("/", function(req, res) {
//   console.log("request to router");
//   res.send({ message: "Whaddup!"});
// });

app.use("/three-bee-project", router);
router.use('/resources', express.static('resources'));
router.use('/datasets', express.static('datasets'));

passport.use(
  new passport_http.BasicStrategy(
    function(username, password, done) {
      console.log("Inside middleware");
      if (username.valueOf() === 'test' && password.valueOf() === 'test') {
        console.log("VALID credentials");
        return done(null, true);
      }
      else {
        console.log("INVALID credentials");
        return done(null, false);
      }
    }
  )
);

router.get('/',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log("Redirecting / to /three-bee-project/index.html after successful authentication");
    res.redirect('/three-bee-project/index.html');
});

router.get('/index.html',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log("Serving /index.html after successful authentication");
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log("Redirecting / to /three-bee-project/index.html after successful authentication");
    res.redirect('/three-bee-project/index.html');
});

app.use(function (req, res, next) {
  console.log(req.url);
  console.log("Serving 404.html");
  res.status(404).sendFile(path.join(__dirname+'/404.html'));
})

app.listen(port);

console.log(`Running at Port ${port}`);

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var MySQLStore = require('express-mysql-session')(session);
var Storeoptions = {
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: 'mydb'
};
var sessionStore = new MySQLStore(Storeoptions);

router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
router.use(cookieParser());

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
})

router.use(session({
  key: 'user_sid',
  secret: 'idealpancake',
  store: sessionStore,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: false,
  }
}));

router.get('/', (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    var username = req.session.user;

    req.session.regenerate(function(err) {
      req.session.user = username;
      req.session.save();
      res.send("logged");
      res.end();
    })
  } else {
    res.clearCookie('user_sid');
    res.send("not logged");
    res.end();
  }
});
module.exports = router;


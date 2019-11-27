var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

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

var Storeoptions = {
  host: 'localhost',
  //port: 9000,
  user: 'root',
  password: 'lolo',
  database: 'mydb'
};
var sessionStore = new MySQLStore(Storeoptions);

router.use(session({
  key: 'user_sid',
  secret: 'idealpancake',
  store: sessionStore,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: false,
  },
}));

router.post('/', function(req, res, next) {
  let username = req.body.login;
  let password = req.body.haslo;
  if (username && password) {
    var sql = "SELECT * FROM uzytkownicy WHERE login = \'" + username + "\' and haslo = \'" + password + "\'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (result.length > 0) {
        req.session.user = username;
        req.session.save();
        res.send('logged');
      } else {
        res.send('Niepoprawny użytkownik i/lub hasło!');
      }			
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

module.exports = router;


var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(express.json())

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
});

var Storeoptions = {
  host: 'localhost',
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

con.connect(function(err) {
  if (err) throw err;
  router.post('/', function (req, res, next) {
    let username = req.body.login;
    let email = req.body.email;
    var sql = "SELECT * FROM uzytkownicy WHERE login = \'" + username + "\' or adres_email = \'" + email + "\'";
    con.query(sql, function (err, result) {
      if (result.length > 0) {
        res.send('Dana nazwa użytkownika lub adres email już istnieje.');
      }else{
        var sql = 
          `INSERT INTO uzytkownicy (login, adres_email, imie, nazwisko, telefon, nazwa_firmy, numer_nip, ulica_zamieszkania, miasto_zamieszkania, kod_pocztowy, typ_uzytkownika, haslo)
           VALUES (`;
        for (var propName in req.body) {
          if (req.body.hasOwnProperty(propName) && req.body[propName] != "" && propName != 'haslo') {
            sql = sql + "\'" + req.body[propName] + "\', ";
          }
          if(req.body.hasOwnProperty(propName) && req.body[propName] == "" && propName != 'haslo'){
            sql = sql + " NULL, ";
          }
        }
        sql = sql + "\'0\',";
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body['haslo'], salt, function(err, hash) {
            sql = sql + "\'" + hash + "\');";
            con.query(sql, function (err, result) {
              req.session.user = username;
              req.session.save();
              res.send('signedup');
              if (err) throw err;
            });
          });
        });
      }
    });
  })
});

module.exports = router;
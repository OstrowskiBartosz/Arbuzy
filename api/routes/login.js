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

/*
  CREATE TABLE kategorie(
    id_kategorii MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nazwa_kategorii VARCHAR(100) NOT NULL
  );
  CREATE TABLE producenci(
    id_producenta MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nazwa_producenta VARCHAR(100) NOT NULL
  );
  CREATE TABLE produkty(
    id_produktu MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_kategorii MEDIUMINT NOT NULL,
    id_producenta MEDIUMINT NOT NULL,
    nazwa_produktu VARCHAR(150) NOT NULL,
    opis_produktu VARCHAR(5000) NOT NULL,
    FOREIGN KEY (id_kategorii) REFERENCES kategorie(id_kategorii),
    FOREIGN KEY (id_producenta) REFERENCES producenci(id_producenta)
  );
  CREATE TABLE atrybuty(
      id_atrybutu MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      id_produktu MEDIUMINT NOT NULL,
      atrybut VARCHAR(80) NOT NULL,
      wartosc VARCHAR(80) NOT NULL,
      FOREIGN KEY (id_produktu) REFERENCES produkty(id_produktu)
  );
  CREATE TABLE ceny(
    id_ceny MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_produktu MEDIUMINT NOT NULL,
    cena_netto FLOAT(7,2) NOT NULL,
    cena_brutto FLOAT(7,2) NOT NULL,
    procentvat TINYINT NOT NULL,
    od DATETIME NOT NULL,
    do DATETIME NOT NULL,
    FOREIGN KEY (id_produktu) REFERENCES produkty(id_produktu)
  );



*/
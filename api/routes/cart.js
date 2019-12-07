var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var async = require("async");

router.use(express.json())

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
})

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

function pobierzUzytkownikow(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyZnalezionoUzytkownika(zapytania, wyniki, callback){
  async.forEachOf(zapytania, (value, key, callback) => {
    pobierzUzytkownikow(value, function(err, result){
      wyniki = result;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); 
    callback(null, wyniki);
  });
}

function pobierzProdukty(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobranoProdukty(zapytania, wyniki, callback){
  async.forEachOf(zapytania, (value, key, callback) => {
    var grupyProduktow = [];
    var ProduktObiekt = new Object();
    pobierzProdukty(value, function(err, result){
      for(var row in result){
        ProduktObiekt.nazwa_produktu = result[row].nazwa_produktu;
        ProduktObiekt.cena = result[row].cena_brutto;
        ProduktObiekt.id_w_koszyku = result[row].id_produktu_w_koszyku;
        ProduktObiekt.ilosc = result[row].liczba;
        ProduktObiekt.zdjecie = result[row].zdjecie;
        grupyProduktow.push(ProduktObiekt);
        ProduktObiekt = new Object();
      }
      wyniki.produkty = grupyProduktow;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); 
    callback(null, wyniki);
  });
}

router.get('/', function(req, res, next) {
  let uzytkownik = req.session.user;
  var limit = 10;
  var offset = 0;
  var zapytania = [];
  var wyniki;
  zapytania[0] = `
  SELECT * FROM Uzytkownicy WHERE login = \'` + uzytkownik + `\';`;
  czyZnalezionoUzytkownika(zapytania, wyniki, function (err, wyniki) {
    if (wyniki.length > 0) {
      let id = wyniki[0].id_uzytkownika;
      zapytania[0] = `
      SELECT p.nazwa_produktu, c.cena_brutto, pwk.id_produktu_w_koszyku, count(p.nazwa_produktu) as liczba, a.wartosc as zdjecie
      FROM produkty_w_koszykach pwk
      INNER JOIN produkty p ON p.id_produktu = pwk.id_produktu
      INNER JOIN ceny c ON pwk.id_produktu=c.id_produktu
      INNER JOIN uzytkownicy u ON pwk.id_uzytkownika=u.id_uzytkownika
      INNER JOIN atrybuty a ON pwk.id_produktu=a.id_produktu
      WHERE pwk.id_uzytkownika = \'` + id + `\' and a.typ = 2
      GROUP BY p.nazwa_produktu
      LIMIT ` + limit + ` OFFSET ` + offset + `;`;
      var wyniki = new Object();
      czyPobranoProdukty(zapytania, wyniki, function (err, wyniki) {
        res.send(JSON.stringify(wyniki, null, 3));
        res.end();
      });
    }
  });
});
module.exports = router;
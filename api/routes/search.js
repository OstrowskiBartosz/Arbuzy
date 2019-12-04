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

function pobierzAtrybuty(produkt, callback){
  var wynikiAtrybuty = [];
  var sql = `
  SELECT a.atrybut, a.wartosc, a.typ
  FROM produkty p
  INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
  WHERE nazwa_produktu like \'%` + produkt + `%\'`;
  getWord(sql, function (err, resultAtrybuty) {
    if (resultAtrybuty.length > 0) {
      for(var rowAtrybuty in resultAtrybuty){
        wynikiAtrybuty.push({atrybut: resultAtrybuty[rowAtrybuty].atrybut, wartosc: resultAtrybuty[rowAtrybuty].wartosc, typ: resultAtrybuty[rowAtrybuty].typ});
      }
    }
    callback(null, wynikiAtrybuty);
  });
}

function getWord(sql, callback) {
  con.query(sql, function (err, resultAtrybuty) {
    if(err) return callback(err);
    callback(null, resultAtrybuty);
  });
}

function czyPobraneDane(result, callback) {
  wyniki = [];
  async.forEachOf(result, (value, key, callback) => {
    var wynikiProdukty = [];
    pobierzAtrybuty(value.nazwa_produktu, function(err, resultAtrybuty){
    wynikiAtrybuty = resultAtrybuty;
    wynikiProdukty.push({nazwa_produktu: value.nazwa_produktu, nazwa_kategorii: value.nazwa_kategorii, cena_brutto: value.cena_brutto, opis_produktu: value.opis_produktu, atrybuty: wynikiAtrybuty});
    wyniki.push({produkt: wynikiProdukty});
    callback();
   });
  }, err => {
    if (err) console.error(err.message);
    callback(null, wyniki)
  });
}

function pobierzLiczbeProduktow(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobraneDaneLiczbaProduktow(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    pobierzLiczbeProduktow(value, function(err, result){
    wyniki.push({liczba_przedmiotow: result[0].liczba_przedmiotow});
    callback(null, wyniki)
  });
  }, err => {
    if (err) console.error(err.message); callback(null, wyniki)
  });
}

function pobierzSortowania(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobraneDaneSortowania(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    var atrybuty = [];
    var grupySortowania = [];
    var ostatniAtrybut = null;
    var licznik = 0;
    pobierzSortowania(value, function(err, result){
      for(var row in result){
        if(result[row].atrybut != ostatniAtrybut && licznik !== 0 && ostatniAtrybut != null){
          grupySortowania.push({[ostatniAtrybut]: atrybuty});
          atrybuty = [];
          licznik = 0;
          atrybuty.push([result[row].wartosc])
          ostatniAtrybut = result[row].atrybut;
        }else{
          atrybuty.push([result[row].wartosc])
          ostatniAtrybut = result[row].atrybut;
          licznik++;
        }
        if(row==result.length-1){
          grupySortowania.push({[ostatniAtrybut]: atrybuty});
        }
      }
      wyniki.push({grupySortowania});
      callback(null, wyniki);
    });

  }, err => {
    if (err) console.error(err.message); callback(null, wyniki);
  });
}

// LIMIT (pageNo - 1) * PageSize, PageSize
router.post('/', function(req, res, next) {
  let nazwa_produktu = req.body.nazwa_produktu;
  if (nazwa_produktu) {
    var zapytania = [];
    zapytania[0]= `
      SELECT count(p.nazwa_produktu) as liczba_przedmiotow
      FROM produkty p
      INNER JOIN ceny c ON p.id_produktu=c.id_produktu
      INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
      WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\';
    `;
    var sql = `
    SELECT p.nazwa_produktu, k.nazwa_kategorii, c.cena_brutto, p.opis_produktu, count(p.nazwa_produktu) as liczba_przedmiotow
    FROM produkty p
    INNER JOIN ceny c ON p.id_produktu=c.id_produktu
    INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
    WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\'`;
    con.query(sql, (err, result) => {
      czyPobraneDane(result, function (err, wyniki) {
        zapytania[0]= `
        SELECT count(p.nazwa_produktu) as liczba_przedmiotow
        FROM produkty p
        INNER JOIN ceny c ON p.id_produktu=c.id_produktu
        INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
        WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\';
      `;
        czyPobraneDaneLiczbaProduktow(zapytania, wyniki, function (err, wyniki) {
          zapytania[0] = `
          SELECT a.atrybut, a.wartosc, a.typ
          FROM produkty p
          INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
          WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\'
          ORDER BY A.atrybut;
        `;
          czyPobraneDaneSortowania(zapytania, wyniki, function (err, wyniki) {
            res.send(JSON.stringify(wyniki, null, 1));
          });
        });
      });
    });
  }
});
module.exports = router;


/*
    SELECT count(p.nazwa_produktu) as liczba_przedmiotow
    FROM produkty p
    INNER JOIN ceny c ON p.id_produktu=c.id_produktu
    INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
    WHERE nazwa_produktu like '%geforce%';

  SELECT a.atrybut, a.wartosc, a.typ
  FROM produkty p
  INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
  WHERE nazwa_produktu like '%geforce%'
  ORDER BY A.atrybut;
*/
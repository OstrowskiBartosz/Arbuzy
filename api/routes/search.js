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

function pobierzAtrybuty(sql, callback) {
  con.query(sql, function (err, resultAtrybuty) {
    if(err) return callback(err);
    callback(null, resultAtrybuty);
  });
}

function czyPobranoAtrybuty(produkt, callback){
  var wynikiAtrybuty = [];
  var sql = `
  SELECT a.atrybut, a.wartosc, a.typ
  FROM produkty p
  INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
  WHERE nazwa_produktu like \'%` + produkt + `%\' and a.typ != 2 and a.typ != 3`;
  pobierzAtrybuty(sql, function (err, resultAtrybuty) {
    if (resultAtrybuty.length > 0) {
      for(var rowAtrybuty in resultAtrybuty){
        wynikiAtrybuty.push({atrybut: resultAtrybuty[rowAtrybuty].atrybut, wartosc: resultAtrybuty[rowAtrybuty].wartosc, typ: resultAtrybuty[rowAtrybuty].typ});
      }
    }
    callback(null, wynikiAtrybuty);
  });
}

function czyPobraneDane(result, callback) {
  wyniki = new Object();
  var wynikiParametry= [];
  async.forEachOf(result, (value, key, callback) => {
    czyPobranoAtrybuty(value.nazwa_produktu, function(err, resultAtrybuty){
    wynikiAtrybuty = resultAtrybuty;
    wynikiParametry.push({nazwa_produktu: value.nazwa_produktu, id_produktu: value.id_produktu, nazwa_kategorii: value.nazwa_kategorii, cena_brutto: value.cena_brutto, opis_produktu: value.opis_produktu, zdjecie: value.wartosc, atrybuty: wynikiAtrybuty});
   });
   wyniki.produkty = wynikiParametry;
   callback();
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

function czyPobranoLiczbeProduktow(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    pobierzLiczbeProduktow(value, function(err, result){
    wyniki.liczba_przedmiotow = result[0].liczba_przedmiotow;
    callback(null, wyniki)
  });
  }, err => {
    if (err) console.error(err.message); callback(null, wyniki)
  });
}

function pobierzFiltry(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobranoFiltry(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    var atrybuty = [];
    var grupyFiltrowania = [];
    var ostatniAtrybut = null;
    var licznik = 0, suma = 0;
    var AtrybutyObiekt = new Object();
    pobierzFiltry(value, function(err, result){
      for(var row in result){
        if(result[row].atrybut != ostatniAtrybut && licznik !== 0 && ostatniAtrybut != null){
          AtrybutyObiekt.atrybut = ostatniAtrybut;
          AtrybutyObiekt.wartosci = atrybuty;
          AtrybutyObiekt.liczba_produktow = suma;
          grupyFiltrowania.push(AtrybutyObiekt);
          AtrybutyObiekt = new Object();
          suma = 0; atrybuty = [];
          atrybuty.push({"wartosc": result[row].wartosc, "id": result[row].id_atrybutu, "liczba_produktow": result[row].liczba});
          suma = suma + result[row].liczba;
          ostatniAtrybut = result[row].atrybut;
          licznik = 1;
        }else{
          atrybuty.push({"wartosc": result[row].wartosc, "id": result[row].id_atrybutu, "liczba_produktow": result[row].liczba});
          suma = suma + result[row].liczba;
          ostatniAtrybut = result[row].atrybut;
          licznik++;
        }
        if(row==result.length-1){
          AtrybutyObiekt.atrybut = ostatniAtrybut;
          AtrybutyObiekt.wartosci = atrybuty;
          AtrybutyObiekt.liczba_produktow = suma;
          grupyFiltrowania.push(AtrybutyObiekt);
        }
      }
      wyniki.filtry = grupyFiltrowania;
      callback(null, wyniki);
    });

  }, err => {
    if (err) console.error(err.message); callback(null, wyniki);
  });
}

function pobierzKategoriee(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobranoKategorie(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    var grupyKategorii = [];
    var KategorieObiekt = new Object();
    pobierzKategoriee(value, function(err, result){
      for(var row in result){
        KategorieObiekt.nazwa_kategorii = result[row].nazwa_kategorii;
        KategorieObiekt.id_kategorii = result[row].id_kategorii;
        KategorieObiekt.liczba_produktow = result[row].liczba;
        grupyKategorii.push(KategorieObiekt);
        KategorieObiekt = new Object();
      }
      wyniki.kategorie = grupyKategorii;
      callback(null, wyniki);
    });

  }, err => {
    if (err) console.error(err.message); callback(null, wyniki);
  });
}

function pobierzProducentow(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyPobranoProducentow(zapytania, wyniki,  callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    var grupyproducentow = [];
    var ProducenciObiekt = new Object();
    pobierzProducentow(value, function(err, result){
      for(var row in result){
        ProducenciObiekt.nazwa_producenta= result[row].nazwa_producenta;
        ProducenciObiekt.id_producenta = result[row].id_producenta;
        ProducenciObiekt.liczba_produktow = result[row].liczba;
        grupyproducentow.push(ProducenciObiekt);
        ProducenciObiekt = new Object();
      }
      wyniki.producenci = grupyproducentow;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); callback(null, wyniki);
  });
}

router.post('/', function(req, res, next) {
  let nazwa_produktu = req.body.nazwa_produktu;
  let strona = req.body.strona;
  let limit = req.body.limit;
  if (nazwa_produktu && strona && limit) {
    let offset = (limit*strona)-limit;
    var zapytania = [];
    zapytania[0] = `
    SELECT p.nazwa_produktu, p.id_produktu, k.nazwa_kategorii, c.cena_brutto, p.opis_produktu, a.wartosc 
    FROM produkty p
    INNER JOIN ceny c ON p.id_produktu=c.id_produktu
    INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
    INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
    WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\'
    and a.typ = 2
    LIMIT ` + limit + ` OFFSET ` + offset + `;`
    con.query(zapytania[0], (err, result) => {
      czyPobraneDane(result, function (err, wyniki) {
        zapytania[0]= `
        SELECT count(p.nazwa_produktu) as liczba_przedmiotow
        FROM produkty p
        INNER JOIN ceny c ON p.id_produktu=c.id_produktu
        INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
        WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\';`;
        czyPobranoLiczbeProduktow(zapytania, wyniki, function (err, wyniki) {
          zapytania[0] = `
          SELECT a.id_atrybutu, a.atrybut, a.wartosc, a.typ, count(a.wartosc) as liczba
          FROM produkty p
          INNER JOIN atrybuty a ON p.id_produktu=a.id_produktu
          WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\' and a.typ != 2 and a.typ != 3 
          GROUP BY a.wartosc
          ORDER BY a.atrybut;`;
          czyPobranoFiltry(zapytania, wyniki, function (err, wyniki) {
            zapytania[0] = `
            SELECT k.id_kategorii, k.nazwa_kategorii, count(p.nazwa_produktu) as liczba
            FROM produkty p
            INNER JOIN kategorie k ON p.id_kategorii=k.id_kategorii
            WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\'
            GROUP BY nazwa_kategorii;`;
            czyPobranoKategorie(zapytania, wyniki, function (err, wyniki) {
              zapytania[0] = `
              SELECT pp.id_producenta, pp.nazwa_producenta, count(p.nazwa_produktu) as liczba
              FROM produkty p
              INNER JOIN producenci pp ON p.id_producenta=pp.id_producenta
              WHERE nazwa_produktu like \'%` + nazwa_produktu + `%\'
              GROUP BY nazwa_producenta;`;
              czyPobranoProducentow(zapytania, wyniki, function (err, wyniki) {
                res.send(JSON.stringify(wyniki, null, 3));
                res.end();
              });
            });
          });
        });
      });
    });
  }else{
    res.send("wyslij poprawne dane.");
    res.end();
  }
});
module.exports = router;
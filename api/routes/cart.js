var express = require('express');
var router = express.Router();
var con = require('./database_connection');
var async = require("async");

router.use(express.json())

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
        ProduktObiekt.id_produktu = result[row].id_produktu;
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

function usunProduktyWKoszyku(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}


function czyUsunietoProdukty(zapytania, wyniki, callback){
  async.forEachOf(zapytania, (value, key, callback) => {
    usunProduktyWKoszyku(value, function(err, result){
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); 
    callback(null, wyniki);
  });
}

router.delete('/', function(req, res, next) {
  let id_produktu_w_koszyku = req.body.id_produktu_w_koszyku;
  let id_produktu = req.body.id_produktu;
  let uzytkownik = req.session.user;
  var zapytania = [];
  var wyniki;
  zapytania[0] = `
  SELECT * FROM Uzytkownicy WHERE login = \'` + uzytkownik + `\';`;
  czyZnalezionoUzytkownika(zapytania, wyniki, function (err, wyniki) {
    if (wyniki.length > 0) {
      let id_uzytkownika = wyniki[0].id_uzytkownika;
      zapytania[0] = `
      DELETE FROM produkty_w_koszykach 
      WHERE id_uzytkownika = `+ id_uzytkownika +`
      AND id_produktu = `+ id_produktu +`;`;
      var wyniki = new Object();
      czyUsunietoProdukty(zapytania, wyniki, function (err, wyniki) {
        res.send("Produkt został usunięty.");
        res.end();
      });
    }else{
      res.send("Wystąpił błąd.");
      res.end();
    }
  });
});

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
      SELECT p.nazwa_produktu, p.id_produktu, c.cena_brutto, pwk.id_produktu_w_koszyku, count(p.nazwa_produktu) as liczba, a.wartosc as zdjecie
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
    }else{
      res.send("Wystąpił błąd.");
      res.end();
    }
  });
});
module.exports = router;
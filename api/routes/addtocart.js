var express = require('express');
var router = express.Router();
var con = require('./database_connection');
var async = require("async");

router.use(express.urlencoded({ extended: true }));
router.use(express.json())



function DodajDoKoszyka(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyDodanoDoKoszyka(zapytania, wyniki, callback) {
  async.forEachOf(zapytania, (value, key, callback) => {
    DodajDoKoszyka(value, function(err, result){
      wyniki = result;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message);
    callback(null, wyniki);
  });
}

function pobierzUProduktWkoszyku(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyZnalezionoProduktWKoszyku(zapytania, wyniki, callback){
  async.forEachOf(zapytania, (value, key, callback) => {
    pobierzUProduktWkoszyku(value, function(err, result){
      wyniki = result;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); 
    callback(null, wyniki);
  });
}

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

router.post('/', function(req, res, next) {
  let id_produktu = req.body.id_produktu;
  let ilosc = req.body.ilosc;
  let uzytkownik = req.session.user;
  var zapytania = [];
  var wyniki;
  if (id_produktu && ilosc && uzytkownik) {
    zapytania[0] = `
    SELECT * FROM Uzytkownicy WHERE login = \'` + uzytkownik + `\';`;
    czyZnalezionoUzytkownika(zapytania, wyniki, function (err, wyniki) {
      if (wyniki.length > 0) {
        let id = wyniki[0].id_uzytkownika;
        id_produktu = id_produktu.substring(1);
        zapytania[0] = `
        SELECT * FROM produkty_w_koszykach 
        WHERE id_uzytkownika = \'` + id + `\'
        AND id_produktu = \'` + id_produktu + `\';`;
        czyZnalezionoProduktWKoszyku(zapytania, wyniki, function (err, wyniki) {
          if (wyniki.length > 0) {
            let id_produktu_w_koszyku = wyniki[0].id_produktu_w_koszyku;
            zapytania[0] = `
            UPDATE produkty_w_koszykach
            SET ilosc = ilosc + 1 
            WHERE id_produktu_w_koszyku = ` + id_produktu_w_koszyku + `;`;
            czyDodanoDoKoszyka(zapytania, wyniki, function (err, wyniki) {
              res.send('Przedmiot został dodany do koszyka.');
              res.end();
            })
          }else{
            zapytania[0] = `
            INSERT INTO produkty_w_koszykach(id_uzytkownika, id_produktu, ilosc)
            VALUES(`+ id +`, `+ id_produktu +`, `+ ilosc +`);`
            czyDodanoDoKoszyka(zapytania, wyniki, function (err, wyniki) {
              res.send('Przedmiot został dodany do koszyka.');
              res.end();
            })
          }
        });
      }else{
        res.send('Wystąpił błąd.');
        res.end();
      }
    });
  }
});

module.exports = router;
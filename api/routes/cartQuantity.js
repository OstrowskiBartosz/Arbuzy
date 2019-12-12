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

function zuaktualizujIlosc(sql, callback){
  con.query(sql, function(err, result){
    if(err) return callback(err);
    callback(null, result);
  });
}

function czyZaktualizowanoIlosc(zapytania, wyniki, callback){
  async.forEachOf(zapytania, (value, key, callback) => {
    zuaktualizujIlosc(value, function(err, result){
      wyniki = result;
      callback(null, wyniki);
    });
  }, err => {
    if (err) console.error(err.message); 
    callback(null, wyniki);
  });
}

router.post('/', function(req, res, next) {
  let uzytkownik = req.session.user;
  let znak = req.body.znak;
  let id_produktu_w_koszyku = req.body.id_produktu_w_koszyku;
  var zapytania = [];
  var wyniki;
  if( uzytkownik && znak && id_produktu_w_koszyku){
    zapytania[0] = `
    SELECT * FROM Uzytkownicy WHERE login = \'` + uzytkownik + `\';`;
    czyZnalezionoUzytkownika(zapytania, wyniki, function (err, wyniki) {
      if (wyniki.length > 0) {
        let id = wyniki[0].id_uzytkownika;
        zapytania[0] = `
        UPDATE produkty_w_koszykach
        SET ilosc = ilosc` + znak +`1 
        WHERE id_produktu_w_koszyku = ` + id_produktu_w_koszyku + `
        and id_uzytkownika = ` + id + `;`;
        var wyniki = new Object();
        czyZaktualizowanoIlosc(zapytania, wyniki, function (err, wyniki) {
          res.send("zmieniono");
          res.end();
        });
      }else{
        res.send("Wystąpił błąd.");
        res.end();
      }
    });
  }
  else{
    res.send("Wystąpił błąd.");
    res.end();
  }
});
module.exports = router;
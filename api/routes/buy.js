var express = require('express');
var router = express.Router();
var con = require('./database_connection');

router.use(express.json());

router.post('/', function(req, res, next) {
  let user = req.session.user;
  var sql = "SELECT * FROM uzytkownicy WHERE login = '" + user + "';";
  con.query(sql, function(err, result) {
    userID = result[0].id_uzytkownika;
    var sql = `
    select x.id_produktu, x.ilosc, p.nazwa_produktu, c.cena_netto, c.cena_brutto FROM (
      SELECT id_produktu, ilosc 
      FROM produkty_w_koszykach
      WHERE id_uzytkownika = ${userID}
    ) AS X
    INNER JOIN produkty p on x.id_produktu=p.id_produktu
    INNER JOIN ceny c on x.id_produktu=c.id_produktu;
    `;
    con.query(sql, function(err, result2) {
      let cena_brutto = 0;
      let cena_netto = 0;
      for(let iter in result2){
        cena_brutto = cena_brutto + result2[iter].cena_brutto*result2[iter].ilosc;
        cena_netto = cena_netto + result2[iter].cena_netto*result2[iter].ilosc;
      }
      var firma = result[0].nazwa_firmy !== null ? "\""+result[0].nazwa_firmy+"\"" : "NULL";
      var NIP_n = result[0].numer_nip !== null ? "\""+result[0].numer_nip+"\"" : "NULL";
      var sql = `
      insert into faktury(id_uzytkownika, data, wartosc_netto, wortosc_brutto, wartosc_vat, nazwa, ulica, miasto, kod_pocztowy, numer_nip, nazwa_firmy)
      VALUES("${userID}", NOW(), "${cena_netto.toFixed(2)}", "${cena_brutto.toFixed(2)}", "23.00", "${result[0].imie} ${result[0].nazwisko}", 
      "${result[0].ulica_zamieszkania}", "${result[0].miasto_zamieszkania}", "${result[0].kod_pocztowy}", ${NIP_n}, ${firma});`;
      con.query(sql, function(err, result3) {
        var sql = ` 
        delete from produkty_w_koszykach
        WHERE id_uzytkownika = ${userID};`;
        con.query(sql, function(err, result4) {
          res.send("kupiono");
        });
      });
    });
  });

});
module.exports = router;
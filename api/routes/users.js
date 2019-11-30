var express = require('express');
var router = express.Router();
router.use(express.json())

var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
  router.post('/', function (req, res, next) {
    let username = req.body.login;
    let email = req.body.email;
    var sql = "SELECT * FROM uzytkownicy WHERE login = \'" + username + "\' or adres_email = \'" + email + "\'";
    con.query(sql, function (err, result) {
      if (result.length > 0) {
        res.send('Dany użytkownik już istnieje.');
      }else{
        var sql = 
          `INSERT INTO uzytkownicy (login, haslo, adres_email, imie, nazwisko, telefon, nazwa_firmy, numer_nip, ulica_zamieszkania, miasto_zamieszkania, kod_pocztowy, typ_uzytkownika)
           VALUES (`;
        for (var propName in req.body) {
          if (req.body.hasOwnProperty(propName) && req.body[propName] != "") {
            sql = sql + "\'"+req.body[propName] + "\', ";
          }
          if(req.body.hasOwnProperty(propName) && req.body[propName] == ""){
            sql = sql +" NULL, ";
          }
        }
        sql = sql + "\'0\');";
        con.query(sql, function (err, result) {
          console.log("dodano;")
          res.send('signedup');
          if (err) throw err;
        });
      }
    });
  });
});

module.exports = router;
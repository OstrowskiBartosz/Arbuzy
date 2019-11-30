var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var mysql = require('mysql');

const bcrypt = require('bcrypt');
const saltRounds = 10;

=======
>>>>>>> da18daa82b1a28492211c3ca5d9b6e52af947861
router.use(express.json());

var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
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
              console.log("dodano;");
              res.send('signedup');
              res.end();
              if (err) throw err;
            });
          });
        });
      }
    });
<<<<<<< HEAD
  })
=======
  });
>>>>>>> da18daa82b1a28492211c3ca5d9b6e52af947861
});

module.exports = router;
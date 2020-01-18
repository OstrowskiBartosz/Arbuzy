var express = require("express");
var router = express.Router();
var con = require("./database_connection");
router.use(express.json());

router.post("/", function(req, res, next) {
  var invoiceData = { error: true };
  let user = req.session.user;
  let invoiceID = req.body.invoiceID;
  var sql =
    "SELECT id_uzytkownika FROM uzytkownicy WHERE login = '" + user + "';";
  con.query(sql, function(err, result) {
    userID = result[0].id_uzytkownika;
    var sql =
      "SELECT data, wartosc_netto, wortosc_brutto FROM faktury WHERE id_uzytkownika = " +
      userID +
      " AND id_faktury = " +
      invoiceID +
      " ORDER BY id_faktury DESC;";
    con.query(sql, function(err, result) {
      if (result.length > 0) {
        invoiceData = {
          ...invoiceData,
          error: false,
          invoiceID: req.body.invoiceID,
          invoiceDate: result[0].data,
          invoiceNetto: result[0].wartosc_netto,
          invoiceBrutto: result[0].wortosc_brutto
        };
        var sql =
          "SELECT id_produktu, cena_netto, cena_brutto, procent_vat FROM pozycje_faktur WHERE id_faktury = " +
          invoiceID;
        con.query(sql, function(err, result) {
          invoiceData = {
            ...invoiceData,
            produkty: result
          };
          res.send(JSON.stringify(invoiceData));
          res.end();
        });
      } else {
        res.send(JSON.stringify(invoiceData));
        res.end();
      }
    });
  });
});

module.exports = router;

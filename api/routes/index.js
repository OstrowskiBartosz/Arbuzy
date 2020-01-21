var express = require('express');
var router = express.Router();
var con = require("./database_connection");
router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var produkty = { error: true };
  var sql = "SELECT produkty.id_produktu, produkty.nazwa_produktu, atrybuty.wartosc, ceny.cena_brutto " +
  "FROM (SELECT * FROM produkty ORDER BY rand() LIMIT 6) produkty " + 
  "LEFT JOIN atrybuty ON produkty.id_produktu = atrybuty.id_produktu AND atrybuty.typ=2 " +
  "LEFT JOIN ceny ON produkty.id_produktu = ceny.id_produktu;";
  con.query(sql, function(err, result) {
    produkty = {
      ...produkty,
      polecane: result
    };
    res.send(JSON.stringify(produkty));
    res.end();
  });
});

module.exports = router;

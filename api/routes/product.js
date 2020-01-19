var express = require("express");
var router = express.Router();
var con = require("./database_connection");
router.use(express.json());

router.post("/", function(req, res, next) {
  let id_produktu = req.body.productID;
  var sql = "SELECT * FROM produkty WHERE id_produktu = '" + id_produktu + "';";
  con.query(sql, function(err, result) {
    res.send(JSON.stringify(result));
    res.end();
  });
});

module.exports = router;

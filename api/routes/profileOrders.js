var express = require("express");
var router = express.Router();
var con = require("./database_connection");
router.use(express.json());

function getUserId(user, res) {
  return new Promise(function(resolve, reject) {
    var sql =
      "SELECT id_uzytkownika FROM uzytkownicy WHERE login = '" + user + "';";
    con.query(sql, function(err, result) {
      resolve(result[0].id_uzytkownika);
    });
  });
}

router.post("/", function(req, res, next) {
  let user = req.session.user;
  let user_id = 0;
  getUserId(user, res)
    .then(function(result) {
      user_id = result;
      var sql =
        "SELECT * FROM faktury WHERE id_uzytkownika = '" + user_id + "';";
      con.query(sql, function(err, result) {
        res.send(JSON.stringify(result));
        res.end();
      });
    })
    .catch(function() {
      res.send(JSON.stringify("error"));
      res.end();
    });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var con = require("./database_connection");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/", (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    let user = req.session.user;
    res.clearCookie("user_sid");
    req.session.destroy();
    var sql = "DELETE FROM uzytkownicy WHERE login = '" + user + "';";
    con.query(sql, function(err, result) {});
    res.send("loggedout");
    res.end();
  } else {
    res.send("wtf?");
    res.end();
  }
});
module.exports = router;

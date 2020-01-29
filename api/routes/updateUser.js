var express = require("express");
var router = express.Router();
var con = require("./database_connection");
router.use(express.json());

router.post("/", function(req, res, next) {
  let user = req.session.user;
});

module.exports = router;

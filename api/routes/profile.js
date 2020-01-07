var express = require('express');
var router = express.Router();
var con = require('./database_connection');
router.use(express.json())

router.post('/', function(req, res, next) {
    let user_id = req.body.user_id;
    var sql = "SELECT * FROM faktury WHERE id_uzytkownika = \'" + user_id + "\';";
});
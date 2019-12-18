
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

var con = mysql.createConnection({
  host: '10.128.9.155',
  user: 'arbuz',
  password: 'lolo',
  database: "mydb",
  charset : 'utf8_unicode_ci',
})

module.exports = con;
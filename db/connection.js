/*jshint esversion: 6*/

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'database_test',
  user: 'MyMBP'
};
const PGP = require('pg-promise') ();
const db = PGP(cn);

module.exports = db;
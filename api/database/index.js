const mysql = require('mysql');
const util = require('util');
const db = require('../config/db.config');

const conn = mysql.createConnection({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_DATABASE,
  port: db.DB_PORT,
  charset: 'utf8mb4',
  dateStrings: true
});

const dbQuery = util.promisify(conn.query).bind(conn);

module.exports = { dbQuery };

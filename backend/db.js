const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Sath@1902",
  database: "ccdatabase",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = { pool };

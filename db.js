const mysql = require('mysql2/promise');

async function getConnection() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test',
  });
  console.log("connected")
  return connection;
}

module.exports = { getConnection };

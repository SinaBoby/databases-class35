const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});
const execQuery = util.promisify(connection.query.bind(connection));

async function createTable() {
  const CREATE_AUTHORS = `CREATE TABLE IF NOT EXISTS authors (author_no INT PRIMARY KEY AUTO_INCREMENT,author_name VARCHAR(50) NOT NULL UNIQUE, university VARCHAR(50), date_of_birth DATE, h_index INT, gender
  ENUM('m','f'));`;
  const ADD_MENTOR = `ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_no);
  `
  connection.connect();
  try {
    await execQuery(CREATE_AUTHORS);
    await execQuery(ADD_MENTOR)
  } catch (err) {
    console.error(err);
    connection.end()
  }
  connection.end();
}
createTable();

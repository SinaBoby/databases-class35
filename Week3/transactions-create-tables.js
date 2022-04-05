const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_ACCOUNTS = `
  CREATE TABLE IF NOT EXISTS accounts (
  account_no INT NOT NULL PRIMARY KEY, 
  balance FLOAT
  );`
  const CREATE_ACCOUNT_CHANGES = `
  CREATE TABLE IF NOT EXISTS accounts_changes ( change_number INT NOT NULL PRIMARY KEY AUTO_INCREMENT, account_number INT NOT NULL, 
  amount FLOAT, 
  changed_date DATE NOT NULL, 
  remark varchar(50),
  CONSTRAINT fk_account FOREIGN KEY (account_number) REFERENCES accounts(account_no)
  );`
  connection.connect();
  try {
    await execQuery('DROP TABLE IF EXISTS accounts_changes;');
    await execQuery(`DROP TABLE IF EXISTS accounts;`);
    await execQuery(CREATE_ACCOUNTS)
    await execQuery(CREATE_ACCOUNT_CHANGES)
  } catch (err) {
    console.error(err);
    connection.end();
  }
  connection.end();
}
seedDatabase();
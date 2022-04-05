const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));
async function seedDataBase() {
  const changes = [
    {
      account_number: 1060,
      amount: -1000,
      changed_date: `2022-12-20`,
      remark: 'buy laptop',
    },
    {
      account_number: 1070,
      amount: 1000,
      changed_date: `2022-12-20`,
      remark: 'sell laptop',
    },
  ];
  connection.connect();
  try {
    await execQuery(`set autocommit = 0;`);
    await execQuery(`START TRANSACTION;`);
    await execQuery(
      `UPDATE accounts SET balance = balance - 1000 WHERE account_no = 1060;`,
    );
    await execQuery(
      `UPDATE accounts SET balance = balance + 1000 WHERE account_no = 1070;`,
    );
    changes.forEach(async (change) => {
      await execQuery(`INSERT INTO accounts_changes SET ?`, change);
    });

    await execQuery(`COMMIT;`);
    await execQuery(`set autocommit = 1;`);
  } catch (error) {
    console.log(error);
    await execQuery(`ROLLBACK;`);
    connection.end();
  }
  connection.end();
}
seedDataBase();

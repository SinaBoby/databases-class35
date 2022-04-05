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
  const INSERT_ACCOUNTS = `
  INSERT INTO accounts VALUES 
  (1060,6000),
  (1065,7000),
  (1070,5000),
  (1075,10000),
  (1080,7300);
  `;
  const INSERT_ACCOUNT_CHANGES = `
  INSERT INTO accounts_changes set ?`;
  const changes = [
    {
      account_number: 1060,
      amount: -1000,
      changed_date: '2022-10-02',
      remark: 'buy laptop',
    },
    {
      account_number: 1070,
      amount: 1000,
      changed_date: '2022-10-02',
      remark: 'sell laptop',
    },
    {
      account_number: 1065,
      amount: 500,
      changed_date: '2022-11-02',
      remark: 'rent allowance',
    },
    {
      account_number: 1075,
      amount: 3000,
      changed_date: '2022-12-02',
      remark: 'salary',
    },
    {
      account_number: 1075,
      amount: -1000,
      changed_date: '2022-12-02',
      remark: 'House rent',
    },
    {
      account_number: 1080,
      amount: 1000,
      changed_date: '2022-12-02',
      remark: 'Sell IPhone',
    },
    {
      account_number: 1065,
      amount: -1000,
      changed_date: '2022-12-02',
      remark: 'Buy IPhone',
    },
    {
      account_number: 1080,
      amount: 4000,
      changed_date: '2022-12-02',
      remark: 'Salary',
    }
  ];
  connection.connect();
  try {
    await execQuery(`TRUNCATE TABLE accounts_changes;`);
    await execQuery(INSERT_ACCOUNTS);

    changes.forEach(async (change) => {
      await execQuery(INSERT_ACCOUNT_CHANGES, change);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();

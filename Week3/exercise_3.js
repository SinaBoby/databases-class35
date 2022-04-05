const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
  multipleStatements: true
});
const cb = (...result) => {
  for(let r of result ){
    console.log(r)
  }
};
/* function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population,Name FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
      conn.end()
    },
  );
} */

//Calling function with these arguments give us the whole COUNTRY TABLE
//getPopulation('country', "Abc' or '1=1",`abc' or '1=1';select * from country;` ,cb)

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population,Name FROM ${Country} WHERE Name =`+ conn.escape(name)+ 'AND code=' + conn.escape(code) ,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
      conn.end()
    },
  );
}


getPopulation('country', "Angola",`AGO` ,cb)
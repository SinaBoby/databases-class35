const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
  port: 3306,
});

connection.connect(() => console.log('connected'));

//What are the names of countries with population greater than 8 million?
const q1_sql = `SELECT name FROM city WHERE Population > 8000000;`;

connection.query(q1_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});

//What are the names of countries that have “land” in their names?

const q2_sql = `SELECT Name FROM country WHERE Name LIKE '%land%';`;
connection.query(q2_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});

//What are the names of the cities with population in between 500,000 and 1 million?

const q3_sql = `SELECT name FROM city WHERE Population BETWEEN 500000 AND 1000000`;
connection.query(q3_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What's the name of all the countries on the continent ‘Europe’?

const q4_sql = `SELECT name FROM COUNTRY WHERE continent = 'Europe';`;
connection.query(q4_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//List all the countries in the descending order of their surface areas.
const q5_sql = `SELECT name,SurfaceArea FROM Country ORDER BY SurfaceArea DESC;`;
connection.query(q5_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What are the names of all the cities in the Netherlands?
const q6_sql = ` SELECT name FROM city WHERE countryCode = 'NLD';`;
connection.query(q6_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What is the population of Rotterdam?
const q7_sql = `SELECT Population FROM city WHERE name = 'Rotterdam'`;
connection.query(q7_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What's the top 10 countries by Surface Area?
const q8_sql = `SELECT name,SurfaceArea FROM Country ORDER BY SurfaceArea DESC LIMIT 10`;
connection.query(q8_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What's the top 10 most populated cities?
const q9_sql = `SELECT name,Population FROM city ORDER BY Population DESC LIMIT 10`;
connection.query(q9_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
//What is the population number of the world?
const q10_sql = `SELECT SUM(Population) AS TotalPopulation FROM Country`;
connection.query(q10_sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
connection.end();

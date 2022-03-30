const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});


const execQuery = (query) => {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

const PRINT_ALL_AUTHORS_AND_MENTORS = `
  SELECT a.author_no AS author_id,
  a.author_name as author_name,
  b.author_name as mentor_name
  from authors as a
  JOIN authors as b
  ON a.mentor = b.author_no;
`;

const PRINT_ALL_AUTHORS_COLUMNS_AND_PAPER_TITLE = `
  SELECT authors.*, research_Papers.paper_title 
  FROM authors
  LEFT JOIN author_paper 
  ON author_paper.author_id = authors.author_no
  LEFT JOIN research_Papers
  ON author_paper.paper_id = research_Papers.paper_id;
`;

connection.connect();

execQuery(PRINT_ALL_AUTHORS_AND_MENTORS);
execQuery(PRINT_ALL_AUTHORS_COLUMNS_AND_PAPER_TITLE);

connection.end();
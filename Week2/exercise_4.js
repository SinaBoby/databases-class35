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
  })
}

connection.connect();

const PRINT_ALL_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS = `
SELECT research_Papers.paper_title, COUNT(author_paper.author_id) 
AS number_of_authors
FROM  research_Papers
JOIN author_paper ON research_Papers.paper_id = author_paper.paper_id 
GROUP BY research_Papers.paper_title;
`;

const PRINT_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES = `
SELECT COUNT(author_paper.paper_id) FROM authors
INNER JOIN author_paper
ON author_paper.author_id = authors.author_no 
GROUP BY gender
HAVING gender = 'f';
`;

const PRINT_AVE_OF_H_INDEX_AUTHORS = `
SELECT university AS University, AVG(h_index) AS Average_h_index
FROM authors
GROUP BY university;
`;

const PRINT_SUM_RES_PAPERS_AUTHORS_PER_UNIVERSITY = `
SELECT university, COUNT(author_paper.paper_id) AS Sum_of_Research_Papers
FROM authors 
INNER JOIN author_paper
ON author_paper.author_id = authors.author_no
GROUP BY university;
`;

const MIN_MAX_H_INDEX_OF_AUTHORS_PER_UNIVERSITY = `
SELECT university, MIN(h_index) AS Min_h_index, MAX(h_index) AS Max_h_index
FROM authors
GROUP BY university;
`;

execQuery(PRINT_ALL_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS);
execQuery(PRINT_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES);
execQuery(PRINT_AVE_OF_H_INDEX_AUTHORS);
execQuery(PRINT_SUM_RES_PAPERS_AUTHORS_PER_UNIVERSITY);
execQuery(MIN_MAX_H_INDEX_OF_AUTHORS_PER_UNIVERSITY);

connection.end();
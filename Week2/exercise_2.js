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
  const CREATE_RESEARCH_PAPERS = `CREATE TABLE IF NOT EXISTS research_papers (paper_id INT PRIMARY KEY ,paper_title VARCHAR(50) NOT NULL, conference VARCHAR(50), publish_date DATE);`;
  const CREATE_AUTHOR_PAPER = `CREATE TABLE IF NOT EXISTS author_paper (author_id INT, paper_id INT,
  CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(author_no),
  CONSTRAINT fk_paper FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ,
  CONSTRAINT pk_author_paper PRIMARY KEY (author_id, paper_id)
  )`;
  const INSERT_AUTHORS = `
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES ?;`
  const authorValues = [
    ['Anna','University of Istanbul', '1985-01-01',140,'f'],
    ['Sina', 'University of Amsterdam', '1991-09-10', 150, 'm'],
    ['Jack','MIT', '1990-01-01',103,'m'],
    ['John','University of Amsterdam', '1983-01-11',107,'m'],
    ['Jackline','University of Amsterdam', '1992-03-01',50,'f'],
    ['Caroline','University of Madrid', '1998-05-01',155,'f'],
    ['Mahmut','University of Urfa', '1987-04-11',13,'m'],
    ['Ilber','Mektebi Sultani', '1999-02-21',1040,'m'],
    ['Celal','Newyork University', '2000-01-01',80,'m'],
    ['Anderson','Stockholm University', '2005-01-01',145,'m'],
    ['Mary','Newyork University', '2000-01-01',124,'f'],
    ['Hannah','Delft University', '2012-01-01',77,'f'],
    ['Dilek','Maastricht University', '2013-01-01',20,'f'],
    ['Diva','Nova University', '2016-05-01',100,'f'],
    ['Beatriz','University of Lisbon', '2018-01-01',178,'f']
  ];
 const ADD_MENTOR_VALUES = `
 UPDATE authors
 SET    mentor =
        CASE author_no
        WHEN 1 THEN 15
        WHEN 2 THEN 14
        WHEN 3 THEN 13
        WHEN 4 THEN 12
        WHEN 5 THEN 11
        WHEN 6 THEN 10
        WHEN 7 THEN 9
        WHEN 8 THEN 7
        WHEN 9 THEN 8
        WHEN 10 THEN 6
        WHEN 11 THEN 5
        WHEN 12 THEN 4
        WHEN 13 THEN 3
        WHEN 14 THEN 2
        WHEN 15 THEN 1
 END
 WHERE author_no IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);`
 

  const INSERT_RESEARCH_PAPERS = `
        INSERT INTO research_Papers VALUES
        (101,'Html', 'Html Conference', '2015-01-01'),
        (102,'Css', 'Css Conference', '2015-01-02'),
        (103,'Code', 'Code Conference', '2015-01-03'),
        (104,'Text', 'Text Conference', '2015-01-04'),
        (105,'Image', 'Image Conference', '2015-01-05'),
        (106,'JS', 'JS Conference', '2015-01-06'),
        (107,'React', 'React Conference', '2015-01-07'),
        (108,'Vue', 'Vue Conference', '2015-01-08'),
        (109,'Sass', 'Sass Conference', '2015-01-09'),
        (110, 'Python', 'Python Conference', '2015-01-10'),
        (111,'Java', 'Java Conference', '2015-01-11'),
        (112,'C++','C++ Conference','2015-01-12'),
        (113,'R','R Conference','2015-01-13'),
        (114,'Kotlin', 'Kotlin Conference', '2015-01-14'),
        (115,'React_native', 'React_native Conference', '2015-01-15'),
        (116, 'JavaScript', 'JavaScript Conference', '2015-01-16'),
        (117,'Github', 'Github Conference', '2015-01-17'),
        (118,'Git', 'Git Conference', '2015-01-18'),
        (119,'VSCode', 'VSCode Conference', '2015-01-19'),
        (120,'Material', 'Material Conference', '2015-01-20'),
        (121,'Ant_design', 'Ant_design Conference', '2015-01-21'),
        (122,'Bootstrap','Bootstrap Conference', '2015-01-22'),
        (123,'Webkit','Webkit Conference', '2015-01-23'),
        (124,'Php','Php Conference', '2015-01-24'),
        (125,'UX', 'UX Conference', '2015-01-25'),
        (126,'UI', 'UI Conference', '2015-01-26'),
        (127,'Jira', 'Jira Conference', '2015-01-27'),
        (128,'Waterfall','Waterfall Conference', '2015-01-28'),
        (129,'Kanban','Kanban Conference', '2015-01-29'),
        (130,'Scrum','Scrum Conference', '2015-01-30')
    `;
  const INSERT_AUTH_RES_PAPERS = `
        INSERT INTO author_paper VALUES
        (1, 101),
        (1, 102),
        (1, 103),
        (2, 104),
        (2, 105),
        (3, 106),
        (3, 107),
        (4, 108),
        (5, 109),
        (6, 110),
        (7, 111),
        (7, 112),
        (8, 113),
        (8, 114),
        (9, 115),
        (9, 116),
        (10, 117),
        (10, 118),
        (11, 119),
        (11, 120),
        (12, 121),
        (13, 122),
        (14, 123),
        (14, 124),
        (15, 125),
        (15, 126),
        (13, 127),
        (14, 128),
        (14, 129),
        (15, 130)
    `;
  connection.connect();
  try {
    await execQuery(CREATE_RESEARCH_PAPERS);
    await execQuery(CREATE_AUTHOR_PAPER);
    await execQuery(INSERT_AUTHORS, [authorValues]);
    await execQuery(ADD_MENTOR_VALUES);
    await execQuery(INSERT_RESEARCH_PAPERS);
    await execQuery(INSERT_AUTH_RES_PAPERS);
  } catch (err) {
    console.error(err);
    connection.end();
  }
  connection.end();
}
createTable();

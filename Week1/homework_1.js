var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: '',
  port: 3306,
});

connection.connect(() => console.log('connected'));

//Drop the Db first to be able to run multiple times
const drop_sql = 'DROP DATABASE meetup;';
connection.query(drop_sql, (err, result) => {
  if (err) throw err;
  console.log('DataBase Deleted');
  console.log(result);
});

//Create DataBase meetup.
const sql = 'CREATE DATABASE meetup;';
connection.query(sql, (err, result) => {
  if (err) throw err;
  console.log('DataBase Created');
  console.log(result);
});

//query to use the meetup Database
const query = 'use meetup';
connection.query(query, (err, result) => {
  if (err) throw err;
  console.log('DataBase changed');
  console.log(result);
});

//Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by).

const invite_sql =
  'CREATE TABLE Invitee (invitee_no INT , invitee_name VARCHAR(50), invited_by VARCHAR(50));';
connection.query(invite_sql, (err, result) => {
  if (err) throw err;
  console.log('Table Invitee Created');
  console.log(result);
});

//Create a table called Room with the following fields (room_no, room_name and floor_number)
const room_sql =
  'CREATE TABLE Room (room_no INT , room_name VARCHAR(50), floor_number INT);';
connection.query(room_sql, (err, results) => {
  if (err) throw err;
  console.log('Table Room Created');
  console.log(results);
});
//Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
const meeting_sql = `CREATE TABLE Meeting (meeting_no INT , meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT);`;
connection.query(meeting_sql, (err, results) => {
  if (err) throw err;
  console.log('Table Meeting Created');
  console.log(results);
});
const addInvitee_sql = `
INSERT INTO Invitee 
VALUES (1, 'Sina', 'Sara'), 
(2, 'John', 'Ash'), 
(3, 'Mary', 'Joe'), 
(4, 'Mina', 'Pari'), 
(5, 'Jack', 'Unmesh');
`;
connection.query(addInvitee_sql, (err, result) => {
  if (err) throw err;
  console.log('New data added to Invitee');
  console.log(result);
});
const addRoom_sql = `
INSERT INTO Room 
VALUES (101, 'black', 1), 
(102, 'blue', 2), 
(103, 'red', 2), 
(104, 'green', 3), 
(105, 'purple', 1);
`;
connection.query(addRoom_sql, (err, result) => {
  if (err) throw err;
  console.log('New data added to Room');
  console.log(result);
});
const addMeeting_sql = `
INSERT INTO Meeting
 VALUES (1, 'StandUp','2022-04-18 09:30:00','2022-04-18 11:30:00', 101),
  (2,'Node.js', '2022-04-19 08:30:00','2022-04-19 10:30:00', 102),
  (3, 'API', '2022-04-20 09:30:00','2022-04-20 12:30:00', 103),
  (4, 'DataBases', '2022-04-21 12:30:00', '2022-04-21 14:30:00', 103),
  (5, 'JvaScript', '2022-04-22 13:30:00', '2022-04-22 15:30:00', 104);
  `;
connection.query(addMeeting_sql, (err, result) => {
  if (err) throw err;
  console.log('New data added to Meeting');
  console.log(result);
});
connection.end();

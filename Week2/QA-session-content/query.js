const mysql = require('mysql');
const util = require('util')

const CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'db_qa_session',
}
const connection = mysql.createConnection(CONFIG);
const taskQuery = `select t.id,t.name as task_name,u.username as assigned_to,p.name as project_name,p.start_date as project_start,p.end_date as project_end,p.code as project_code from users as u right join tasks as t on u.id = t.assigned_to inner join projects as p on t.project_id = p.id where t.done_at is null;`
const projectQuery = 'select p.*, count(project_id) from projects as p inner join tasks as t on p.id = t.project_id where p.end_date < now() group by p.id;'
async function showTasks() {
  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();
  try {
    const tasksList = await execQuery(taskQuery);
    console.log(tasksList);
    const projects = await execQuery(projectQuery);
    console.log(projects)
connection.end();
  }catch (err){
console.log(err.message)
  }
}
showTasks()
async function showCode(code) {
  const codeQuery = `select * from tasks where project_id in (select id from projects where code = ${code})`
  const result = await execQuery(codeQuery)
  return result;
}
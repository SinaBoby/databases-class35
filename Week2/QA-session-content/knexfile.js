// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'hyfuser',
      password : 'hyfpassword',
      database : 'db_qa_session'
    },
    seeds: {
      directory: __dirname + '/seeds'
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  },

};

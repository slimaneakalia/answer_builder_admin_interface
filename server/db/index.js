const knex = require("knex");
const dbConfig = require("../config/db_config.js");

const knexMySql = knex({
  client: "mysql",
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  }
});

module.exports = knexMySql;

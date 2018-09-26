const knexMySql = require("../db");

const tableName = "answeritem";

function getAll() {
  return knexMySql(tableName);
}

module.exports = {
  getAll
};

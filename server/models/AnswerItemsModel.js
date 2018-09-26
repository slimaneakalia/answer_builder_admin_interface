const knexMySql = require("../db");
const AnswerVariablesModel = require("./AnswerVariablesModel");

const tableName = "answeritem";

function getAll() {
  return knexMySql(tableName);
}

function getAllByText(text) {
  return knexMySql(tableName)
    .where("Text", "like", `%${text}%`)
    .then(answerItems => AnswerVariablesModel.findByAnswerItems(answerItems));
}

module.exports = {
  getAll,
  getAllByText
};

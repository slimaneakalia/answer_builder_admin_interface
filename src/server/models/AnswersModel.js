/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const _ = require("lodash");
const knexMySql = require("../db");
const dbMiddleware = require("../middlewares/dbMiddleware.js");

const tableName = "answer";

function getAll() {
  return dbMiddleware.getAll(tableName);
}

function find(request) {
  return knexMySql(tableName)
    .where("Code", "like", `%${request}%`)
    .orWhere("Description", "like", `%${request}%`);
}

function findByAnswerItems(data) {
  const newData = { ...data };
  let answerUIDs = newData.items.map(item => item.Answer_UID);
  answerUIDs = _.uniq(answerUIDs);

  const temp = new Promise(resolve => {
    knexMySql(tableName)
      .whereIn("Answer_UID", answerUIDs)
      .then(result => {
        newData.answers = result;
      })
      .catch(() => {
        newData.answers = [];
      })
      .finally(() => resolve(newData));
  });

  return temp;
}

function updateField(answer, fieldName) {
  return knexMySql(tableName)
    .where("Answer_UID", answer.Answer_UID)
    .update({
      [fieldName]: answer[fieldName]
    });
}

function updateCode(answer) {
  return updateField(answer, "Code");
}

function updateDescription(answer) {
  return updateField(answer, "Description");
}

function update(answer) {
  return knexMySql(tableName)
    .where("Answer_UID", answer.Answer_UID)
    .update({
      Code: answer.Code,
      Description: answer.Description
    });
}

function remove(answer) {
  return knexMySql(tableName)
    .where("Answer_UID", answer.Answer_UID)
    .del();
}

function addCode(answer) {
  return knexMySql(tableName).insert(answer);
}

module.exports = {
  getAll,
  findByAnswerItems,
  updateCode,
  updateDescription,
  update,
  remove,
  find,
  addCode
};

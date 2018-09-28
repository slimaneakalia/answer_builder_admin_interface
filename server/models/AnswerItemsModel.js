const knexMySql = require("../db");
const AnswerVariablesModel = require("./AnswerVariablesModel");
const AnswersModel = require("./AnswersModel");

const tableName = "answeritem";

function getAll() {
  return knexMySql(tableName);
}

function getAllByText(text) {
  return knexMySql(tableName)
    .where("Text", "like", `%${text}%`)
    .then(answerItems => AnswerVariablesModel.findByAnswerItems(answerItems))
    .then(data => AnswersModel.findByAnswerItems(data));
}

function selectDistinctField(fieldName) {
  return new Promise((resolve, reject) => {
    knexMySql(tableName)
      .distinct(fieldName)
      .select()
      .then(data => {
        const formattedData = data.map(channel => channel[fieldName]);
        resolve(formattedData);
      })
      .catch(err => reject(err));
  });
}

function getLanguages() {
  return selectDistinctField("Language");
}

function getChannels() {
  return selectDistinctField("Channel");
}

function addItem(item) {
  return knexMySql(tableName).insert(item);
}

function editItem(itemId, newItemData) {
  return knexMySql(tableName)
    .where("AnswerItem_UUID", itemId)
    .update(newItemData);
}

module.exports = {
  getAll,
  getAllByText,
  getLanguages,
  getChannels,
  addItem,
  editItem
};

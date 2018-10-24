/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const knexMySql = require("../db");
const dbMiddleware = require("../middlewares/dbMiddleware.js");

const tableName = "answeritem";

function getAll() {
  return dbMiddleware.getAll(tableName);
}

function getAllByCriterias(queryParam) {
  const query = { ...queryParam };
  let result = knexMySql(tableName);

  if (query.text) {
    result = result.where("Text", "like", `%${query.text}%`);
    delete query.text;
  }

  if (query.Language) {
    const languages = query.Language.split(",");
    delete query.Language;
    result = result.whereIn("Language", languages);
  }

  if (query.Channel) {
    const channels = query.Channel.split(",");
    delete query.Channel;
    result = result.whereIn("Channel", channels);
  }

  return result.where(query);
}

function getAllByAnswer(answerUID) {
  return knexMySql(tableName).where("Answer_UID", answerUID);
}

function addItem(item) {
  return knexMySql(tableName).insert(item);
}

function editItem(itemId, newItemData) {
  return knexMySql(tableName)
    .where("AnswerItem_UUID", itemId)
    .update(newItemData);
}

function duplicateItem(itemId) {
  return new Promise((resolve, reject) => {
    knexMySql(tableName)
      .where("AnswerItem_UUID", itemId)
      .then(items => {
        if (items.length > 0) {
          const data = { ...items[0] };
          delete data.AnswerItem_UUID;
          addItem(data)
            .then(newItem => {
              resolve(newItem);
            })
            .catch(() => reject());
        } else reject();
      })
      .catch(() => reject());
  });
}

function removeItem(itemId) {
  return knexMySql(tableName)
    .where("AnswerItem_UUID", itemId)
    .del();
}

function updateField(item, fieldName) {
  return knexMySql(tableName)
    .where("AnswerItem_UUID", item.AnswerItem_UUID)
    .update({
      [fieldName]: item[fieldName]
    });
}

function activateDeactivate(item) {
  return updateField(item, "Activated");
}

function setAsDefault(item) {
  return updateField(item, "_Default");
}

module.exports = {
  getAll,
  addItem,
  editItem,
  duplicateItem,
  activateDeactivate,
  updateField,
  setAsDefault,
  getAllByAnswer,
  getAllByCriterias,
  removeItem
};

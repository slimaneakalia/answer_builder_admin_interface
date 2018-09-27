const knexMySql = require("../db");
const dbMiddleware = require("../middlewares/dbMiddleware.js");

const tableName = "answervariable";

function getAll() {
  return knexMySql(tableName);
}

function findByAnswerItems(answerItems) {
  const result = { items: answerItems, variables: [] };
  const promises = [];
  for (let i = 0; i < answerItems.length; i += 1) {
    const variables = dbMiddleware.exportVariablesDataFromText(
      answerItems[i].Text
    );

    for (let j = 0; j < variables.length; j += 1) {
      const temp = new Promise(resolve => {
        knexMySql(tableName)
          .where(variables[i])
          .then(answerVariables => {
            resolve(answerVariables);
          })
          .catch(() => {
            resolve([]);
          });
      });

      promises.push(temp);
    }
  }

  return Promise.all(promises).then(values => {
    for (let v = 0; v < values.length; v += 1) {
      result.variables = result.variables.concat(values[v]);
    }

    return new Promise(resolve => resolve(result));
  });
}

module.exports = {
  getAll,
  findByAnswerItems
};

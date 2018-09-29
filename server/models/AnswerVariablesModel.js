const _ = require("lodash");
const knexMySql = require("../db");
const dbMiddleware = require("../middlewares/dbMiddleware.js");
const constants = require("../middlewares/constants.json");

const tableName = "answervariable";

function getAll() {
  return dbMiddleware.getAll(tableName);
}

function findByAnswerItems(answerItems) {
  const result = { items: answerItems, variables: {} };

  const promises = [];
  for (let i = 0; i < answerItems.length; i += 1) {
    const variables = dbMiddleware.exportVariablesDataFromText(
      answerItems[i].Text
    ).data;

    for (let j = 0; j < variables.length; j += 1) {
      const temp = new Promise(resolve => {
        knexMySql(tableName)
          .where(variables[j])
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
      const variableArray = values[v];
      for (let w = 0; w < variableArray.length; w += 1) {
        // result.variables = result.variables.concat(values[v]);
        const variable = variableArray[w];
        if (!result.variables[variable.AnswerVariable_UID]) {
          result.variables[variable.AnswerVariable_UID] = _.pick(
            variable,
            "Name",
            "Value",
            "_Group",
            "SubGroup"
          );
        }
      }
    }

    return new Promise(resolve => resolve(result));
  });
}

function editVariable(variableId, newVariableData) {
  return knexMySql(tableName)
    .where("AnswerVariable_UID", variableId)
    .update(newVariableData);
}

function getVariablesPromisesByData(data) {
  const promises = [];

  for (let j = 0; j < data.length; j += 1) {
    const temp = new Promise(resolve2 => {
      const index = j;
      knexMySql(tableName)
        .where(data[index])
        .then(answerVariables => {
          resolve2({ index, answerVariables });
        })
        .catch(() => {
          resolve2({ index, answerVariables: [] });
        });
    });

    promises.push(temp);
  }

  return promises;
}

function simulate(text) {
  return new Promise((resolve, reject) => {
    if (dbMiddleware.hasCorrectVariableFormat(text)) {
      const variablesData = dbMiddleware.exportVariablesDataFromText(text);
      const { data, indexes } = variablesData;
      const promises = getVariablesPromisesByData(data);

      Promise.all(promises).then(values => {
        let result = text;
        for (let i = 0; i < values.length; i += 1) {
          const currentIndexes = indexes[values[i].index];
          const token = text.substring(
            currentIndexes.begin,
            currentIndexes.end
          );
          const replacement =
            values[i].answerVariables.length > 0
              ? values[i].answerVariables[0].Value
              : `{{ ${constants.VARIABLE_NOT_FOUND} }}`;
          result = result.replace(token, replacement);
        }

        resolve(result);
      });
    } else reject();
  });
}

module.exports = {
  getAll,
  findByAnswerItems,
  editVariable,
  simulate
};

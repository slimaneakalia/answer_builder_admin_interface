/* eslint no-underscore-dangle: 0 */
const constants = require("./constants.json");
const knexMySql = require("../db");

function extractVariableDataObject(token) {
  const array = token.split(".");
  const obj = {};

  [obj._Group, obj.SubGroup, obj.Name] = array;

  return obj;
}

function isFirstDelimiter(text, beginIndex) {
  return (
    text.substring(
      beginIndex,
      beginIndex + constants.FIRST_DELIMITER.length
    ) === constants.FIRST_DELIMITER
  );
}

function isSecondDelimiter(text, beginIndex) {
  return (
    text.substring(
      beginIndex,
      beginIndex + constants.SECOND_DELIMITER.length
    ) === constants.SECOND_DELIMITER
  );
}

function exportVariablesDataFromText(text) {
  const data = [];
  const indexes = [];
  let begin = -1;
  for (let index = 0; index < text.length; index += 1) {
    if (isFirstDelimiter(text, index)) begin = index;
    else if (isSecondDelimiter(text, index) && begin >= 0) {
      const token = text
        .substring(begin + constants.FIRST_DELIMITER.length, index)
        .trim();
      data.push(extractVariableDataObject(token));
      indexes.push({
        begin,
        end: index + constants.SECOND_DELIMITER.length
      });
      // To add and test : index += constants.SECOND_DELIMITER.length
    }
  }

  return { data, indexes };
}

function hasCorrectVariableFormat(text) {
  let begin = -1;
  for (let index = 0; index < text.length; index += 1) {
    if (isFirstDelimiter(text, index)) {
      if (begin >= 0) return false;
      begin = index;
    } else if (isSecondDelimiter(text, index)) {
      if (begin < 0) return false;
      begin = -1;
    }
  }

  return begin < 0;
}

function getAll(tableName) {
  return knexMySql(tableName);
}

module.exports = {
  exportVariablesDataFromText,
  hasCorrectVariableFormat,
  getAll
};

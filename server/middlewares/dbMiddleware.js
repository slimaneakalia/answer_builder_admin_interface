const constants = require("./constants.json");

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
  const variablesData = [];
  let begin = -1;
  for (let index = 0; index < text.length; index += 1) {
    if (isFirstDelimiter(text, index)) begin = index;
    else if (isSecondDelimiter(text, index) && begin >= 0) {
      const token = text
        .substring(begin + constants.FIRST_DELIMITER.length, index)
        .trim();
      variablesData.push(extractVariableDataObject(token));
    }
  }

  return variablesData;
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

module.exports = {
  exportVariablesDataFromText,
  hasCorrectVariableFormat
};

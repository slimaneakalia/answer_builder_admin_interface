const constants = require("./constants.json");

function extractVariableDataObject(token) {
  const array = token.split(".");
  return {
    Name: array[array.length - 1],
    SubGroup: array[array.length - 2],
    _Group: array[0]
  };
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

module.exports = {
  exportVariablesDataFromText
};

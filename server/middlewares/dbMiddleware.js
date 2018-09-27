const constants = require("./constants.json");

function extractVariableDataObject(token) {
  const array = token.split(".");
  return {
    Name: array[array.length - 1],
    SubGroup: array[array.length - 2],
    _Group: array[0]
  };
}

function exportVariablesDataFromText(text) {
  const variablesData = [];
  let begin = -1;
  for (let index = 0; index < text.length; index += 1) {
    const current = text.charAt(index);
    if (current === constants.FIRST_DELIMITER) begin = index;
    else if (current === constants.SECOND_DELIMITER && begin >= 0) {
      const token = text.substring(begin + 1, index - 1);
      variablesData.push(extractVariableDataObject(token));
    }
  }
  return [
    {
      Name: "name",
      _Group: "groupe",
      SubGroup: "SubGroup"
    }
  ];
}

module.exports = {
  exportVariablesDataFromText
};

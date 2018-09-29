const tableName = "channel";
const dbMiddleware = require("../middlewares/dbMiddleware.js");

function getAll() {
  return dbMiddleware.getAll(tableName);
}

module.exports = {
  getAll
};

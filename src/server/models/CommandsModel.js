/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const tableName = "command";
const dbMiddleware = require("../middlewares/dbMiddleware.js");
const knexMySql = require("../db");

function getAll() {
  return dbMiddleware.getAll(tableName);
}

function find(request) {
  return knexMySql(tableName)
    .where("Name", "like", `%${request}%`)
    .orWhere("Text", "like", `%${request}%`)
    .orWhere("Description", "like", `%${request}%`);
}

function addCommand(command) {
  return knexMySql(tableName).insert(command);
}

function duplicateCommand(commandUID) {
  return new Promise((resolve, reject) => {
    knexMySql(tableName)
      .where("Command_UID", commandUID)
      .then(commands => {
        if (commands.length > 0) {
          const data = { ...commands[0] };
          delete data.Command_UID;
          addCommand(data)
            .then(newCommand => {
              resolve(newCommand);
            })
            .catch(() => reject());
        } else reject();
      })
      .catch(() => reject());
  });
}

module.exports = {
  getAll,
  find,
  addCommand,
  duplicateCommand
};

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

function getAllByCriterias(queryParam) {
  const query = { ...queryParam };
  let result = knexMySql(tableName);
  if (query.name) {
    result = result.where("Name", "like", `%${query.name}%`);
    delete query.name;
  }

  if (query.text) {
    result = result.where("Text", "like", `%${query.text}%`);
    delete query.text;
  }

  if (query.description) {
    result = result.where("Description", "like", `%${query.description}%`);
    delete query.description;
  }

  return result.where(query);
}

function addCommand(command) {
  return knexMySql(tableName).insert(command);
}

function editCommand(commandId, commandData) {
  return knexMySql(tableName)
    .where("Command_UID", commandId)
    .update(commandData);
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
            .catch(err => {
              console.log("Error 1");
              console.log(err);
              reject(err);
            });
        } else {
          console.log("Error 2");
          console.log(`No command with Command_UID =${commandUID}`);
          reject(`No command with Command_UID =${commandUID}`);
        }
      })
      .catch(err => {
        console.log("Error 2");
        console.log(err);
        reject(err);
      });
  });
}

function removeCommand(CommandUID) {
  return knexMySql(tableName)
    .where("Command_UID", CommandUID)
    .del();
}

module.exports = {
  getAll,
  find,
  addCommand,
  duplicateCommand,
  getAllByCriterias,
  editCommand,
  removeCommand
};

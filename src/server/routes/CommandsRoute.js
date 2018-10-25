/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const express = require("express");
const _ = require("lodash");
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const CommandsModel = require("../models/CommandsModel.js");

const router = express.Router();
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, CommandsModel.getAll());
});

router.get("/find", (req, res) => {
  const { value } = req.query;
  if (value) routesMiddleware.sendDBResult(res, CommandsModel.find(value));
  else res.sendStatus(400);
});

router.get("/all_by_criterias", (req, res) => {
  const { query } = req;
  routesMiddleware.sendDBResult(res, CommandsModel.getAllByCriterias(query));
});

router.post("/add_command", (req, res) => {
  const requiredFields = ["Name", "Text", "Description"];

  if (_.every(requiredFields, _.partial(_.has, req.body))) {
    routesMiddleware.sendDBResult(res, CommandsModel.addCommand(req.body));
  } else res.sendStatus(400);
});

router.post("/edit_command", (req, res) => {
  const requiredFields = ["Command_UID", "Name", "Text", "Description"];

  if (_.every(requiredFields, _.partial(_.has, req.body))) {
    const data = { ...req.body };
    delete data.Command_UID;
    routesMiddleware.sendDBResult(
      res,
      CommandsModel.editCommand(req.body.Command_UID, data)
    );
  } else res.sendStatus(400);
});

router.post("/duplicate_command", (req, res) => {
  const commandUID = req.body.Command_UID;
  if (commandUID) {
    routesMiddleware.sendDBResult(
      res,
      CommandsModel.duplicateCommand(commandUID)
    );
  } else res.sendStatus(400);
});

router.post("/remove_command", (req, res) => {
  const CommandUID = req.body.Command_UID;
  if (CommandUID) {
    routesMiddleware.sendDBResult(res, CommandsModel.removeCommand(CommandUID));
  } else res.sendStatus(400);
});

module.exports = router;

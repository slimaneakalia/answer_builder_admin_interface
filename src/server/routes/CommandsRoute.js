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

router.post("/add_command", (req, res) => {
  const requiredFields = ["Name", "Text", "Description"];

  if (_.every(requiredFields, _.partial(_.has, req.body))) {
    routesMiddleware.sendDBResult(res, CommandsModel.addCommand(req.body));
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

module.exports = router;

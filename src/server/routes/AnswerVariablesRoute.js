/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const express = require("express");
const _ = require("lodash");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const AnswerVariablesModel = require("../models/AnswerVariablesModel.js");

/* /answer_variables routes */
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerVariablesModel.getAll());
});

router.post("/edit_variable", (req, res) => {
  const requiredFields = [
    "AnswerVariable_UID",
    "Name",
    "Value",
    "_Group",
    "SubGroup"
  ];

  if (_.every(requiredFields, _.partial(_.has, req.body))) {
    const data = { ...req.body };
    delete data.AnswerVariable_UID;
    routesMiddleware.sendDBResult(
      res,
      AnswerVariablesModel.editVariable(req.body.AnswerVariable_UID, data)
    );
  } else res.sendStatus(400);
});

// Second use case
router.post("/simulate", (req, res) => {
  const { text } = req.body;
  if (text)
    routesMiddleware.sendDBResult(res, AnswerVariablesModel.simulate(text));
  else res.sendStatus(400);
});

// Third use case
router.get("/find", (req, res) => {
  const { value } = req.query;
  if (value)
    routesMiddleware.sendDBResult(res, AnswerVariablesModel.find(value));
  else res.sendStatus(400);
});

router.post("/add_variable", (req, res) => {
  const requiredFields = ["Name", "Value", "_Group", "SubGroup"];

  if (_.every(requiredFields, _.partial(_.has, req.body))) {
    routesMiddleware.sendDBResult(
      res,
      AnswerVariablesModel.addVariable(req.body)
    );
  } else res.sendStatus(400);
});

router.post("/duplicate_variable", (req, res) => {
  const variableUID = req.body.AnswerVariable_UID;
  if (variableUID) {
    routesMiddleware.sendDBResult(
      res,
      AnswerVariablesModel.duplicateVariable(variableUID)
    );
  } else res.sendStatus(400);
});

module.exports = router;

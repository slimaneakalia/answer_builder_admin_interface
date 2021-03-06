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
    "SubGroup",
    "Activated"
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
router.get("/all_by_criterias", (req, res) => {
  const { query } = req;
  routesMiddleware.sendDBResult(
    res,
    AnswerVariablesModel.getAllByCriterias(query)
  );
});

router.get("/find", (req, res) => {
  let { value } = req.query;
  if (typeof value === "undefined" || value == null) value = "";
  routesMiddleware.sendDBResult(res, AnswerVariablesModel.find(value));
});

router.post("/add_variable", (req, res) => {
  const requiredFields = ["Name", "Value", "_Group", "SubGroup", "Activated"];

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

router.post("/remove_variable", (req, res) => {
  const variableUID = req.body.AnswerVariable_UID;
  if (variableUID) {
    routesMiddleware.sendDBResult(
      res,
      AnswerVariablesModel.removeVariable(variableUID)
    );
  } else res.sendStatus(400);
});

module.exports = router;

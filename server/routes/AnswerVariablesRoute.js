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

module.exports = router;

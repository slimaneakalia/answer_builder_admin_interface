const express = require("express");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const AnswerVariablesModel = require("../models/AnswerVariablesModel.js");

router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerVariablesModel.getAll());
});

module.exports = router;

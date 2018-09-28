const express = require("express");
const _ = require("lodash");
const { hasCorrectVariableFormat } = require("../middlewares/dbMiddleware.js");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const AnswerItemsModel = require("../models/AnswerItemsModel.js");

/* /answer_items routes */
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerItemsModel.getAll());
});

router.get("/all_by_text", (req, res) => {
  const textQuery = req.query.text;
  if (textQuery)
    routesMiddleware.sendDBResult(
      res,
      AnswerItemsModel.getAllByText(textQuery)
    );
  else res.sendStatus(400);
});

router.get("/languages", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerItemsModel.getLanguages());
});

router.get("/channels", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerItemsModel.getChannels());
});

router.post("/add_item", (req, res) => {
  const requiredFields = [
    "Answer_UID",
    "Name",
    "Language",
    "Channel",
    "Text",
    "Activated",
    "_Default"
  ];

  if (
    _.every(requiredFields, _.partial(_.has, req.body)) &&
    hasCorrectVariableFormat(req.body.Text)
  ) {
    routesMiddleware.sendDBResult(res, AnswerItemsModel.addItem(req.body));
  } else res.sendStatus(400);
});

router.post("/edit_item", (req, res) => {
  const requiredFields = [
    "AnswerItem_UUID",
    "Answer_UID",
    "Name",
    "Language",
    "Channel",
    "Text",
    "Activated",
    "_Default"
  ];

  if (
    _.every(requiredFields, _.partial(_.has, req.body)) &&
    hasCorrectVariableFormat(req.body.Text)
  ) {
    const data = { ...req.body };
    delete data.AnswerItem_UUID;
    routesMiddleware.sendDBResult(
      res,
      AnswerItemsModel.editItem(req.body.AnswerItem_UUID, data)
    );
  } else res.sendStatus(400);
});

router.post("/edit_item", (req, res) => {});

module.exports = router;

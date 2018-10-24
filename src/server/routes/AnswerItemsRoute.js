/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const express = require("express");
const _ = require("lodash");
const { hasCorrectVariableFormat } = require("../middlewares/dbMiddleware.js");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const AnswerItemsModel = require("../models/AnswerItemsModel.js");

/* /answer_items routes */
// First use case
function editField(req, res, fieldName, updateFunction) {
  if (_.every(["AnswerItem_UUID", fieldName], _.partial(_.has, req.body))) {
    routesMiddleware.sendDBResult(res, updateFunction(req.body));
  } else res.sendStatus(400);
}

router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswerItemsModel.getAll());
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

router.post("/duplicate_item", (req, res) => {
  const itemUUID = req.body.AnswerItem_UUID;
  if (itemUUID) {
    routesMiddleware.sendDBResult(
      res,
      AnswerItemsModel.duplicateItem(itemUUID)
    );
  } else res.sendStatus(400);
});

router.post("/activate_deactivate", (req, res) =>
  editField(req, res, "Activated", AnswerItemsModel.activateDeactivate)
);

router.post("/set_as_default", (req, res) =>
  editField(req, res, "_Default", AnswerItemsModel.setAsDefault)
);

// Second use case
router.get("/all_by_answer", (req, res) => {
  const answerUID = req.query.AnswerUID;
  if (answerUID) {
    routesMiddleware.sendDBResult(
      res,
      AnswerItemsModel.getAllByAnswer(answerUID)
    );
  } else res.sendStatus(400);
});

// Request example : {'Language' : 1, 'Channel' : 'C'}
router.get("/all_by_criterias", (req, res) => {
  const { query } = req;
  console.log("New /all_by_criterias query");
  console.log(query);

  routesMiddleware.sendDBResult(res, AnswerItemsModel.getAllByCriterias(query));
});

module.exports = router;

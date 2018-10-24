/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const express = require("express");
const _ = require("lodash");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const AnswersModel = require("../models/AnswersModel.js");

function editField(req, res, fieldName, updateFunction) {
  if (_.every(["Answer_UID", fieldName], _.partial(_.has, req.body)))
    routesMiddleware.sendDBResult(res, updateFunction(req.body));
  else res.sendStatus(400);
}

/* /answers routes */
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, AnswersModel.getAll());
});

router.get("/find", (req, res) => {
  let { value } = req.query;
  if (typeof value === "undefined" || value == null) value = "";

  routesMiddleware.sendDBResult(res, AnswersModel.find(value));
});

router.post("/edit_code", (req, res) => {
  editField(req, res, "Code", AnswersModel.updateCode);
});

router.post("/edit_description", (req, res) => {
  editField(req, res, "Description", AnswersModel.updateDescription);
});

router.post("/edit_all", (req, res) => {
  console.log("New request on /edit/all");
  if (
    _.every(["Answer_UID", "Code", "Description"], _.partial(_.has, req.body))
  )
    routesMiddleware.sendDBResult(res, AnswersModel.update(req.body));
  else res.sendStatus(400);
});

router.post("/remove", (req, res) => {
  if (req.body.Answer_UID) {
    routesMiddleware.sendDBResult(res, AnswersModel.remove(req.body));
  } else res.sendStatus(400);
});

module.exports = router;

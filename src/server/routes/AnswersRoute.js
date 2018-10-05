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

router.post("/edit_code", (req, res) => {
  editField(req, res, "Code", AnswersModel.updateCode);
});

router.post("/edit_description", (req, res) => {
  editField(req, res, "Description", AnswersModel.updateDescription);
});

module.exports = router;

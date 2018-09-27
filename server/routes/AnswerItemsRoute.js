const express = require("express");

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
  else res.status(400).end();
});

module.exports = router;

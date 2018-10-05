const express = require("express");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const LanguagesModel = require("../models/LanguagesModel.js");

/* /languages routes */
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, LanguagesModel.getAll());
});

module.exports = router;

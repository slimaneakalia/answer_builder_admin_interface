const express = require("express");

const router = express.Router();
const routesMiddleware = require("../middlewares/routesMiddleware.js");
const ChannelsModel = require("../models/ChannelsModel.js");

/* /channels routes */
router.get("/all", (req, res) => {
  routesMiddleware.sendDBResult(res, ChannelsModel.getAll());
});

module.exports = router;

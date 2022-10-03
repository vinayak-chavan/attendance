const express = require("express");
const { auth } = require("../middlewares/auth");

const {
  frontPage,
} = require("../controller/attendance.controller");

const route = express.Router();


route.get("/page", frontPage);

module.exports = route;

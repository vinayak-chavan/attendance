const mongoose = require("mongoose");
const user = require("../models/user");
const { successResponse, errorResponse } = require("../utils");

let subject;

const add = async (req, res) => {
  let userID = req.user._id;
  let suject = subject;
}

const frontPage = async (req, res) => {
  res.render("cn");
};

module.exports = {
  frontPage,
};
const mongoose = require("mongoose");
const user = require("../models/user");
const attendance = require('../models/attendance');
const { successResponse, errorResponse } = require("../utils");

let subject = "cn";

const oswPageView = async (req, res) => {
    try{
		let userId = req.user._id;
		subject = "osw";
		const data = await attendance.findOne({ userId: userId, subject: subject });
		res.render("osw", { datas : data });
  }
  catch(error){
    	console.log(error.message);
  }
};

const dosPageView = async (req, res) => {
  try {
    let userId = req.user._id;
    subject = "dos";
    const data = await attendance.findOne({ userId: userId, subject: subject });
    res.render("dos", { datas: data });
  } catch (error) {
    console.log(error.message);
  }
};

const tocPageView = async (req, res) => {
  try {
    let userId = req.user._id;
    subject = "toc";
    const data = await attendance.findOne({ userId: userId, subject: subject });
    res.render("toc", { datas: data });
  } catch (error) {
    console.log(error.message);
  }
};

const cnPageView = async (req, res) => {
  try{
		let userId = req.user._id;
		subject = "cn";
		// const data = await attendance.findOne({ userId: userId, subject: subject });
		// res.render("cn", { datas : data });
		res.render("cn");
  }
  catch(error){
    console.log(error.message);
  }
};

const ppPageView = async (req, res) => {
	try {
		subject = "pp";
		let userId = req.user._id;
		subject = "cn";
		const data = await attendance.findOne({ userId: userId, subject: subject });
		res.render("pp", { datas: info });
  } catch (error) {
    console.log(error.message);
  }
};

const admPageView = async (req, res) => {
  subject = "adm";
  let userId = req.user._id;
      const info = await attendance.findOne({
        userId: userId,
        subject: subject,
      });

      if (!info) {
        const newRecord = new attendance({
          userId: userId,
          subject: subject,
          absent: [],
          present: [],
          holiday: [],
        });
        newRecord.save();
      }
  res.render("adm");
};

const statusChange = async (req, res) => {
  try{
    let userId = req.user._id;
    let dateId = req.params.id;
	let absent = [];
	let present = [];
	let holiday= [];

	const info = await attendance.findOne({ userId: userId, subject: subject });
	let id = info._id;
	absent = info.absent;
	present = info.present;
	holiday = info.holiday;

	if (present.includes(dateId)===false && absent.includes(dateId)===false && holiday.includes(dateId)===false) {
  	  	present.push(dateId);
  	} else if (present.includes(dateId)) {
		let index = present.indexOf(dateId);
    	present.splice(index, 1);
 		absent.push(dateId);
	} else if (absent.includes(dateId)) {
		let index = absent.indexOf(dateId);
    	absent.splice(index, 1);
 		holiday.push(dateId);
	} else if (holiday.includes(dateId)) {
		let index = holiday.indexOf(dateId);
        holiday.splice(index, 1);
	}

	const statusInfo = await attendance.findByIdAndUpdate(
    { _id: id },
    {
      present: present,
      absent: absent,
      holiday: holiday,
    }
  );

    res.render(subject);
  } catch (error){
    console.log(error.message);
  }
};

module.exports = {
  cnPageView,
  admPageView,
  oswPageView,
  dosPageView,
  tocPageView,
  ppPageView,
  statusChange,
};
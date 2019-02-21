let ObjectId	= require('mongodb').ObjectID
let User	= require('./../models/User')
let Outlook	= require('./../models/Outlook')
let Calendar	= require('./../models/Calendar')
let One_drive	= require('./../models/One-drive')
let Service	= require('./../models/Services')
let config  = require('../config/index')
let serviceConfig = require('../config/service')

//Save token  to calendar
//Save to Outlook
//Save to One_drive
let office365Connection = async (req, res) => {
	let user = await User.findOne({token : req.token});
	var services = await Service.findOne({"_id" : user.services})

	if (!req.body.accessToken) {
		res.json({error : "give an accessToken"});
		return;
	}

	if(!services.outlook) {
		let newOutlook = new Outlook({
			accessToken : req.body.accessToken,
			fileToOneDrive : false
		})
		await newOutlook.save();
		await Service.updateOne({"_id" : user.services}, { $set : { outlook : newOutlook._id}})
	}
	else {
		let outlook = await Outlook.findOne({"_id" : services.outlook})
		await Outlook.updateOne({"_id" : services.outlook}, { $set : { accessToken : req.body.accessToken}})
	}
	if (!services.calendar) {
		let newCalendar = new Calendar({
			accessToken : req.body.accessToken
		})
		await newCalendar.save();
		await Service.updateOne({"_id" : user.services}, { $set : { calendar : newCalendar._id}})
	}
	else {
		let calendar = await Calendar.findOne({"_id" : services.outlook})
		await Calendar.updateOne({"_id" : services.calendar}, { $set : { accessToken : req.body.accessToken}})
	}
	if (!services.one_drive) {
		let newOne_drive = new One_drive({
			accessToken : req.body.accessToken,
			fileToOneDrive : false
		})
		await newOne_drive.save();
		await Service.updateOne({"_id" : user.services}, { $set : { one_drive : newOne_drive._id}})
	}
	else {
		let one_drive = await One_drive.findOne({"_id" : services.one_drive})
		await One_drive.updateOne({"_id" : services.one_drive}, { $set : { accessToken : req.body.accessToken}})
	}

	services = await Service.findOne({"_id" : user.services})
	res.json({
		data : "accessToken saved"
	})
}

let webhook = async (req, res) => {
	console.log(req.body);
	let body = req.body;
	res.json({body})
}

module.exports = {
	office365Connection,
	webhook
}

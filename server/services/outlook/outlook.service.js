let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let OutlookSpec = require('./outlook.spec')
let CalendarSpec = require('./../calendar/calendar.spec')
let One_driveSpec = require('./../one-drive/one-drive.spec')

let isConnected = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let isConnected = await newOutlook.isConnected();
	res.json({type : isConnected})
}

let logout = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);
	let newCalendar = new CalendarSpec.Calendar(req.token);
	let newOne_drive = new One_driveSpec.One_drive(req.token);

	await newOutlook.logout();
	await newCalendar.logout();
	await newOne_drive.logout();
	res.json({data : "Lougout successfully"})
}

let getMyOption = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let option = await newOutlook.getMyOption();
	res.json({data : option})
}

let addFileToOne_drive = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await newOutlook.setFileToOneDrive();
	res.json({type : true})
}

let getMe = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let me = await newOutlook.getMe();
	res.json({me})
}

module.exports = {
	addFileToOne_drive,
	getMyOption,
	getMe,
	isConnected,
	logout
}

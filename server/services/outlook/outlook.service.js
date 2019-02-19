let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let outlookSpec = require('./outlook.spec')

let isConnected = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let isConnected = await newOutlook.isConnected();
	res.json({type : isConnected})
}

let logout = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await newOutlook.logout();
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
	res.json({type : true, data : me})
}

module.exports = {
	addFileToOne_drive,
	getMyOption,
	getMe,
	isConnected,
	logout
}

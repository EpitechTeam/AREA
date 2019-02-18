let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let outlookSpec = require('./outlook.spec')

let addOutlookConnection = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await OutlookSpec.setAccessToken(req.body.accessToken);
	res.json({type : true, data : "test"})
}

let getEmail = async (req, res) => {

}

let getMyOption = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let option = await OutlookSpec.Outllook.getMyOption();
	res.json({data : option})
}

let addFileToOne_drive = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await OutlookSpec.Outlook.setFileToOneDrive();
	res.json({type : true})
}

let getMe = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	let me = await OutlookSpec.Outlook.getMe();
	res.json({type : true, data : me})
}

module.exports = {
	addOutlookConnection,
	addFileToOne_drive,
	getMyOption,
	getEmail
}

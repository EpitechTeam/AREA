let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let outlookSpec = require('./outlook.spec')

let addOutlookConnection = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await OutlookSpec.getMe();
	res.json({type : true, data : "test"})
}

let getMe = async (req, res) => {

}

let getMyOption = async (req, res) => {

}

let addFileToOne_drive = async (req, res) => {
	let newOutlook = new OutlookSpec.Outlook(req.token);

	await OutlookSpec.setFileToOneDrive();
	res.json({type : true})
}

module.exports = {
	addOutlookConnection,
	addFileToOne_drive
}

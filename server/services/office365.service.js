let ObjectId	= require('mongodb').ObjectID
let User	= require('./../models/User')
let Outlook	= require('./../models/Outlook')
let Calendar	= require('./../models/Calendar')
let One_drive	= require('./../models/One-drive')
let Service	= require('./../models/Services')
let config  = require('../config/index')
let serviceConfig = require('../config/service')
var request = require("request");

//https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6cf6d447-0635-4914-a848-4cb72e761e39&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foffice365&response_mode=form_post&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=12345

// let office365Connection = async (req, res) => {
// 	let code = req.body.code;
// 	let state = req.body.state;
// 	let session_state = req.body.session_state;
//
// 	var options = {
// 		method: 'POST',
// 		url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
// 		headers:
// 		{
// 			'cache-control': 'no-cache',
// 			'content-type': 'application/x-www-form-urlencoded'
// 		},
// 		form:
// 		{
// 			client_id: '6cf6d447-0635-4914-a848-4cb72e761e39',
// 			scope: 'https://graph.microsoft.com/mail.read',
// 			code: code,
// 			redirect_uri: 'http://localhost:8080/office365',
// 			grant_type: 'authorization_code',
// 			client_secret : process.env.OFFICE365_SECRET_TOKEN
// 		}
// 	};
//
// 	request(options, function (error, response, body) {
// 		if (error) throw new Error(error);
//
// 		//Save to calendar
// 		//Save to Outlook
// 		//Save to One-drive
// 		console.log(body);
// 		res.json({data : body})
// 	});
// }

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
}

module.exports = {
	office365Connection
}

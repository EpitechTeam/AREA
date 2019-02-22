let ObjectId	= require('mongodb').ObjectID
let User	= require('./../models/User')
let Outlook	= require('./../models/Outlook')
let Calendar	= require('./../models/Calendar')
let One_drive	= require('./../models/One-drive')
let Service	= require('./../models/Services')
let config  = require('../config/index')
let serviceConfig = require('../config/service')
let request			= require('request');

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

	setSubscription(req.body.accessToken, new Date(Date.now() + 86400000).toISOString())
	services = await Service.findOne({"_id" : user.services})
	res.json({
		data : "accessToken saved"
	})
}

let setSubscription = (token , date) => {
	var options = { method: 'POST',
	url: 'https://graph.microsoft.com/v1.0/subscriptions',
	headers:
	{ 'cache-control': 'no-cache',
	Authorization: 'Bearer ' + token,
	'Content-Type': 'application/json' },
	body:
	{ changeType: 'created,updated',
	notificationUrl: 'https://area-epitech-2018.herokuapp.com/webhook',
	resource: '/me/mailfolders(\'inbox\')/messages',
	expirationDateTime: '2019-02-22T11:00:00.0000000Z',
	clientState: 'SecretClientState' },
	json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
}

let webhook = async (req, res) => {
	let body = req.body;
	let query = req.query;

	if (query.validationToken) {
		res.status(200).send(decodeURI(query.validationToken));
		return;
	}

	console.log(body);
	res.json({body})
}

module.exports = {
	office365Connection,
	webhook
}

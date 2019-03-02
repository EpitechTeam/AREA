let ObjectId	= require('mongodb').ObjectID
let User	= require('./../models/User')
let Outlook	= require('./../models/Outlook')
let Calendar	= require('./../models/Calendar')
let One_drive	= require('./../models/One-drive')
let Service	= require('./../models/Services')
let config  = require('../config/index')
let request			= require('request');
let One_diveSpec = require('./one-drive/one-drive.spec')
let fs = require('fs');

//Save token  to calendar
//Save to Outlook
//Save to One_drive
let office365Connection = async (req, res) => {
	var user = await User.findOne({token : req.token});
	var services = await Service.findOne({"_id" : user.services})
	var date = new Date(Date.now() + 3600000).toISOString()

	if (!req.body.accessToken) {
		res.json({error : "give an accessToken"});
		return;
	}

	if(!services.outlook) {
		let newOutlook = new Outlook({
			accessToken : req.body.accessToken,
			fileToOneDrive : false,
			subscriptionId : ""
		})
		await newOutlook.save();
		await Service.updateOne({"_id" : user.services}, { $set : { outlook : newOutlook._id}})
		services = await Service.findOne({"_id" : user.services})
	}
	else {
		let outlook = await Outlook.findOne({"_id" : services.outlook})
		await Outlook.updateOne({"_id" : services.outlook}, { $set : { accessToken : req.body.accessToken}})
	}
	if (!services.calendar) {
		let newCalendar = new Calendar({
			accessToken : req.body.accessToken,
			subscriptionId : ""
		})
		await newCalendar.save();
		await Service.updateOne({"_id" : user.services}, { $set : { calendar : newCalendar._id}})
		services = await Service.findOne({"_id" : user.services})
	}
	else {
		let calendar = await Calendar.findOne({"_id" : services.outlook})
		await Calendar.updateOne({"_id" : services.calendar}, { $set : { accessToken : req.body.accessToken}})
	}
	if (!services.one_drive) {
		let newOne_drive = new One_drive({
			accessToken : req.body.accessToken,
			fileToOneDrive : false,
			subscriptionId : ""
		})
		await newOne_drive.save();
		await Service.updateOne({"_id" : user.services}, { $set : { one_drive : newOne_drive._id}})
	}
	else {
		let one_drive = await One_drive.findOne({"_id" : services.one_drive})
		await One_drive.updateOne({"_id" : services.one_drive}, { $set : { accessToken : req.body.accessToken}})
	}

	services = await Service.findOne({"_id" : user.services})
	setOutlookSubscription(req.body.accessToken, date, services.outlook)
	setCalendarSubscription(req.body.accessToken, date, services.calendar)
	res.json({
		data : "accessToken saved"
	})
}

let setOutlookSubscription = (token , date, id_outlook) => {
	var options = { method: 'POST',
	url: 'https://graph.microsoft.com/v1.0/subscriptions',
	headers:
	{ 'cache-control': 'no-cache',
	Authorization: 'Bearer ' + token,
	'Content-Type': 'application/json' },
	body:
	{ changeType: 'created,updated',
	notificationUrl: 'https://area-epitech-2018.herokuapp.com/webhook',
	resource: '/me/messages',
	expirationDateTime: date,
	clientState: 'SecretClientState' },
	json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		Outlook.updateOne({"_id" : id_outlook}, { $set : { subscriptionId : body.id}}, function (error, outlook_user) {	})
	});
}

let setCalendarSubscription = (token , date, id_calendar) => {
	var options = { method: 'POST',
	url: 'https://graph.microsoft.com/v1.0/subscriptions',
	headers:
	{ 'cache-control': 'no-cache',
	Authorization: 'Bearer ' + token,
	'Content-Type': 'application/json' },
	body:
	{ changeType: 'created,updated',
	notificationUrl: 'https://area-epitech-2018.herokuapp.com/webhook',
	resource: '/me/events',
	expirationDateTime: date,
	clientState: 'SecretClientState' },
	json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		Calendar.updateOne({"_id" : id_calendar}, { $set : { subscriptionId : body.id}}, function (error, calendar_user) {	})
	});
}

let getData = async (path, token) => {
	let options = {
		url : "https://graph.microsoft.com/v1.0/" + path,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json;odata.metadata=minimal;' +
			'odata.streaming=true;IEEE754Compatible=false',
			Authorization: 'Bearer ' + token
    }
  }

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		if (body) {
			let json = JSON.parse(body);
			console.log(json.hasAttachments)
			console.log(json)
			if (json.hasAttachments == true) {


				let options = {
					url : "https://graph.microsoft.com/v1.0/me/messages/" + json.id + "/attachments/#microsoft.graph.fileAttachment",
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token
			    }
			  }
				request(options, function(error, response, body) {
					if (error) throw new Error(error);
					if (body) {
						let json = JSON.parse(body);
						let contentBytes = json.value[0].contentBytes
						let name = json.value[0].name
						let contentType = json.value[0].contentType
						console.log(name, contentType);
						fs.writeFile(name, contentBytes, {encoding: 'base64'}, function(err) {
							console.log('File created');
						});
						sendFileToOneDrive(token, name, name)
					}
				})



			}
		}
	})
}

let sendFileToOneDrive = async (token, name, file) => {
	let outlook = await Outlook.findOne({accessToken : token})
	let services = await Service.findOne({outlook : outlook._id})
	let user = await User.findOne({services : services._id})

	let newOne_drive = new One_diveSpec.One_drive(user.token)
	newOne_drive.uploadFile(name, file)

	return user.token
}

let getAccessTokenBySubscriptionId = async(id) => {
	let outlook = await Outlook.findOne({"subscriptionId" : id})

	if (!outlook) {
		return (false)
	}
	return (outlook.accessToken)
}

let webhook = async (req, res) => {
	console.log("Function office365 webhook")
	let query = req.query;

	if (query.validationToken) {
		res.status(200).send(decodeURI(query.validationToken));
		return;
	}

	var body = req.body.value[0];
	var resource = body.resource
	if (body.changeType == "created") {
		let token = await getAccessTokenBySubscriptionId(body.subscriptionId)
		if (token == false) {
			res.status(200).send();
			return;
		}
		else {
			console.log(body.subscriptionId)
			console.log(body.changeType)
			console.log(body.resourceData)
			getData(resource, token)
		}
	}
	res.json({body})
}

let logout = async (req, res) => {

}

module.exports = {
	office365Connection,
	webhook,
	logout
}

let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let FacebookSpec = require('./facebook.spec');
let Service	= require('./../../models/Services')
let Facebook	= require('./../../models/Facebook')

let addFacebookConnection = async (req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);

	await newFacebook.setAccessToken(req.body.accessToken);

	res.json({type: true,	data: "end"	})
}

let getMe = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	let accessToken = await newFacebook.getAccessToken();

	let me = await newFacebook.getMe()
	res.json({me});
}

let getMyOption = async(req, res) => {
	let user = await User.findOne({token : req.token});
	let services = await Service.findOne({"_id" : user.services})
	let my_facebook = await Facebook.findOne({"_id" : services.facebook})
	res.json({data: my_facebook})
}

let extendToken = async (req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	let accessToken = await newFacebook.getAccessToken();

	let newAccessToken = await newFacebook.extendAccessToken();
	res.json({old: accessToken, new : newAccessToken})
}

let transferPicture = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	let accessToken = await newFacebook.getAccessToken();

	let all_photos = await newFacebook.getAllImageId();
	res.json({all_photos})
}

let changeAccessToken = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.changeAccessToken(req.body.newAccessToken);

	res.json({data: "Token changed"})
}

let addEventToTwitter = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.addEvent("twitter")
	res.json({type : true, data : "done"})
}

let addEventToEmail = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.addEvent("email")
	res.json({type : true, data : "done"})
}

let addEventToCalendar = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.addEvent("calendar")
	res.json({type : true, data : "done"})
}

let removeEventFromTwitter = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.removeEvent("twitter")
	res.json({type : true, data : "done"})
}

let removeEventFromEmail = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.removeEvent("email")
	res.json({type : true, data : "done"})
}

let removeEventFromCalendar = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);
	await newFacebook.removeEvent("calendar")
	res.json({type : true, data : "done"})
}

let isConnected = async(req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);

	res.json({type : await newFacebook.facebookConnected()})
}

let logout = async (req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);

	res.json({type : await newFacebook.logout()})
}

let verifyWebhook = async (req, res) => {
	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = "42"

	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	if (!req.body) {
		console.log(req.body)
	}
	// Checks if a token and mode is in the query string of the request
	if (mode && token) {

		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {

			// Responds with the challenge token from the request
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
}

let webhook = async (req, res) => {
	let body = req.body;

	// Checks this is an event from a page subscription
	console.log(body.entry[0].changed_fields);
	if (body.entry[0].changed_fields[0] == 'events') {
		console.log(body.entry[0]);
	}
	if (body.object === 'page') {

		// Iterates over each entry - there may be multiple if batched
		body.entry.forEach(function(entry) {

			// Gets the message. entry.messaging is an array, but
			// will only ever contain one message, so we get index 0
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
		});

		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
}

module.exports = {
	addFacebookConnection,
	extendToken,
	getMe,
	transferPicture,
	changeAccessToken,
	addEventToTwitter,
	addEventToCalendar,
	addEventToEmail,
	removeEventFromTwitter,
	removeEventFromEmail,
	removeEventFromCalendar,
	isConnected,
	getMyOption,
	logout,
	verifyWebhook,
	webhook
}

let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let FacebookSpec = require('./facebook.spec');
let Service	= require('./../../models/Services')
let Facebook	= require('./../../models/Facebook')

let addFacebookConnection = async (req, res) => {
	let newFacebook = new FacebookSpec.Facebook(req.token);

	await newFacebook.setAccessToken(req.body.accessToken, req.body.id);

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

let addPhotosToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { photosToEmail : true}})
	res.json({type : true, data : "done"})
}

let removePhotosToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { photosToEmail : false}})
	res.json({type : true, data : "done"})
}

let addStatusToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { statusToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeStatusToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { statusToEmail : false}})
	res.json({type : true, data : "done"})
}

let addFriendsToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { friendsToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeFriendsToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { friendsToEmail : false}})
	res.json({type : true, data : "done"})
}

let addWorkToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { workToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeWorkToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { workToEmail : false}})
	res.json({type : true, data : "done"})
}

let addLocationToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { locationToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeLocationToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { locationToEmail : false}})
	res.json({type : true, data : "done"})
}

let addHometownToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { hometownToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeHometownToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { hometownToEmail : false}})
	res.json({type : true, data : "done"})
}

let addEducationToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { educationToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeEducationToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { educationToEmail : false}})
	res.json({type : true, data : "done"})
}

let addReligionToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { religionToEmail : true}})
	res.json({type : true, data : "done"})
}

let removeReligionToEmail = async(req, res) => {
	let user = await User.findOne({token: this.token})
	let services = await Service.findOne({"_id" : user.services})

	Facebook.updateOne({"_id" : services.facebook}, { $set : { religionToEmail : false}})
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

	var newFacebook = new FacebookSpec.Facebook("null");
	await newFacebook.setAccessTokenByUserId(body.entry[0].id);

	if (body.entry[0].changes[0].field == 'events' && body.entry[0].changes[0].verb == 'accept') {
		await newFacebook.handleEvent(body.entry[0].changes[0].value.event_id, body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'photos') {
		await newFacebook.handlePhotos(body.entry[0].changes[0].value.object_id, body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'status') {
		await newFacebook.handleStatus(body.entry[0].changes[0].id, body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'friends') {
		await newFacebook.handleFriend(body.entry[0].changes[0].verb, body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'work') {
		await newFacebook.handleWork(body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'location') {
		await newFacebook.handleLocation(body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'hometown') {
		await newFacebook.handleHomeTown(body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'education') {
		await newFacebook.handleEducation(body.entry[0].id);
	}

	if (body.entry[0].changes[0].field == 'religion') {
		await newFacebook.handleReligion(body.entry[0].id);
	}

	res.status(200).send('EVENT_RECEIVED');
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
	addPhotosToEmail,
	addStatusToEmail,
	addFriendsToEmail,
	addWorkToEmail,
	addLocationToEmail,
	addHometownToEmail,
	addEducationToEmail,
	addReligionToEmail,
	removeEventFromTwitter,
	removeEventFromEmail,
	removeEventFromCalendar,
	removePhotosToEmail,
	removeWorkToEmail,
	removeStatusToEmail,
	removePhotosToEmail,
	removeFriendsToEmail,
	removeLocationToEmail,
	removeHometownToEmail,
	removeLocationToEmail,
	removeReligionToEmail,
	removeEducationToEmail,
	isConnected,
	getMyOption,
	logout,
	verifyWebhook,
	webhook
}

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

let test = async (req, res) => {
	console.log(req.query);
	res.json(req.query);
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
	test
}

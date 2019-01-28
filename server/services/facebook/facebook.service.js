let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let FacebookSpec = require('./facebook.spec');

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

module.exports = {
	addFacebookConnection,
	extendToken,
	getMe,
	transferPicture,
	changeAccessToken
}
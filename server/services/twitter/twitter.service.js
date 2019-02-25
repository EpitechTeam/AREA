let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let TwitterSpec = require('./twitter.spec');

let addTwitterConnection = async (req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	await newTwitter.addTwitterConnection(req.body.token, req.body.token_secret);

	res.json({type: true,	data: "end"	})
}

let twitterRequestToken = async (req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	let token = await newTwitter.getToken();
	res.json({type: true,	data: "end", token : token})
}

module.exports = {
	addTwitterConnection,
	twitterRequestToken
}

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

	res.json({type: true,	data: "end", token : await newTwitter.getToken()})
}

module.exports = {
	addTwitterConnection,
	twitterRequestToken
}

let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')

let addTwitterConnection = async (req, res) => {
	let newTwitter = new TwitterSpec.Twitter(req.token);

	await newTwitter.addTwitterConnection(req.body.token, req.body.token_secret);

	res.json({type: true,	data: "end"	})
}

module.exports = {
	addTwitterConnection
}

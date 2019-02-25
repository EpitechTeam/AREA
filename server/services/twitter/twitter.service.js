let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let TwitterSpec = require('./twitter.spec');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
let request			= require('request');

let addTwitterConnection = async (req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	await newTwitter.addTwitterConnection(req.body.token, req.body.token_secret);

	res.json({type: true,	data: "end"	})
}

let giveConsumerKey = async(req, res) => {
	res.json({consumer_key : process.env.TWITTER_CONSUMER_KEY})
}

let twitterRequestToken = async (req, res) => {
	const oauth = OAuth({
		consumer: { key: process.env.TWITTER_CONSUMER_KEY, secret: process.env.TWITTER_CONSUMER_SECRET},
		signature_method: 'HMAC-SHA1',
		hash_function(base_string, key) {
			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
		}
	});

	const request_data = {
		url: 'https://api.twitter.com/oauth/request_token',
		method: 'GET',
		data: null
	};

	request({
		url: request_data.url,
		method: request_data.method,
		form: request_data.data,
		headers: oauth.toHeader(oauth.authorize(request_data))
	}, function(error, response, body) {
		res.json({data : body})
	});
}

let isConnected = async(req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	res.json({type : await newTwitter.isConnected()})
}

let logout = async(req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	res.json({type : await newTwitter.logout()})
}

module.exports = {
	addTwitterConnection,
	twitterRequestToken,
	giveConsumerKey,
	logout,
	isConnected
}

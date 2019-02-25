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

let tweetSomething = async(req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	await newTwitter.tweetSomething(req.body.tweet);
	res.json("done");
}

let giveConsumerKey = async(req, res) => {
	res.json({consumer_key : process.env.TWITTER_CONSUMER_KEY})
}

let getMe = async(req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	res.json({me : await newTwitter.getMe()})
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

let accessTokenGenerate = async(req, res) => {
	let oauth = req.body.oauth_token;
	let oauth_verifier = req.body.oauth_verifier

	var options = { method: 'POST',
	url: 'https://api.twitter.com/oauth/access_token',
	headers:
	{ 'cache-control': 'no-cache',
	'Content-Type': 'application/x-www-form-urlencoded' },
	form:
	{ oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY,
	oauth_token: oauth,
	oauth_verifier: oauth_verifier,
	undefined: undefined } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		let newTwitter = new TwitterSpec.TwitterClass(req.token);
		let element = new URLSearchParams(body);
		newTwitter.addTwitterConnection(element.get('oauth_token'), element.get('oauth_token_secret'));
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
	isConnected,
	accessTokenGenerate,
	getMe,
	tweetSomething
}

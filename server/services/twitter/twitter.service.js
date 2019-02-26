let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
var Service = require('./../../models/Services')
let serviceConfig = require('../../config/service')
let TwitterSpec = require('./twitter.spec');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
let request			= require('request');
var Twitter = require('twitter');
var TwitterModal = require('./../../models/Twitter')

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

let setId = async(id_twitter, user_id) => {
	await TwitterModal.updateOne({"_id" : id_twitter}, { $set : {user_id : user_id}})
}

let getMe = async(req, res) => {
	let user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})
	let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: twitter_user.token,
		access_token_secret: twitter_user.token_secret
	});

	client.get('account/verify_credentials', function(error, response) {
		if(error) throw error;
		console.log(response.id_str);
		console.log(service.twitter)
		setId(service.twitter, response.id_str)
		res.json({data : response})
	});
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

let getTokenByUserId = async (id) => {
	let twitter_user = await TwitterModal.findOne({user_id : id});
	let services = await Service.findOne({twitter : twitter_user._id})
	let user = await User.findOne({services : services._id})
	return (user.token)
}

//Listen
let webhook = async(req, res) => {
	console.log(req.body);
	let newTwitter = new TwitterSpec.TwitterClass(await getTokenByUserId(req.body.for_user_id));

	if (req.body.tweet_create_events != undefined) {
		await newTwitter.handleTweet(req.body.tweet_create_events[0].text)
	}

	if (req.body.follow_events != undefined) {
		if (req.body.follow_events[0].type == "follow") {
			await newTwitter.handleFollow(req.body.for_user_id, req.body.follow_events[0].target, req.body.follow_events[0].source)
		}
		else if (req.body.follow_events[0].type == "unfollow") {
			await newTwitter.handleUnfollow(req.body.for_user_id, req.body.follow_events[0].target, req.body.follow_events[0].source)
		}
		console.log(req.body.follow_events[0].target)
		console.log(req.body.follow_events[0].source)
	}
	res.send('200 OK')
}

get_challenge_response = function(crc_token, consumer_secret) {

	hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')

	return hmac
}

//Challenge
let crc = async(request, response) => {
	var crc_token = request.query.crc_token

	if (crc_token) {
		var hash = get_challenge_response(crc_token, process.env.TWITTER_CONSUMER_SECRET)

		response.status(200);
		response.send({
			response_token: 'sha256=' + hash
		})
	} else {
		response.status(400);
		response.send('Error: crc_token missing from request.')
	}
}

let createWebhook = async(req, res) => {
	let newTwitter = new TwitterSpec.TwitterClass(req.token);

	res.json({type : await newTwitter.createWebhook()})
}

module.exports = {
	addTwitterConnection,
	twitterRequestToken,
	giveConsumerKey,
	logout,
	isConnected,
	accessTokenGenerate,
	getMe,
	tweetSomething,
	webhook,
	crc,
	createWebhook
}

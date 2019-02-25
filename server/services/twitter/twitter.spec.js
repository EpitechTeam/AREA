var Twitter = require('twitter');
var TwitterModal = require('./../../models/Twitter')
var Service = require('./../../models/Services')
var User	= require('./../../models/User')
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
let request			= require('request');

class TwitterClass {
	constructor(token) {
		this.token = token;
	}

	async addTwitterConnection(token, token_secret) {
		let newTwitter = new TwitterModal({
			token : token,
			token_secret : token_secret
		})

		await newTwitter.save();

		let user = await User.findOne({token : this.token})

		await Service.updateOne({"_id" : user.services}, { $set : { twitter : newTwitter._id }})
		return;
	}

	async getToken() {
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
			console.log(body);
			console.log(error);
			return body
		});
	}

	async tweetSomething(tweet) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		this.client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
		  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: twitter_user.token,
			access_token_secret: twitter_user.token_secret
		});


		this.client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
			if(error) throw error;
		});
	}
}

module.exports = {
	TwitterClass
}

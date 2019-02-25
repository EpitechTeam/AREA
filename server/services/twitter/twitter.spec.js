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

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		await TwitterModal.updateOne({"_id" : service.twitter}, { $set : {token : " ", token_secret : " "}})
		return (true);
	}

	async isConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		if (twitter_user) {
			if (twitter_user.token != null && twitter_user.token != " ") {
				return (true)
			}
			else {
				return (false)
			}
		}
		else {
			return (false)
		}
	}

	async addTwitterConnection(token, token_secret) {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (!service.twitter) {
			let newTwitter = new TwitterModal({
				token : token,
				token_secret : token_secret
			})

			await newTwitter.save();
			await Service.updateOne({"_id" : user.services}, { $set : { twitter : newTwitter._id }})
		}
		else {
			await TwitterModal.updateOne({"_id" : service.twitter}, { $set : { token : token, token_secret : token_secret}})
		}
		return;
	}

	async sendDirectMessage() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		// twitter authentication
		var twitter_oauth = {
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			token: twitter_user.token,
			token_secret: twitter_user.token_secret
		}

		//if (twitter_user)
		// direct message request body
		var dm_params = {
			"event": {
				"type": "message_create",
				"message_create": {
					"target": {
						"recipient_id": "4534871"
					},
					"message_data": {
						"text": "What color bird is your fav?",
						"quick_reply": {
							"type": "options",
						}
					}
				}
			}
		}

		// request options
		var request_options = {
			url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
			oauth: twitter_oauth,
			json: true,
			headers: {
				'content-type': 'application/json'
			},
			body: dm_params
		}

		// POST request to send Direct Message
		request.post(request_options, function (error, response, body) {
			console.log(body)
		})
	}

	async getMe() {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		console.log(twitter_user)
		this.client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
		  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: twitter_user.token,
			access_token_secret: twitter_user.token_secret
		});

		this.client.get('account/verify_credentials', function(error, response) {
			if(error) throw error;
			console.log(response.id_str);
			TwitterModal.updateOne({"_id" : service.twitter}, { $set : {user_id : response.id_str}})
			return (response);
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

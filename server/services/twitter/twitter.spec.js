var Twitter = require('twitter');
var TwitterModal = require('./../../models/Twitter')
var Service = require('./../../models/Services')
var User	= require('./../../models/User')
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
let request			= require('request');
let OutlookSpec = require('../outlook/outlook.spec')

class TwitterClass {
	constructor(token) {
		this.token = token;
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		this.deleteSubscription()
		await TwitterModal.updateOne({"_id" : service.twitter}, { $set : {token : " ", token_secret : " "}})
		return (true);
	}

	async isConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		if (!service.twitter) {
			return (false);
		}
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
				token_secret : token_secret,
				tweetByMail : false,
				startFollowByMail : false,
				getFollowByMail : false,
				getUnfollowByMail : false,
				startFollowSendDirectMessage : false
			})

			await newTwitter.save();
			await Service.updateOne({"_id" : user.services}, { $set : { twitter : newTwitter._id }})
			await this.addSubscription();
		}
		else {
			await TwitterModal.updateOne({"_id" : service.twitter}, { $set : { token : token, token_secret : token_secret}})
			await this.addSubscription();
		}
		return;
	}

	async sendDirectMessage(to_user_id, name) {
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

		if (twitter_user.user_id) {
			// direct message request body
			var dm_params = {
				"event": {
					"type": "message_create",
					"message_create": {
						"target": {
							"recipient_id": to_user_id
						},
						"message_data": {
							"text": "Thank you to follow me ! " + name ,
							"quick_reply": {
								"type": "options",
								"options": [
									{
										"label": "Red Bird",
										"description": "A description about the red bird.",
										"metadata": "external_id_1"
									},
									{
										"label": "Blue Bird",
										"description": "A description about the blue bird.",
										"metadata": "external_id_2"
									},
									{
										"label": "Black Bird",
										"description": "A description about the black bird.",
										"metadata": "external_id_3"
									},
									{
										"label": "White Bird",
										"description": "A description about the white bird.",
										"metadata": "external_id_4"
									}
								]
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
	}

	async handleFollow(for_user_id, target, source) {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		var twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		if (for_user_id == target.id) {
			if (twitter_user.getFollowByMail) {
				let newOutlook = new OutlookSpec.Outlook(this.token);
				await newOutlook.sendEmail("You got a new follower", source.name + " started to follow you, user : " + source.screen_name);
			}
			if (twitter_user.startFollowSendDirectMessage) {
				await this.sendDirectMessage(source.id, target.name)
			}
		}
		else {
			if (twitter_user.startFollowByMail) {
				let newOutlook = new OutlookSpec.Outlook(this.token);
				await newOutlook.sendEmail("You start following a new tweetos", "You started to follow : " + target.screen_name + " " + target.name);
			}
		}
	}

	async handleUnfollow(for_user_id, target, source) {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		var twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		if (twitter_user.getUnfollowByMail) {
			let newOutlook = new OutlookSpec.Outlook(this.token);
			await newOutlook.sendEmail("You unfollowed someaone", "Good bye " + target.screen_name);
		}
	}

	async handleTweet(content) {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})

		if (twitter_user.tweetByMail) {
				let newOutlook = new OutlookSpec.Outlook(this.token);
				await newOutlook.sendEmail("New Activity ont your twitter", content);
		}
	}

	async addSubscription() {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})


		var twitter_oauth = {
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		  token: twitter_user.token,
		  token_secret: twitter_user.token_secret
		}

		var WEBHOOK_ID = process.env.TWITTER_WEBHOOK_ID

		// request options
		var request_options = {
			url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
			oauth: twitter_oauth
		}

		// POST request to create webhook config
		request.post(request_options, function (error, response, body) {

			console.log(error);
			console.log(body)
			if (response.statusCode == 204) {
				console.log('Subscription added.')
			} else {
				console.log('User has not authorized your app.')
			}
			return
		})
	}

	async deleteSubscription() {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})
		let twitter_user = await TwitterModal.findOne({"_id" : service.twitter})


		var twitter_oauth = {
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		  token: twitter_user.token,
		  token_secret: twitter_user.token_secret
		}

		var WEBHOOK_ID = process.env.TWITTER_WEBHOOK_ID


		// request options
		var request_options = {
		  url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
		  oauth: twitter_oauth
		}

		// POST request to create webhook config
		request.delete(request_options, function (error, response, body) {

		  if (response.statusCode == 204) {
		    console.log('Subscription removed.')
		  } else {
		    console.log('User has not authorized your app or subscription not found.')
		  }
			return
		})
	}

	async createWebhook() {
		var WEBHOOK_URL = 'https://area-epitech-2018.herokuapp.com/twitter/webhook'

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

		var params = {
			url : WEBHOOK_URL
		}

		this.client.post('account_activity/all/dev/webhooks.json', params, function(error, response) {
			if(error) throw error;
			console.log(response)
			return (response);
		});
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

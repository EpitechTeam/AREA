var Twitter = require('twitter');
var TwitterModal = require('./../../models/Twitter')
var Service = require('./../../models/Service')

class TwitterClass {
	constructor(token) {
		this.token = token;
	}

	async addTwitterConnection(consumer_key, consumer_secret, bearer_token) {
		let newTwitter = new TwitterModal({
			consumer_key : consumer_key
			consuemer_secret : consumer_secret
			bearer_token : bearer_token
		})

		await newTwitter.save();

		let user = User.findOne({token : this.token})

		await Service.updateOne({"_id" : user.services}, { $set : { twitter : newTwitter._id }})
		return;
	}

	async setAccessToken() {
		this.client = new Twitter({
			consumer_key: '',
			consumer_secret: '',
			bearer_token: ''
		});
	}

	async tweetSomething(tweet) {
		this.client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
			if(error) throw error;
			console.log(tweet);  // Tweet body.
			console.log(response);  // Raw response object.
		});
	}
}

module.exports = {
	TwitterClass
}

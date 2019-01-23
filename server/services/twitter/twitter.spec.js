var Twitter = require('twitter');

class TwitterClass {
	constructor() {
		console.log("construit");
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

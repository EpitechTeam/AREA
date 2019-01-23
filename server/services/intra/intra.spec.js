class Intra {
	constructor() {
		console.log("construit");
	}

	async setAccessToken() {
		var client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, "PassInAccessTokenHere"); //first parameter takes an error if you can't get an access token
			}
		});
	}

	
}

module.exports = {
	Intra
}

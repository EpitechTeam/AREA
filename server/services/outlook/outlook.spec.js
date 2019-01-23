const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Outlook {
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

	async getMe() {
		client
		.api('/me')
		.get((err, res) => {
			console.log(res); // prints info about authenticated user
		});
	}

	async sendEmail() {
		const mail = {
			subject: "Microsoft Graph JavaScript Sample",
			toRecipients: [{
				emailAddress: {
					address: "example@example.com"
				}
			}],
			body: {
				content: "<h1>MicrosoftGraph JavaScript Sample</h1>Check out https://github.com/microsoftgraph/msgraph-sdk-javascript",
				contentType: "html"
			}
		}
		client
		.api('/users/me/sendMail')
		.post({message: mail}, (err, res) => {
			console.log(res)
		})
	}
}

module.exports = {
	Outlook
}

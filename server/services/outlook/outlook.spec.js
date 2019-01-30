let OutlookModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Outlook {
	constructor(token) {
		this.token = token;
	}

	async addOutlookConnection(accessToken) {
		let newOutlook = new OutlookModal({
			accessToken : accessToken
		})

		await newOutlook.save()

		let user = await User.findOne({token : this.token})

		await Service.updateOne({"_id" : user.services}, { $set : { outlook : newOutlook._id }})

		return;
	}

	async setAccessToken(accessToken) {
		this.client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, accessToken); //first parameter takes an error if you can't get an access token
			}
		});
	}

	async getMe() {
		this.client
		.api('/me')
		.get((err, res) => {
			console.log(res); // prints info about authenticated user
		});
	}

	async sendEmail(subject, to_email, content) {
		const mail = {
			subject: subject,
			toRecipients: [{
				emailAddress: {
					address: to_email
				}
			}],
			body: {
				content: content,
				contentType: "text"
			}
		}
		this.client
		.api('/users/me/sendMail')
		.post({message: mail}, (err, res) => {
			console.log(res)
		})
	}
}

module.exports = {
	Outlook
}

//https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6cf6d447-0635-4914-a848-4cb72e761e39&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foffice365&response_mode=form_post&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=12345

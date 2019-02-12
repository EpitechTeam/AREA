let OutlookModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Outlook {
	constructor(token) {
		this.token = token;
	}

	async setFileToOneDrive() {
		let user = await User.findOne({token : req.token});
		let services = await Service.findOne({"_id" : user.services})

		await OutlookModal.updateOne({"_id" : services.outlook}, { $set : {fileToOneDrive : true}})
		return;
	}

	async getMyOption() {

	}
	async addOutlookConnection(accessToken) {
		let newOutlook = new OutlookModal({
			accessToken : accessToken,
			fileToOneDrive : false
		})

		await newOutlook.save()

		try {
			let user = await User.findOne({token : this.token})
		}
		catch (err) {
			console.log(err)
		}

		await Service.updateOne({"_id" : user.services}, { $set : { outlook : newOutlook._id }})

		return;
	}

	async setAccessToken(accessToken) {
	}

	async getMe(accessToken) {
		let user = await User.findOne({token : req.token});
		let services = await Service.findOne({"_id" : user.services})
		let outlook = await OutlookModal.findOne({"_id" : services.outlook})
		this.client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, outlook.accessToken); //first parameter takes an error if you can't get an access token
			}
		});

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

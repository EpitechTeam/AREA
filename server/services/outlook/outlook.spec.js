let OutlookModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Outlook {
	constructor(token) {
		this.token = token;
		let user = await User.findOne({token : req.token});
		var services = await Service.findOne({"_id" : user.services})

		if (services.outlook) {
			let outlook = await OutlookModal.findOne({"_id" : services.outlook})
			this.client = MicrosoftGraph.Client.init({
				authProvider: (done) => {
					done(null, outlook.accessToken); //first parameter takes an error if you can't get an access token
				}
			});
		}
	}

	async setFileToOneDrive() {
		let user = await User.findOne({token : req.token});
		let services = await Service.findOne({"_id" : user.services})

		await OutlookModal.updateOne({"_id" : services.outlook}, { $set : {fileToOneDrive : true}})
		return;
	}

	async getMyOption() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let	outllook = await OutlookModal.findOne({"_id" : service.outlook})
		return outlook
	}

	async setAccessToken(accessToken) {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (!service.outlook) {
			let newOutlook = new OutlookModal({
				accessToken : accessToken,
				fileToOneDrive : false,
			})

			await newOutlook.save();
			await Service.updateOne({"_id" : user.services}, { $set : {outlook : newOutlook._id}})
		}
		else {
			await OutlookModal.updateOne({"_id" : service.facebook}, { $set : {accessToken : accessToken}})
		}
		return;
	}

	async getMe() {
		this.client
		.api('/me')
		.get((err, res) => {
			console.log(res); // prints info about authenticated user
			return res
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

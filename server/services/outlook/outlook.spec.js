let OutlookModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
let request			= require('request');
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Outlook {
	constructor(token) {
		this.create(token);
	}

	async create(token) {
		this.token = token;
		let user = await User.findOne({token : this.token});
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

	async isConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let outlook_user = await OutlookModal.findOne({"_id" : service.outlook})

		if (service.outlook) {
			if (outlook_user.accessToken) {
				if (outlook_user.accessToken == " ") {
					return (false);
				}
				else {
					return (true);
				}
			}
		}
		else {
			return (false);
		}
	}

	deleteSubscritpion(id, accessToken) {
		var options = {
			method : 'DELETE',
			url : 'https://graph.microsoft.com/v1.0/subscriptions/' + id,
			headers :
			{
				Authorization : 'Bearer ' + accessToken
			}
		}

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			console.log(body)
		})
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let outlook_user = await OutlookModal.findOne({"_id" : service.outlook})

		//Delete subscription
		this.deleteSubscritpion(outlook_user.subscriptionId, outlook_user.accessToken)
		await OutlookModal.updateOne({"_id" : service.outlook}, { $set : { accessToken : " " , subscriptionId : " "}})
		return;
	}

	async setFileToOneDrive(value) {
		let user = await User.findOne({token : this.token});
		let services = await Service.findOne({"_id" : user.services})

		await OutlookModal.updateOne({"_id" : services.outlook}, { $set : {fileToOneDrive : value}})
		return;
	}

	async getMyOption() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let	outlook = await OutlookModal.findOne({"_id" : service.outlook})
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
			await OutlookModal.updateOne({"_id" : service.outlook}, { $set : {accessToken : accessToken}})
		}
		return;
	}

	async getMe() {
		let user = await User.findOne({token : this.token});
		var services = await Service.findOne({"_id" : user.services})

		try {
			if (services.outlook) {
				let outlook = await OutlookModal.findOne({"_id" : services.outlook})
				var client = MicrosoftGraph.Client.init({
					authProvider: (done) => {
						done(null, outlook.accessToken); //first parameter takes an error if you can't get an access token
					}
				});
				let user = await client.api('/me').get();
				return user;
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async sendEmail(subject, content) {

		let user = await User.findOne({token : this.token});
		var services = await Service.findOne({"_id" : user.services})

		if (services.outlook) {
			let outlook = await OutlookModal.findOne({"_id" : services.outlook})
			var client = MicrosoftGraph.Client.init({
				authProvider: (done) => {
					done(null, outlook.accessToken); //first parameter takes an error if you can't get an access token
				}
			});

			client
			.api('/me')
			.get((err, res) => {
				var me = res;
				if (me.mail != null && me.mail != undefined) {
					const mail = {
						subject: subject,
						toRecipients: [{
							emailAddress: {
								address: me.mail
							}
						}],
						body: {
							content: content,
							contentType: "text"
						}
					}

					client
					.api('/users/me/sendMail')
					.post({message: mail}, (err, res) => {
					})
				}
			});

		}
	}


}

module.exports = {
	Outlook
}

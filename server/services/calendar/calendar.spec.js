let CalendarModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Calendar {
	constructor(token) {
		this.token = token
		this.create();
	}

	async create() {
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
		let calendar_user = await CalendarModal.findOne({"_id" : service.calendar})

		//Delete subscription
		this.deleteSubscritpion(calendar_user.subscriptionId, calendar_user.accessToken)
		await CalendarModal.updateOne({"_id" : service.calendar}, { $set : { accessToken : " " , subscriptionId : " "}})
		return;
	}


	async setAccessToken() {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (!service.calendar) {
			let newCalendar = new CalendarModal({
				accessToken : accessToken,
			})

			await newCalendar.save();
			await Service.updateOne({"_id" : user.services}, { $set : {outlook : newCalendar._id}})
		}
		else {
			await CalendarModal.updateOne({"_id" : service.calendar}, { $set : {accessToken : accessToken}})
		}
		return;

	}

	async getMyOption() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let	calendar = await CalendarModal.findOne({"_id" : service.calendar})
		return outlook
	}
}

module.exports = {
	Calendar
}

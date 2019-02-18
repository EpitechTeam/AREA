let CalendarModal	= require('./../../models/Outlook')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class Calendar {
	constructor(token) {
		this.token = token
		create();
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

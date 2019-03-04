let User	= require('./../../models/User')
let Service	= require('./../../models/Services')
var IntraModal = require('./../../models/intra')
let OutlookSpec = require('../outlook/outlook.spec')
let CalendarSpec = require('../calendar/calendar.spec')
let TwitterSpec = require('../twitter/twitter.spec')
let CalendarModal	= require('./../../models/Calendar')
let request			= require('request');

class Intra {
	constructor(token) {
		this.token = token;
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		await IntraModal.updateOne({"_id" : service.intra}, { $set : {accessToken : " "}})
		return (true);
	}

	async isConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		if (!service.intra) {
			return (false)
		}
		if (intra_user) {
			if (intra_user.accessToken != null && intra_user.accessToken != " ") {
				return (true)
			}
			else {
				return (false)
			}
		}
		else {
			return (false)
		}
	}

	async handleIntraCards() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		await this.getGPAChange()
		await this.getMessageNotification()
		await this.getPlanning()
	}

	async handleGPAChange(gpa) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		if (!intra_user.GPA_intra || intra_user.GPA_intra == 0) {
			await IntraModal.updateOne({"_id" : service.intra}, {GPA_intra : gpa})
			if (intra_user.GPAChange) {
				let newOutlook = new OutlookSpec.Outlook(this.token);
				await newOutlook.sendEmail("Votre GPA actuel", "GPA : " + gpa);
			}
		}
		else {
			if (intra_user.GPAChange && gpa != intra_user.GPA_intra) {
				let newOutlook = new OutlookSpec.Outlook(this.token);
				await newOutlook.sendEmail("Votre GPA a changé", "GPA : " + gpa);
			}
			await IntraModal.updateOne({"_id" : service.intra}, {GPA_intra : gpa})
		}
	}

	async getGPAChange() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		let options = {
			method : 'GET',
			url : "https://intra.epitech.eu/" + intra_user.accessToken + "/user/?format=json"
		}

		var __self = this
		request(options, function(err, response, body) {
			let json = JSON.parse(body);
			let gpa = parseFloat(json.gpa[0].gpa)
			__self.handleGPAChange(gpa);
		})
	}

	async getMessageNotification() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		let options = {
			method : 'GET',
			url : "https://intra.epitech.eu/" + intra_user.accessToken + "/user/notification/message?format=json"
		}

		var registered_id = [];
		var __self = this;
		request(options, function(err, response, body) {
			let json = JSON.parse(body)
			for (let message of json) {
				let indexOf = intra_user.done.indexOf(message.id)
				if (indexOf == -1) {
					registered_id.push(message.id)
				}
				__self.handleMessage(message.title, message.id)
			}
			__self.updateDone(registered_id)
		})
	}

	async handleMessage(title, id) {
		if (await this.checkIfAlreadyDone(id) == false) {
			let newOutlook = new OutlookSpec.Outlook(this.token);
			await newOutlook.sendEmail("New message notification from intranet", title);
		}
	}

	async getPlanning() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		var intra_user = await IntraModal.findOne({"_id" : service.intra})
		var token = this.token

		Date.prototype.yyyymmdd = function() {
			var mm = this.getMonth() + 1;
			var dd = this.getDate();

			return [this.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
			].join('-');
		};

		var end = new Date(Date.now() + 1728000000);
		var start = new Date();
		let start_at = start.yyyymmdd()
		let end_at = end.yyyymmdd()
		let options = {
			method : 'GET',
			url : "https://intra.epitech.eu/" + intra_user.accessToken + "/planning/load?format=json&start=" + start_at + "&end=" + end_at
		}

		var __self = this;
		var registred_events = []
		request(options, function(err, response, body) {
			let json = JSON.parse(body)
			for (let activity of json) {
				if (activity.semester == 5 || activity.semester == 6) {
					if (activity.event_registered == "registered") {
						if (activity.rdv_group_registered != null) {
							let date = activity.rdv_group_registered.split('|')

							let start = new Date(date[0]).toISOString()
							let end = new Date(date[1]).toISOString()

							let indexOf = intra_user.done.indexOf(activity.codeevent)
							if (indexOf == -1) {
								registred_events.push(activity.codeevent)
							}

							__self.handleActivity(activity.acti_title, activity.type_title, activity.room.code, start, end, activity.codeevent)
						}
						else {
							let start = new Date(activity.start).toISOString()
							let end = new Date(activity.end).toISOString()

							let indexOf = intra_user.done.indexOf(activity.codeevent)
							if (indexOf == -1) {
								registred_events.push(activity.codeevent)
							}
							__self.handleActivity(activity.acti_title, activity.type_title, activity.room.code, start, end, activity.codeevent)
						}
					}
				}
			}
			__self.updateDone(registred_events)
		})
	}

	async updateDone(array) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		var intra_user = await IntraModal.findOne({"_id" : service.intra})

		for (let activity of array) {
			intra_user.done.push(activity)
		}

		await IntraModal.updateOne({"_id" : service.intra}, {$set : {done : intra_user.done}})
	}

	async handleActivity(acti_title, type_title, room, start, end, codeevent) {
		if (await this.checkIfAlreadyDone(codeevent) == false) {
			await this.sendActivity(acti_title, type_title, room, start, end, codeevent)
		}
	}

	async checkIfAlreadyDone(id) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		let response = intra_user.done.indexOf(id)
		if (response == -1) {
			return (false)
		}
		else {
			return (true)
		}
	}

	async sendActivity(acti_title, type_title, room, start, end, codeevent) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		if (intra_user.activityToCalendar) {
			let newCalendar = new CalendarSpec.Calendar(this.token);
			await newCalendar.createEvent(acti_title, type_title, room, start, end);
		}
		if (intra_user.activityToEmail) {
			let newOutlook = new OutlookSpec.Outlook(this.token);
			await newOutlook.sendEmail("New activity registered", acti_title + " " + type_title + " " + start + " " + end);
		}
	}

	async addIntraConnection(token) {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})

		if (!service.intra) {
			let newIntra = new IntraModal({
				accessToken : token,
				GPA_intra : 0,
				done : [],

				GPAChange : false,
				messageNotificationByMail : false,
				activityToEmail : false,
				activityToCalendar : false
			})

			await newIntra.save();
			await Service.updateOne({"_id" : user.services}, { $set : { intra : newIntra._id }})
		}
		else {
			await IntraModal.updateOne({"_id" : service.intra}, {$set : {accessToken : token}})
		}
		return;
	}
}

module.exports = {
	Intra
}

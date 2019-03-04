let MeteoModal	= require('./../../models/Meteo')
let Service = require('./../../models/Services')
let User = require('./../../models/User')
let OutlookSpec = require('../outlook/outlook.spec')
let CalendarSpec = require('../calendar/calendar.spec')
let TwitterSpec = require('../twitter/twitter.spec')
var request = require("request");


class Meteo {
	constructor(token) {
		this.token = token;
	}

	async isConnected() {
		let user = await User.findOne({token: this.token})
		let service = await Service.findOne({"_id" : user.services})
		let meteo_user = await MeteoModal.findOne({"_id" : service.meteo})

		if (!service.meteo) {
			return (false)
		}
		if (meteo_user.accessToken == " ") {
			return (false)
		}
		else {
			return (true)
		}
	}

	async logout() {
		let user = await User.findOne({token: this.token})
		let service = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : service.meteo}, { $set: { accessToken : " " }})
	}

	async	checkIfAlreadyDone(today) {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		var meteo = await MeteoModal.findOne({"_id" : services.meteo})

		let indexOf = meteo.done.indexOf(today)
		if (indexOf == -1) {
			return (false)
		}
		else {
			return (true)
		}
	}

	async addToday(today) {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		var meteo = await MeteoModal.findOne({"_id" : services.meteo})

		meteo.done.push(today)
		await MeteoModal.updateOne({"_id" : services.meteo}, { $set : {done : meteo.done}})
	}

	async handleMeteoCards() {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		var meteo = await MeteoModal.findOne({"_id" : services.meteo})

		Date.prototype.yyyymmdd = function() {
			var mm = this.getMonth() + 1;
			var dd = this.getDate();

			return [this.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
			].join('-');
		};

		let date = new Date()
		if (await this.checkIfAlreadyDone(date.yyyymmdd()) == false) {
			if (meteo.toEmail) {
				await this.meteoByEmail()
			}
			if (meteo.toCalendar) {
				await this.meteoToCalendar()
			}
			if (meteo.toTwitter) {
				await this.meteoOnTwitter()
			}
			await this.addToday(date.yyyymmdd())
		}
	}


	async getMeteoOfUser() {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		let meteo = await MeteoModal.findOne({"_id" : services.meteo})

		var options = {
			method: 'GET',
			url: 'https://api.meteo-concept.com/api/ephemeride/1',
			qs:
			{
				token: process.env.METEO_TOKEN,
				insee: meteo.insee
			},
			headers:
			{
				'cache-control': 'no-cache'
			}
		};

		return (request(options));
	}

	async addMeteoToEmail() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toEmail : true }})
		return;
	}

	async addMeteoToTwitter() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toTwitter : true }})
		return;
	}

	async addMeteoToCalendar() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toCalendar : true }})
		return;
	}

	async removeFromEmail() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toEmail : false }})
		return;
	}

	async removeFromTwitter() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toTwitter : false }})
		return;
	}

	async removeFromCalendar() {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		await MeteoModal.updateOne({"_id" : services.meteo}, { $set: { toCalendar : false }})
		return;
	}

	async addConnection(city, insee) {
		var user = await User.findOne({token : this.token})
		var service = await Service.findOne({"_id" : user.services})

		if (!service.meteo) {
			let newMeteo = new MeteoModal({
				accessToken : process.env.METEO_TOKEN,
				done : [],

				city : city,
				insee : insee,
				toEmail : false,
				toCalendar : false,
				toTwitter : false
			})
			await newMeteo.save();
			await Service.updateOne({"_id" : user.services}, { $set: { meteo : newMeteo._id }})
		}
		else {
			await MeteoModal.updateOne({"_id" : service.meteo}, { $set : {accessToken : process.env.METEO_TOKEN, city : city, insee : insee}})
		}
	}

	async meteoByEmail() {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		let meteo = await MeteoModal.findOne({"_id" : services.meteo})
		var token = this.token

		var options = {
			method: 'GET',
			url: 'https://api.meteo-concept.com/api/forecast/daily',
			qs:
			{
				token: process.env.METEO_TOKEN,
				insee: meteo.insee
			},
			headers:
			{
				'cache-control': 'no-cache'
			}
		};

		request(options, function(err, response, body) {
			let json = JSON.parse(body)
			let newOutlook = new OutlookSpec.Outlook(token);
			newOutlook.sendEmail("Votre météo quotidienne", "Demain il fera entre " + json.forecast[0].tmin +  " et " + json.forecast[0].tmax + " degres. Bonne journée :)");
			return (body)
		})
	}

	async meteoToCalendar() {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		var meteo = await MeteoModal.findOne({"_id" : services.meteo})
		var token = this.token

		var options = {
			method: 'GET',
			url: 'https://api.meteo-concept.com/api/forecast/daily',
			qs:
			{
				token: process.env.METEO_TOKEN,
				insee: meteo.insee
			},
			headers:
			{
				'cache-control': 'no-cache'
			}
		};

		request(options, function(err, response, body) {
			let json = JSON.parse(body)
			let newCalendar = new CalendarSpec.Calendar(token);
			newCalendar.createEvent("Météo",
															"Météo entre " + json.forecast[0].tmin +  " et " + json.forecast[0].tmax + " degres",
															meteo.city,
															json.forecast[0].datetime,
															json.forecast[0].datetime)
			return (body)
		})
	}

	async meteoOnTwitter() {
		let user = await User.findOne({token : this.token})
		let services = await Service.findOne({"_id" : user.services})
		var meteo = await MeteoModal.findOne({"_id" : services.meteo})
		var token = this.token

		var options = {
			method: 'GET',
			url: 'https://api.meteo-concept.com/api/forecast/daily',
			qs:
			{
				token: process.env.METEO_TOKEN,
				insee: meteo.insee
			},
			headers:
			{
				'cache-control': 'no-cache'
			}
		};

		request(options, function(err, response, body) {
			let json = JSON.parse(body)
			let newTwitter = new TwitterSpec.TwitterClass(token);
			newTwitter.tweetSomething("Météo entre " + json.forecast[0].tmin +  " et " + json.forecast[0].tmax + " degres")
			return (body)
		})
	}
}

module.exports = {
	Meteo
}

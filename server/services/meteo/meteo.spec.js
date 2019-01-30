let MeteoModal	= require('./../../models/Meteo')
let Service = require('./../../models/Services')
let User = require('./../../models/User')
var request = require("request");

class Meteo {
	constructor(token) {
		this.token = token;
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

		try {
			let response = await request(options);
			// console.log(response);
			return (response);
		}
		catch (err) {
			console.log(err);
			return;
		}
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

		if (user && !service.meteo) {
			let newMeteo = new MeteoModal({
				accessToken : process.env.METEO_TOKEN,
				city : city,
				insee : insee,
				toEmail : false,
				toCalendar : false,
				toTwitter : false
			})
			await newMeteo.save();
			await Service.updateOne({"_id" : user.services}, { $set: { meteo : newMeteo._id }})
		}
	}

	async meteoByEmail() {

	}

	async meteoToCalendar() {

	}

	async meteoOnTwitter() {

	}
}

// let test = async () => {
// 	let newMeteo = await new Meteo();
//
// 	let test = await newMeteo.getMeteoOfUser();
// 	console.log(test);
// }

// test();

module.exports = {
	Meteo
}

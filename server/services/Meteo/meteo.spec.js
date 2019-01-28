let MeteoModal	= require('./../../models/Meteo')
let Service = require('./../../models/Services')
var request = require("request");

class Meteo {
	constructor(token) {
		console.log("construit");
		this.token = token;
	}

	async getMeteoOfUser() {
		var options = {
			method: 'GET',
			url: 'https://api.meteo-concept.com/api/ephemeride/1',
			qs:
			{
				token: process.env.METEO_TOKEN,
				insee: '34172'
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

	async addConnection(city) {
		//Creer l'objet meteo et le link au service
		let newMeteo = new MeteoModal({
			accessToken : process.env.METEO_TOKEN,
			city : city,
			toEmail : false,
			toCalendar : false,
			toTwitter : false
		})

		await newMeteo.save();

		let user = await User.findOne({token : this.token})
		await Service.updateOne({"_id" : user.services}, { $set: { meteo : newMeteo._id }})
	}

	async meteoByEmail() {

	}

	async meteoToCalendar() {

	}

	async meteoOnTwitter() {

	}
}

let test = async () => {
	let newMeteo = await new Meteo();

	let test = await newMeteo.getMeteoOfUser();
	console.log(test);
}

test();

module.exports = {
	Meteo
}

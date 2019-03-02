let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let Meteo	= require('./../../models/Meteo')
let config  = require('../../config/index')
let MeteoSpec = require('./meteo.spec');

let addMeteoConnection = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.addConnection(req.body.city, req.body.insee)
	res.json({type : true, data : "done"})
}

let isConnected = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	res.json({type : await newMeteo.isConnected()})
}

let logout = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	res.json({type : await newMeteo.logout()})
}

let addMeteoToTwitter = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.addMeteoToTwitter();
	res.json({type : true, data : "done"})
}

let addMeteoToEmail = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.addMeteoToEmail();
	res.json({type : true, data : "done"})
}

let addMeteoToCalendar = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.addMeteoToCalendar();
	res.json({type : true, data : "done"})
}

let removeFromTwitter = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.removeFromTwitter();
	res.json({type : true, data : "done"})
}

let removeFromEmail = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.removeFromEmail();
	res.json({type : true, data : "done"})
}

let removeFromCalendar = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.removeFromCalendar();
	res.json({type : true, data : "done"})
}

let meteoOfUser = async (req, res) => {
	let user = await User.findOne({token : req.token})
	let services = await Service.findOne({"_id" : user.services})
	let meteo = await Meteo.findOne({"_id" : services.meteo})

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

	request(options, function(err, body) {
		res.json({data : body})
	})
}

let myOption = async(req, res) => {
	let user = await User.findOne({token : req.token})
	let services = await Service.findOne({"_id" : user.services})
	let meteo = await Meteo.findOne({"_id" : services.meteo})

	res.json({data : meteo})
}

module.exports = {
	addMeteoConnection,
	addMeteoToEmail,
	addMeteoToTwitter,
	addMeteoToCalendar,
	removeFromEmail,
	removeFromTwitter,
	removeFromCalendar,
	meteoOfUser,
	myOption,
	isConnected
}

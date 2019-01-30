let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let MeteoSpec = require('./meteo.spec');

let addMeteoConnection = async (req, res) => {
	let newMeteo = new MeteoSpec.Meteo(req.token)

	await newMeteo.addConnection(req.body.city, req.body.insee)
	res.json({type : true, data : "done"})
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

module.exports = {
	addMeteoConnection,
	addMeteoToEmail,
	addMeteoToTwitter,
	addMeteoToCalendar,
	removeFromEmail,
	removeFromTwitter,
	removeFromCalendar
}

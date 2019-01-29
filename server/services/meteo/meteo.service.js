let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')
let MeteoSpec = require('./meteo.spec');

let addMeteoConnection = async (req, res) => {
	let newMeteo = new MeteoSpec(req.token)

	await newMeteo.addConnection(req.body.city, req.body.insee)
	res.json({type : true, data : "done"})
}

let addMeteoToTwitter = async (req, res) => {
	let newMeteo = new MeteoSpec(req.token)

	await MeteoSpec.addMeteoToTwitter();
	res.json({type : true, data : "done"})
}

let addMeteoToEmail = async (req, res) => {
	let newMeteo = new MeteoSpec(req.token)

	await MeteoSpec.addMeteoToEmail();
	res.json({type : true, data : "done"})
}

let addMeteoToCalendar = async (req, res) => {
	let newMeteo = new MeteoSpec(req.token)

	await MeteoSpec.addMeteoToCalendar();
	res.json({type : true, data : "done"})
}

module.exports = {
	addMeteoConnection,
	addMeteoToEmail,
	addMeteoToTwitter,
	addMeteoToCalendar
}

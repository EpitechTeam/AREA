let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let calendarSpec = require('./calendar.spec')

let addCalendarConnection = async (req, res) => {
	let newCalendar = new calendarSpec.Calendar(req.token);

	await calendarSpec.setAccessToken(req.body.accessToken);
	res.json({type : true, data : "test"})
}

let getMyOption = async (req, res) => {
	let newCalendar = new calendarSpec.Calendar(req.token);

	let option = await calendarSpec.Calendar.getMyOption();
	res.json({data : option})
}

module.exports = {
	addCalendarConnection,
	getMyOption
}

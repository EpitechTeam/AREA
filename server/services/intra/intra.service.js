let User	= require('./../../models/User')
let IntraSpec = require('./intra.spec');
let Service	= require('./../../models/Services')
let Intra	= require('./../../models/intra')
let request			= require('request');

let addIntraConnection = async (req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	await newIntra.addIntraConnection(req.body.token);

	res.json({type: true,	data: "end"	})
}

let getMe = async (req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})
	var intra_user = await Intra.findOne({"_id" : service.intra})

	try {
		var options = { method: 'GET',
		url: 'https://intra.epitech.eu/' +  intra_user.accessToken + '/user/',
		qs: { format: 'json' },
		headers:
		{ 'cache-control': 'no-cache' } };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			let newBody = JSON.parse(body)
			res.json({me : newBody})
		});
	}
	catch (err) {
		console.log(err)
	}
}

let logout = async(req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	res.json({type : await newIntra.logout()});
}

let isConnected = async(req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	res.json({type : await newIntra.isConnected()});
}

let test = async(req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	await newIntra.getMessageNotification();
	res.json({type : true});
}

let addGPAChangeByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {GPAChange : true}})
	res.json({data : "done"})
}

let removeGPAChangeByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {GPAChange : false}})
	res.json({data : "done"})
}

let addMessageNotificationByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {messageNotificationByMail : true}})
	res.json({data : "done"})
}

let removeMessageNotificationByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {messageNotificationByMail: false}})
	res.json({data : "done"})
}

let addActivityByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {activityToEmail : true}})
	res.json({data : "done"})
}

let removeActivityByMail = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {activityToEmail: false}})
	res.json({data : "done"})
}

let addActivityToCalendar = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {activityToCalendar : true}})
	res.json({data : "done"})
}

let removeActivityToCalendar = async(req, res) => {
	var user = await User.findOne({token : req.token})
	var service = await Service.findOne({"_id" : user.services})

	await Intra.updateOne({"_id" : service.intra}, {$set : {activityToCalendar: false}})
	res.json({data : "done"})
}

module.exports = {
	addIntraConnection,
	isConnected,
	logout,
	getMe,
	test,
	addGPAChangeByMail,
	removeGPAChangeByMail,
	addMessageNotificationByMail,
	removeMessageNotificationByMail,
	addActivityByMail,
	removeActivityByMail,
	addActivityToCalendar,
	removeActivityToCalendar
}

let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path	= require('path')
let User	= require('./../../models/User')
let Service	= require('./../../models/Services')
let sha256      = require('sha256')
let jwt         = require('jsonwebtoken')
let randomToken = require('random-token')
let config  = require('../../config/index')
let Facebook	= require('./../../models/Facebook')
let Calendar	= require('./../../models/Calendar')
var Intra = require('./../../models/intra')
let Meteo	= require('./../../models/Meteo')
let One_drive	= require('./../../models/One-drive')
let Outlook	= require('./../../models/Outlook')
var Twitter = require('./../../models/Twitter')
let aboutServices = require('./services')

let me = async (req, res) => {
	let user = await User.findOne({token: req.token});
	res.json({user});
}

let getService = async (req, res) => {
	var user = await User.findOne({token : req.token});
	var services = await Service.findOne({"_id" : user.services})

	var options = []
	if (services.facebook) {
		let facebook_user = await Facebook.findOne({"_id" : services.facebook}, {card : 1})
		options.push(facebook_user)
	}
	if (services.twitter) {
		let twitter_user = await Twitter.findOne({"_id" : services.twitter})
		options.push(twitter_user)
	}
	if (services.outlook) {
		let outlook_user = await Outlook.findOne({"_id" : services.outlook})
		options.push(outlook_user)
	}
	if (services.intra) {
		let intra_user = await Intra.findOne({"_id" : services.intra})
		options.push(intra_user)
	}
	if (services.calendar) {
		let calendar_user = await Calendar.findOne({"_id" : services.calendar})
		options.push(calendar_user)
	}
	if (services.meteo) {
		let meteo_user = await Meteo.findOne({"_id" : service.meteo})
		options.push(meteo_user)
	}
	if (services.one_drive) {
		let one_drive_user = await One_drive.findOne({"_id" : services.one_drive})
		options.push(one_drive_user)
	}

	console.log(options);
	res.json({
		services : options
	})
}

let updatePassword = async(req, res) => {
	let user = await User.findOne({token : req.token})
	let hashpassword = sha256(req.body.password)

	await User.updateOne({token : req.token}, { $set :  {password : hashpassword}})
	res.json({data : "saved"})
}

let update = async (req, res) => {
	let user = await User.findOne({token : req.token})

	await User.updateOne({token : req.token}, { $set :  {first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email}})
	res.json({data : "saved"})
}

let login = (req, res) => {
	User.findOne({email: req.body.email, password: sha256(req.body.password)}, (err, rep) => {
		if (err || !rep) {
			res.json({type: false, data: "No user found"})
		}
		else {
			res.json({type: true, data: rep})
		}
	})
}

let checkLogin = async (req, res) => {
	let user = await User.findOne({token : req.token})

	if (user) {
		res.json({type : true})
	}
}

let register = async (req, res) => {
	let testEmail = await User.find({email : req.body.email}).lean()

	console.log(testEmail)
	if (testEmail == []) {
		res.json({type: false, data : testEmail})
		return;
	}

	let hashpassword = sha256(req.body.password)
	let string = randomToken(16);
	let token = jwt.sign({id: string}, config.JWT_HASH)

	//Creer le service et le save

	let newService = new Service({})

	await newService.save()

	let newUser = new User({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		password : hashpassword,
		services : newService._id,
		token : token
	})

	await newUser.save()
	let user = await User.findOne({email: req.body.email});
	res.json({type: true, data : user});
}

let getServices = async() => {
	var services = []

	let facebook = await aboutServices.facebook()
	if (facebook != null) {
		services.push(facebook)
	}

	let twitter = await aboutServices.twitter()
	if(twitter != null) {
		services.push(twitter)
	}

	let mail = await aboutServices.mail()
	if (mail != null) {
		services.push(mail)
	}

	let intra = await aboutServices.intra()
	if (intra != null) {
		services.push(intra)
	}

	let meteo = await aboutServices.meteo()
	if (meteo != null) {
		services.push(meteo)
	}

	return (services)
}

let about = async (req, res) => {
	let body = {
		client : {
			host : req.ip
		},
		server : {
			current_time : Math.floor(new Date() / 1000),
			services : []
		}
	}

	body.server.services = await getServices();
	res.json({body})
}

module.exports = {
	me,
	login,
	register,
	about,
	getService,
	update,
	updatePassword
}

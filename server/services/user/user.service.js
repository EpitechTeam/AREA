let ObjectId	= require('mongodb').ObjectID
let fs = require('fs')
let path	= require('path')
let User	= require('./../../models/User')
let sha256      = require('sha256')
let jwt         = require('jsonwebtoken')
let randomToken = require('random-token')
let config  = require('../../config/index')

let me = async (req, res) => {
	let user = await User.findOne({token: req.token});
	res.json({user});
}

let login = (req, res) => {
	User.findOne({email: req.body.email, password: sha256(req.body.password)}, (err, rep) => {
		if (err || !rep) {
			res.json({
				type: false,
				data: "No user found"
			})
		}
		else {
			res.json({
				type: true,
				data: rep
			})
		}
	})
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

module.exports = {
	me,
	login,
	register
}

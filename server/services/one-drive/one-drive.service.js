let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let serviceConfig = require('../../config/service')

let addOne_driveConnection = async (req, res) => {
	res.json({type : true, data : serviceConfig.facebook})
}

module.exports = {
	addOne_driveConnection
}

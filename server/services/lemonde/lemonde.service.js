let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let lemondeSpec = require('./lemonde.spec')

let addLemondeConnection = async (req, res) => {
	let newLemonde = new lemondeSpec.Lemonde(req.token);

	await newLemonde.setAccessToken();
	res.json({type : true, data : "test"})
}

let getMyOption = async (req, res) => {
	let newLemonde = new lemondeSpec.Lemonde(req.token);

	let option = await newLemonde.getMyOption();
	res.json({data : option})
}

let logout = async (req, res) => {
  let newLemonde = new lemondeSpec.Lemonde(req.token);

  await newLemonde.logout();
  res.json({data : "logout sucess"})
}

let isConnected = async (req, res) => {
  let newLemonde = new lemondeSpec.Lemonde(req.token);

  let isConnected = await newLemonde.isConnected();
  res.json({data : isConnected})
}

let addNewsToEmail = async(req, res) => {
  let newLemonde = new lemondeSpec.Lemonde(req.token);

  let isConnected = await newLemonde.addNewsToEmail();
  res.json({data : true})
}

let removeNewsToEmail = async(req, res) => {
  let newLemonde = new lemondeSpec.Lemonde(req.token);

  let isConnected = await newLemonde.removeNewsToEmail();
  res.json({data : true})
}

let test = async(req, res) => {
  let newLemonde = new lemondeSpec.Lemonde(req.token);

  await newLemonde.handleLemondeCards();
  res.json({data : true})
}

module.exports = {
	addLemondeConnection,
	getMyOption,
  logout,
  isConnected,
  addNewsToEmail,
  removeNewsToEmail,
  test
}

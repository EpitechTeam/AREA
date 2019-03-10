let ObjectId	= require('mongodb').ObjectID
let User	= require('./../../models/User')
let config  = require('../../config/index')
let nasaSpec = require('./nasa.spec')

let addNasaConnection = async (req, res) => {
	let newNasa = new nasaSpec.Nasa(req.token);

	await newNasa.setAccessToken();
	res.json({type : true, data : "test"})
}

let getMyOption = async (req, res) => {
	let newNasa = new nasaSpec.Nasa(req.token);

	let option = await newNasa.getMyOption();
	res.json({data : option})
}

let logout = async (req, res) => {
  let newNasa = new nasaSpec.Nasa(req.token);

  await newNasa.logout();
  res.json({data : "logout sucess"})
}

let isConnected = async (req, res) => {
  let newNasa = new nasaSpec.Nasa(req.token);

  let isConnected = await newNasa.isConnected();
  res.json({data : isConnected})
}

let addApodToEmail = async(req, res) => {
  let newNasa = new nasaSpec.Nasa(req.token);

  let isConnected = await newNasa.addApodToEmail();
  res.json({data : true})
}

let removeApodToEmail = async(req, res) => {
  let newNasa = new nasaSpec.Nasa(req.token);

  let isConnected = await newNasa.removeApodToEmail();
  res.json({data : true})
}

let test = async(req, res) => {
  let newNasa = new nasaSpec.Nasa(req.token);

  await newNasa.handleNasaCards();
  res.json({data : true})
}

module.exports = {
	addNasaConnection,
	getMyOption,
  logout,
  isConnected,
  addApodToEmail,
  removeApodToEmail,
  test
}

let User	= require('./../../models/User')
let IntraSpec = require('./intra.spec');

let addIntraConnection = async (req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	await newIntra.addIntraConnection(req.body.token);

	res.json({type: true,	data: "end"	})
}

let logout = async(req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	res.json({type : await newIntra.logout()});
}

let isConnected = async(req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	res.json({type : await newIntra.isConnected()});
}

module.exports = {
	addIntraConnection,
	isConnected,
	logout
}

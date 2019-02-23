let User	= require('./../../models/User')
let IntraSpec = require('./intra.spec');

let addIntraConnection = async (req, res) => {
	let newIntra = new IntraSpec.Intra(req.token);

	await newIntra.addIntraConnection(req.body.token);

	res.json({type: true,	data: "end"	})
}

module.exports = {
	addIntraConnection
}

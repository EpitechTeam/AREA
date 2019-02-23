let User	= require('./../../models/User')
let Service	= require('./../../models/Services')
var IntraModal = require('./../../models/intra')

class Intra {
	constructor(token) {
		this.token = token;
	}

	async addIntraConnection(token) {
		let newIntra = new IntraModal({
			accessToken : token
		})

		await newIntra.save();

		let user = await User.findOne({token : this.token})

		await Service.updateOne({"_id" : user.services}, { $set : { intra : newIntra._id }})
		return;
	}
}

module.exports = {
	Intra
}

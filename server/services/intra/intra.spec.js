let User	= require('./../../models/User')
let Service	= require('./../../models/Services')
var IntraModal = require('./../../models/intra')

class Intra {
	constructor(token) {
		this.token = token;
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		await IntraModal.updateOne({"_id" : service.intra}, { $set : {accessToken : " "}})
		return (true);
	}

	async isConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let intra_user = await IntraModal.findOne({"_id" : service.intra})

		if (intra_user) {
			if (intra_user.accessToken != null && intra_user.accessToken != " ") {
				return (true)
			}
			else {
				return (false)
			}
		}
		else {
			return (false)
		}
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

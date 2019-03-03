let fs = require('fs');
let One_driveModal	= require('./../../models/One-drive')
let request			= require('request');
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class One_drive {
	constructor(token) {
		this.token = token
	}

	deleteSubscritpion(id, accessToken) {
		var options = {
			method : 'DELETE',
			url : 'https://graph.microsoft.com/v1.0/subscriptions/' + id,
			headers :
			{
				Authorization : 'Bearer ' + accessToken
			}
		}

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			console.log(body)
		})
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let one_drive_user = await One_driveModal.findOne({"_id" : service.outlook})

		//Delete subscription
		//this.deleteSubscritpion(one_drive_user.subscriptionId, one_drive_user.accessToken)
		await One_driveModal.updateOne({"_id" : service.one_drive}, { $set : { accessToken : " "}})
		return;
	}

	async setAccessToken() {
		this.client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, "PassInAccessTokenHere"); //first parameter takes an error if you can't get an access token
			}
		});
	}

	async deleteOneDriveItem(item_id) {
		this.client
		.api(`/me/drive/items/${ONE_DRIVE_FILE_ID_TO_DELETE}`)
		.delete((err, res) => {
			if (err) {
				return;
			}
			console.log(res)
		})
	}

	/*Upload file on one drive*/
	async uploadFile(name, path_local_file) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let one_drive_user = await One_driveModal.findOne({"_id" : service.one_drive})

		this.client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, one_drive_user.accessToken); //first parameter takes an error if you can't get an access token
			}
		});


		console.log("try to upload file")
		let stream = fs.createReadStream(path_local_file); //path to local file
		this.client
		.api('/me/drive/root:/Attachments/' + name + ':/content') // path to the destination in OneDrive
		.putStream(stream, (err) => {
			console.log(err);
		});
	}

	async downloadFile(path_of_source_file, path_to_save_file) {
		this.client
		.api('/me/drive/root/children/Book.xlsx/content') // path of  source file in OneDrive
		.getStream((err, downloadStream) => {
			let writeStream = fs.createWriteStream('Book.xlsx'); // path to save file to
			downloadStream.pipe(writeStream).on('error', console.log);
		});
	}
}

module.exports = {
	One_drive
}

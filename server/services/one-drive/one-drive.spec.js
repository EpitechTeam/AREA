let fs = require('fs');
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class One_drive {
	constructor() {
		console.log("construit");
	}

	async setAccessToken() {
		var client = MicrosoftGraph.Client.init({
			authProvider: (done) => {
				done(null, "PassInAccessTokenHere"); //first parameter takes an error if you can't get an access token
			}
		});
	}

	async deleteOneDriveItem(item_id) {
		client
		.api(`/me/drive/items/${ONE_DRIVE_FILE_ID_TO_DELETE}`)
		.delete((err, res) => {
			if (err) {
				return;
			}
			console.log(res)
		})
	}

	/*Upload file on one drive*/
	async uploadFile() {
		let stream = fs.createReadStream('./logo.png'); //path to local file
		client
		.api('/me/drive/root/children/logo.png/content') // path to the destination in OneDrive
		.putStream(stream, (err) => {
			console.log(err);
		});
	}

	async downloadFile() {
		client
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

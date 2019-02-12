let User	= require('./../../models/User')
let FacebookModal	= require('./../../models/Facebook')
let Service	= require('./../../models/Services')
var FB = require('fb');

class Facebook {
	constructor(token) {
		this.token = token
	}

	async facebookConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (service.facebook == undefined) {
			return (false);
		}
		return (true);
	}

	async changeAccessToken(newAccessToken) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let facebook = await FacebookModal.findOne({"_id" : service.facebook})

		let newValues = {$set : {accessToken : newAccessToken}}

		await FacebookModal.updateOne({"_id" : service.facebook}, newValues)

		return;
	}

	async addEvent(to) {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		if (to == "email") {
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToEmail : true }})
		} else if (to == "twitter") {
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToTwitter : true }})
		} else if (to == "calendar"){
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToCalendar : true }})
		} else {
			return;
		}
		return;
	}

	async removeEvent(from) {
		let user = await User.findOne({token: this.token})
		let services = await Service.findOne({"_id" : user.services})

		if (from == "email") {
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToEmail : false }})
		} else if (from == "twitter") {
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToTwitter : false }})
		} else if (from == "calendar"){
			await FacebookModal.updateOne({"_id" : services.facebook}, { $set: { eventToCalendar : false }})
		} else {
			return;
		}
		return;
	}

	async getStatus() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('/', 'GET', {});
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
			return (err);
		}
	}

	async getEvents() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('/me?fields=events', 'GET', {});
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
			return (err);
		}
	}

	async getAllImageId() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('/me/photos/uploaded?fields=webp_images', 'GET', {});
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
			return (err);
		}
	}

	async uploadPost(MessageOfPost) {
		var body = MessageOfPost;

		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('me/feed', 'post', { message: body });
			return (facebookResponse);
		}
		catch (err) {
			console.log(err)
		}
	}

	async uplodPhoto(path, description) {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('me/photos', 'post', { source: fs.createReadStream(path), caption: description });
			return (facebookResponse)
		}
		catch (err) {
			console.log(err);
		}
	}

	async extendAccessToken() {
		/*Extend expiry time of the access token*/
		try {
			let newAccessToken = await FB.api('oauth/access_token', {
				client_id: '608250742962709',
				client_secret: '',
				grant_type: 'fb_exchange_token',
				fb_exchange_token: this.accessToken
			});
			console.log(newAccessToken);
			return (newAccessToken);
		}
		catch (err) {
			console.log(err);
			return;
		}
	}

	async setAccessToken(long_lived_token) {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		//Create facebook object linked to service with accessToken
		//If facebook already exist
		if (!service.facebook) {
			let newFacebook = new FacebookModal({
				accessToken : long_lived_token,
				actionTag : false,
				transferPicture : false,
				eventToEmail : false,
				eventToEmail : false,
				eventToCalendar : false
			})

			await newFacebook.save();
			await Service.updateOne({"_id" : user.services}, { $set : {facebook : newFacebook._id}})
		}
		else {
			await FacebookModal.updateOne({"_id" : service.facebook}, { $set : {accessToken : long_lived_token}})
		}
		return;
	}

	async getMe() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('/me', 'GET', {});
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
			return (err);
		}
	}

	async getTagedPlace() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('/me/tagged_places', 'GET', {});
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
			return (err);
		}
	}

	async getAccessToken(token) {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let facebook = await FacebookModal.findOne({"_id" : service.facebook})

		this.accessToken = facebook.accessToken
		return (facebook.accessToken)
	}
}

module.exports = {
	Facebook
}

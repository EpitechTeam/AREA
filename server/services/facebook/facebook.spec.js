let User	= require('./../../models/User')
let FacebookModal	= require('./../../models/Facebook')
let Service	= require('./../../models/Services')
var FB = require('fb');
let OutlookSpec = require('../outlook/outlook.spec')
let CalendarSpec = require('../calendar/calendar.spec')
let TwitterSpec = require('../twitter/twitter.spec')

class Facebook {
	constructor(token) {
		this.token = token
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		await FacebookModal.updateOne({"_id" : service.facebook}, { $set : { accessToken : " " }})
		return;
	}

	async facebookConnected() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let facebook_user = await FacebookModal.findOne({"_id" : service.facebook})

		if (facebook_user.accessToken == " ") {
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

	async setAccessTokenByUserId(id) {
		//Find wich user have this id
		try {
			let facebook_user = await FacebookModal.findOne({"user_id" : id});
			this.accessToken = facebook_user.accessToken;
		}
		catch (err) {
			console.log("no user found")
		}
		//set accessToken to graph api
	}

	async getTokenByUserId(id) {
		let facebook_user = await FacebookModal.findOne({user_id : id});
		let services = await Service.findOne({facebook : facebook_user._id})
		let user = await User.findOne({services : services._id})
		return (user.token)
	}

	async handleEvent(event_id, user_id) {
		try {
			FB.setAccessToken(this.accessToken);
			var facebookResponse = await FB.api('/' + event_id, 'GET', {});
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.eventToEmail) {
				await this.sendEmailByOutlook(facebookResponse.name, facebookResponse.description, user_id)
			}
			if (facebook_user.eventToCalendar) {
				let newCalendar = new CalendarSpec.Calendar(await this.getTokenByUserId(user_id));
				newCalendar.createEvent(facebookResponse.name, facebookResponse.description, facebookResponse.place.name, facebookResponse.start_time, facebookResponse.end_time)
			}
			if (facebook_user.eventToTwitter) {
				let newTwitter = new TwitterSpec.Twitter(await this.getTokenByUserId(user_id));
				newTwitter.tweetSomething("I'm intersted in " + facebookResponse.name)
			}
			return (facebookResponse);
		}
		catch (err) {
			console.log(err);
		}
	}

	async handleFriend(action, user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.friendsToEmail) {
				if (action == "remove") {
					await this.sendEmailByOutlook("Vous avez récement supprimés un ami", "Vous avez récement supprimé un ami de votre liste d'ami sur Facebook", user_id)
				}
				else if (action == "add") {
					await this.sendEmailByOutlook("Vous avez récement ajouté un ami", "Vous avez récement ajouté un ami de votre liste d'ami sur Facebook", user_id)
				}
				else {
					await this.sendEmailByOutlook("Vous avez récement supprimés un ami", "Vous avez récement supprimer un ami de votre liste d'ami sur Facebook", user_id)
				}
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleWork(user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.workToEmail) {
				await this.sendEmailByOutlook("Votre section professionel a changé sur votre facebook", "Vous avez récement mis à jour vos expériences professionelles", user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleEducation(user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.educationToEmail) {
				await this.sendEmailByOutlook("Votre section education a changé sur votre facebook", "Vous avez récement mis à jour votre scolarité", user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleReligion(user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.religionToEmail) {
				await this.sendEmailByOutlook("Votre section croyance a changé sur votre facebook", "Vous avez récement mis à jour vos croyance", user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleHomeTown(user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.hometownToEmail) {
				await this.sendEmailByOutlook("Chagement de ville d'origine sur votre facebook", "Vous avez récement changer votre ville d'origine", user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleLocation(user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.locationToEmail) {
				await this.sendEmailByOutlook("Changement de ville actuelle sur votre facebook", "Vous avez récement changer votre ville actuelle", user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handlePhotos(photos_id, user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.photosToEmail) {
				FB.setAccessToken(this.accessToken);
				var facebookResponse = await FB.api('/' + photos_id + '?fields=picture', 'GET', {});
				await this.sendEmailByOutlook("Nouvelle photo sur votre profil", facebookResponse.picture, user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	async handleStatus(status_id, user_id) {
		try {
			let facebook_user = await FacebookModal.findOne({accessToken : this.accessToken})

			if (facebook_user.statusToEmail) {
				FB.setAccessToken(this.accessToken);
				var facebookResponse = await FB.api('/' + status_id, 'GET', {});
				await this.sendEmailByOutlook("Nouveau post sur votre facebook", facebookResponse.message, user_id)
			}
		}
		catch (err) {
			console.log(err)
		}
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

	async sendEmailByOutlook(subject, content, id) {
		let newOutlook = new OutlookSpec.Outlook(await this.getTokenByUserId(id));

		//await OutlookSpec.getMe();
		await newOutlook.sendEmail(subject, content);
	}

	async extendAccessToken() {
		/*Extend expiry time of the access token*/
		try {
			let newAccessToken = await FB.api('oauth/access_token', {
				client_id: '608250742962709',
				client_secret: process.env.FB_APP_SECRET,
				grant_type: 'fb_exchange_token',
				fb_exchange_token: this.accessToken
			});
			return (newAccessToken);
		}
		catch (err) {
			console.log(err);
			return;
		}
	}

	async setAccessToken(long_lived_token, user_id) {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		//Create facebook object linked to service with accessToken
		//If facebook already exist
		let newAccessToken = await FB.api('oauth/access_token', {
			client_id: '608250742962709',
			client_secret: process.env.FB_APP_SECRET,
			grant_type: 'fb_exchange_token',
			fb_exchange_token: long_lived_token
		});
		if (!service.facebook) {
			let newFacebook = new FacebookModal({
				accessToken : newAccessToken.access_token,
				eventToEmail : false,
				eventToTwitter : false,
				eventToCalendar : false,
				photosToEmail : false,
				statusToEmail : false,
				friendsToEmail : false,
				workToEmail : false,
				locationToEmail : false,
				hometownToEmail : false,
				educationToEmail : false,
				religionToEmail : false,
				user_id : user_id
			})

			await newFacebook.save();
			await Service.updateOne({"_id" : user.services}, { $set : {facebook : newFacebook._id}})
		}
		else {
			await FacebookModal.updateOne({"_id" : service.facebook}, { $set : {accessToken : newAccessToken.access_token, user_id : user_id}})
		}
		this.accessToken = newAccessToken.access_token;
		return;
	}

	async getMe() {
		try {
			FB.setAccessToken(this.accessToken);
			let facebookResponse = await FB.api('me?fields=id,name,email,picture', 'GET', {});
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

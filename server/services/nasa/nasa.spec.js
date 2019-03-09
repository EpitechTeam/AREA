let NasaModal	= require('./../../models/Nasa')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
let OutlookSpec = require('../outlook/outlook.spec')
let request			= require('request');

class Nasa {
	constructor(token) {
		this.token = token
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let nasa_user = await NasaModal.findOne({"_id" : service.nasa})

		await NasaModal.updateOne({"_id" : service.nasa}, { $set : {isConnected : false}})
		return;
	}

  async	checkIfAlreadyDone(today) {
    let user = await User.findOne({token : this.token})
    let services = await Service.findOne({"_id" : user.services})
    var nasa = await NasaModal.findOne({"_id" : services.nasa})

    let indexOf = nasa.done.indexOf(today)
    if (indexOf == -1) {
      return (false)
    }
    else {
      return (true)
    }
  }

  async addToday(today) {
    let user = await User.findOne({token : this.token})
    let services = await Service.findOne({"_id" : user.services})
    var nasa = await NasaModal.findOne({"_id" : services.nasa})

    nasa.done.push(today)
    await NasaModal.updateOne({"_id" : services.nasa}, { $set : {done : nasa.done}})
  }

  async handleNasaCards() {
    let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let nasa_user = await NasaModal.findOne({"_id" : service.nasa})

    Date.prototype.yyyymmdd = function() {
			var mm = this.getMonth() + 1;
			var dd = this.getDate();

			return [this.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
			].join('-');
		};

		let date = new Date()
    if (await this.checkIfAlreadyDone(date.yyyymmdd()) == false) {
      if (nasa_user.apodToEmail) {
        await this.requestNasaApod()
        await this.addToday(date.yyyymmdd())
      }
		}
  }

  async requestNasaApod() {
    let options = {
      url : 'https://api.nasa.gov/planetary/apod?api_key=RfhsBh5Hw5rLX2LEpDQvfSaPVAWFFDigusmbOtw6',
      method : 'GET'
    }

    var __self = this
    request(options, function(err, reponse, body) {
      __self.handleApod(body)
      return;
    })
  }

  async handleApod(body) {
    let json = JSON.parse(body)
    let mail = ''
    mail += '<h2>' + json.title + '</h2>';
    mail += '<p>' + json.explanation + '</p>'
    mail += '<img src=\"' + json.hdurl + '\"/>'
    mail += '<br>'

    let newOutlook = new OutlookSpec.Outlook(this.token);
    await newOutlook.sendEmail("Your Nasa news", mail, true);
  }

  async isConnected() {
    let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    if (!service.nasa) {
      return (false)
    }
    if (service.nasa) {
      let nasa_user = await NasaModal.findOne({"_id" : service.nasa})
      if (nasa_user.isConnected == true) {
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

  async addApodToEmail() {
    var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    await NasaModal.updateOne({"_id" : service.nasa}, { $set : {apodToEmail : true}})
  }

  async removeApodToEmail() {
    var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    await NasaModal.updateOne({"_id" : service.nasa}, { $set : {apodToEmail : false}})
  }

	async setAccessToken() {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (!service.nasa) {
			let newNasa = new NasaModal({
				isConnected : true,
        done : [],
        apodToEmail : false
			})

			await newNasa.save();
			await Service.updateOne({"_id" : user.services}, { $set : {nasa : newNasa._id}})
		}
		else {
			await NasaModal.updateOne({"_id" : service.nasa}, { $set : {isConnected : true}})
		}
		return;

	}

	async getMyOption() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let	nasa_user = await NasaModal.findOne({"_id" : service.nasa})
		return nasa_user
	}
}

module.exports = {
	Nasa
}

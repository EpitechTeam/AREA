let LemondeModal	= require('./../../models/Lemonde')
let Service	= require('./../../models/Services')
let User	= require('./../../models/User')
let OutlookSpec = require('../outlook/outlook.spec')
let request			= require('request');
var convert = require('xml-js');

class Lemonde {
	constructor(token) {
		this.token = token
	}

	async logout() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let lemonde_user = await LemondeModal.findOne({"_id" : service.lemonde})

		await LemondeModal.updateOne({"_id" : service.lemonde}, { $set : {isConnected : false}})
		return;
	}

  async	checkIfAlreadyDone(today) {
    let user = await User.findOne({token : this.token})
    let services = await Service.findOne({"_id" : user.services})
    var lemonde = await LemondeModal.findOne({"_id" : services.lemonde})

    let indexOf = lemonde.done.indexOf(today)
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
    var lemonde = await LemondeModal.findOne({"_id" : services.lemonde})

    lemonde.done.push(today)
    await LemondeModal.updateOne({"_id" : services.lemonde}, { $set : {done : lemonde.done}})
  }

  async handleLemondeCards() {
    let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let lemonde_user = await LemondeModal.findOne({"_id" : service.lemonde})

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
      if (lemonde_user.newToEmail) {
        await this.requestLemonde()
        await this.addToday(date.yyyymmdd())
      }
		}
  }

  async requestLemonde() {
    let options = {
      url : 'https://www.lemonde.fr/rss/une.xml',
      method : 'GET'
    }

    var __self = this
    request(options, function(err, reponse, body) {
      __self.handleNews(body)
      return;
    })
  }

  async handleNews(body) {
    var result1 = await convert.xml2json(body, {compact: true, spaces: 4});
    let json = JSON.parse(result1)
    let mail = ''
    for (let item of json.rss.channel.item) {
      mail += '<h2>' + item.title._text+ '</h2>';
      mail += '<p>' + item.description._text + '</p>'
      mail += '<a href=\"' + item.link._text+ '\">Lien vers l\'article sur lemonde</a>'
      mail += '<br>'
    }
    let newOutlook = new OutlookSpec.Outlook(this.token);
    await newOutlook.sendEmail("Your news", mail, true);
  }

  async isConnected() {
    let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    if (!service.lemonde) {
      return (false)
    }
    if (service.lemonde) {
      let lemonde_user = await LemondeModal.findOne({"_id" : service.lemonde})
      if (lemonde_user.isConnected == true) {
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

  async addNewsToEmail() {
    var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    await LemondeModal.updateOne({"_id" : service.lemonde}, { $set : {newToEmail : true}})
  }

  async removeNewsToEmail() {
    var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

    await LemondeModal.updateOne({"_id" : service.lemonde}, { $set : {newToEmail : false}})
  }

	async setAccessToken() {
		var user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})

		if (!service.lemonde) {
			let newLemonde = new LemondeModal({
				isConnected : true,
        done : [],
        newToEmail : false
			})

			await newLemonde.save();
			await Service.updateOne({"_id" : user.services}, { $set : {lemonde : newLemonde._id}})
		}
		else {
			await LemondeModal.updateOne({"_id" : service.lemonde}, { $set : {isConnected : true}})
		}
		return;

	}

	async getMyOption() {
		let user = await User.findOne({token : this.token})
		let service = await Service.findOne({"_id" : user.services})
		let	lemonde_user = await LemondeModal.findOne({"_id" : service.lemonde})
		return lemonde_user
	}
}

module.exports = {
	Lemonde
}

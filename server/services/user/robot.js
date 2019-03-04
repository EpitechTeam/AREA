let Facebook	= require('./../../models/Facebook')
let Calendar	= require('./../../models/Calendar')
var Intra = require('./../../models/intra')
let Meteo	= require('./../../models/Meteo')
let One_drive	= require('./../../models/One-drive')
let Outlook	= require('./../../models/Outlook')
var Twitter = require('./../../models/Twitter')
let User	= require('./../../models/User')
let Service	= require('./../../models/Services')
let OutlookSpec = require('../outlook/outlook.spec')
let CalendarSpec = require('../calendar/calendar.spec')
let TwitterSpec = require('../twitter/twitter.spec')
let IntraSpec = require('./../intra/intra.spec');
let MeteoSpec = require('./../meteo/meteo.spec');

class Robot {
  constructor() {

  }

  async refreshAllUser() {
    console.log("Refresh");
    let all_user = await User.find({})

    // console.log(all_user)
    for (let user of all_user) {
      let service = await Service.findOne({"_id" : user.services})

      if (service.intra) {
        let newIntra = new IntraSpec.Intra(user.token)
        await newIntra.handleIntraCards()
      }
      if (service.meteo) {
        let newMeteo = new MeteoSpec.Meteo(user.token)
        await newMeteo.handleMeteoCards()
      }

    }
  }
}

module.exports = {
	Robot
}

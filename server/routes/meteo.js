let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let meteoService = require('../services/meteo/meteo.service')

router.post('/addMeteoConnection', meteoService.addMeteoConnection)

router.put('/addMeteoToEmail', meteoService.addMeteoToEmail)

router.put('/addMeteoToCalendar', meteoService.addMeteoToTwitter)

router.put('/addMeteoToTwitter', meteoService.addMeteoToCalendar)

module.exports = router

let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let meteoService = require('../services/meteo/meteo.service')

router.post('/addMeteoConnection', ensureAuthorized, meteoService.addMeteoConnection)

router.put('/addMeteoToEmail', ensureAuthorized, meteoService.addMeteoToEmail)

router.put('/addMeteoToCalendar', ensureAuthorized, meteoService.addMeteoToTwitter)

router.put('/addMeteoToTwitter', ensureAuthorized, meteoService.addMeteoToCalendar)

module.exports = router

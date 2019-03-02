let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let meteoService = require('../services/meteo/meteo.service')

router.post('/addMeteoConnection', ensureAuthorized, meteoService.addMeteoConnection)

router.put('/addMeteoToEmail', ensureAuthorized, meteoService.addMeteoToEmail)

router.put('/addMeteoToCalendar', ensureAuthorized, meteoService.addMeteoToTwitter)

router.put('/addMeteoToTwitter', ensureAuthorized, meteoService.addMeteoToCalendar)

router.put('/removeFromEmail', ensureAuthorized, meteoService.removeFromEmail)

router.put('/removeFromCalendar', ensureAuthorized, meteoService.removeFromTwitter)

router.put('/removeFromTwitter', ensureAuthorized, meteoService.removeFromCalendar)

router.get('/meteoOfUser', ensureAuthorized, meteoService.meteoOfUser)

router.get('/isConnected', ensureAuthorized, meteoService.isConnected)

router.get('/myOption', ensureAuthorized, meteoService.myOption)

module.exports = router

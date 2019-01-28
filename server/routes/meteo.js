let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let meteoService = require('../services/Meteo/meteo.service')

router.get('/addMeteoConnection', meteoService.addMeteoConnection)

module.exports = router

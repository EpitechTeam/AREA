let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let nasaService = require('../services/nasa/nasa.service')

router.get('/addNasaConnection', ensureAuthorized, nasaService.addNasaConnection)

router.get('/isConnected', ensureAuthorized, nasaService.isConnected)

router.get('/logout', ensureAuthorized, nasaService.logout)

router.get('/myOption', ensureAuthorized, nasaService.getMyOption)

router.put('/addApodToEmail', ensureAuthorized, nasaService.addApodToEmail)

router.put('/removeApodToEmail', ensureAuthorized, nasaService.removeApodToEmail)

router.get('/test', ensureAuthorized, nasaService.test)

module.exports = router

let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let instagramService = require('../services/instagram/instagram.service')

router.get('/addInstagramConnection', instagramService.addInstagramConnection)

module.exports = router

let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let twitterService = require('../services/twitter/twitter.service')

router.get('/addTwitterConnection', twitterService.addTwitterConnection)

module.exports = router

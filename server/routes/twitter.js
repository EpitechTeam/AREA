let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let twitterService = require('../services/twitter/twitter.service')

router.post('/addTwitterConnection', ensureAuthorized, twitterService.addTwitterConnection)

router.get('/twitterRequestToken', ensureAuthorized, twitterService.twitterRequestToken)

module.exports = router

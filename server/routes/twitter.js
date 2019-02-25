let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let twitterService = require('../services/twitter/twitter.service')

router.post('/addTwitterConnection', ensureAuthorized, twitterService.addTwitterConnection)

router.get('/twitterRequestToken', ensureAuthorized, twitterService.twitterRequestToken)

router.post('/accessTokenGenerate', ensureAuthorized, twitterService.accessTokenGenerate)

router.post('/tweet', ensureAuthorized, twitterService.tweetSomething)

router.get('/getConsumerKey', ensureAuthorized, twitterService.giveConsumerKey)

router.get('/logout', ensureAuthorized, twitterService.logout)

router.get('/getMe', ensureAuthorized, twitterService.getMe)

router.get('/isConnected', ensureAuthorized, twitterService.isConnected)

module.exports = router

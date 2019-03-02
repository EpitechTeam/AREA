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

router.post('/webhook', twitterService.webhook)

router.get('/webhook', twitterService.crc)

router.get('/create-webhook', ensureAuthorized, twitterService.createWebhook)

router.get('/addTweetByMail', ensureAuthorized, twitterService.addTweetByMail)

router.get('/removeTweetByMail', ensureAuthorized, twitterService.addTweetByMail)

router.get('/addStartFollowByMail', ensureAuthorized, twitterService.addStartFollowByMail)

router.get('/removeStartFollowByMail', ensureAuthorized, twitterService.removeStartFollowByMail)

router.get('/addGetFollowByMail', ensureAuthorized, twitterService.addGetFollowByMail)

router.get('/removeGetFollowByMail', ensureAuthorized, twitterService.removeGetFollowByMail)

router.get('/addGetUnfollowByMail', ensureAuthorized, twitterService.addGetUnfollowByMail)

router.get('/removeGetUnfollowByMail', ensureAuthorized, twitterService.removeGetUnfollowByMail)

router.get('/addStartFollowSendDirectMessage', ensureAuthorized, twitterService.addStartFollowSendDirectMessage)

router.get('/removeStartFollowSendDirectMessage', ensureAuthorized, twitterService.removeStartFollowSendDirectMessage)

module.exports = router

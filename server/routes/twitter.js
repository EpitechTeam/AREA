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

router.get('/myOption', ensureAuthorized, twitterService.myOption)

router.get('/isConnected', ensureAuthorized, twitterService.isConnected)

router.post('/webhook', twitterService.webhook)

router.get('/webhook', twitterService.crc)

router.get('/create-webhook', ensureAuthorized, twitterService.createWebhook)

router.put('/addTweetByMail', ensureAuthorized, twitterService.addTweetByMail)

router.put('/removeTweetByMail', ensureAuthorized, twitterService.addTweetByMail)

router.put('/addStartFollowByMail', ensureAuthorized, twitterService.addStartFollowByMail)

router.put('/removeStartFollowByMail', ensureAuthorized, twitterService.removeStartFollowByMail)

router.put('/addGetFollowByMail', ensureAuthorized, twitterService.addGetFollowByMail)

router.put('/removeGetFollowByMail', ensureAuthorized, twitterService.removeGetFollowByMail)

router.put('/addGetUnfollowByMail', ensureAuthorized, twitterService.addGetUnfollowByMail)

router.put('/removeGetUnfollowByMail', ensureAuthorized, twitterService.removeGetUnfollowByMail)

router.put('/addStartFollowSendDirectMessage', ensureAuthorized, twitterService.addStartFollowSendDirectMessage)

router.put('/removeStartFollowSendDirectMessage', ensureAuthorized, twitterService.removeStartFollowSendDirectMessage)

module.exports = router

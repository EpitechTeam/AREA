let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let facebookService = require('../services/facebook/facebook.service')

router.post('/addFacebookConnection', ensureAuthorized, facebookService.addFacebookConnection)

router.get('/getMe', ensureAuthorized, facebookService.getMe)

router.get('/extendToken', ensureAuthorized, facebookService.extendToken)

router.get('/transferPicture', ensureAuthorized, facebookService.transferPicture)

router.put('/changeAccessToken', ensureAuthorized, facebookService.changeAccessToken)

router.put('/addEventToTwitter', ensureAuthorized, facebookService.addEventToTwitter)

router.put('/addEventToEmail', ensureAuthorized, facebookService.addEventToEmail)

router.put('/addEventToCalendar', ensureAuthorized, facebookService.addEventToCalendar)

router.put('/addPhotosToEmail', ensureAuthorized, facebookService.addPhotosToEmail)

router.put('/addStatusToEmail', ensureAuthorized, facebookService.addStatusToEmail)

router.put('/addPhotosToTwitter', ensureAuthorized, facebookService.addPhotosToTwitter)

router.put('/addStatusToTwitter', ensureAuthorized, facebookService.addStatusToTwitter)

router.put('/addFriendsToEmail', ensureAuthorized, facebookService.addFriendsToEmail)

router.put('/addWorkToEmail', ensureAuthorized, facebookService.addWorkToEmail)

router.put('/addLocationToEmail', ensureAuthorized, facebookService.addLocationToEmail)

router.put('/addHometownToEmail', ensureAuthorized, facebookService.addHometownToEmail)

router.put('/addEducationToEmail', ensureAuthorized, facebookService.addEducationToEmail)

router.put('/addReligionToEmail', ensureAuthorized, facebookService.addReligionToEmail)

router.put('/removeReligionToEmail', ensureAuthorized, facebookService.removeReligionToEmail)

router.put('/removeEducationToEmail', ensureAuthorized, facebookService.removeEducationToEmail)

router.put('/removeHometownToEmail', ensureAuthorized, facebookService.removeHometownToEmail)

router.put('/removeLocationToEmail', ensureAuthorized, facebookService.removeLocationToEmail)

router.put('/removeWorkToEmail', ensureAuthorized, facebookService.removeWorkToEmail)

router.put('/removeFriendsToEmail', ensureAuthorized, facebookService.removeFriendsToEmail)

router.put('/removePhotosToEmail', ensureAuthorized, facebookService.removePhotosToEmail)

router.put('/removeStatusToEmail', ensureAuthorized, facebookService.removeStatusToEmail)

router.put('/removeStatusToTwitter', ensureAuthorized, facebookService.removeStatusToTwitter)

router.put('/removePhotosToTwitter', ensureAuthorized, facebookService.removePhotosToTwitter)

router.put('/removeEventToEmail', ensureAuthorized, facebookService.removeEventFromEmail)

router.put('/removeEventToTwitter', ensureAuthorized, facebookService.removeEventFromTwitter)

router.put('/removeEventToCalendar', ensureAuthorized, facebookService.removeEventFromCalendar)

router.get('/isConnected', ensureAuthorized, facebookService.isConnected)

router.get('/myOption', ensureAuthorized, facebookService.getMyOption)

router.get('/logout', ensureAuthorized, facebookService.logout)

router.get('/webhook', facebookService.verifyWebhook)

router.post('/webhook', facebookService.webhook)
/*isConntected*/

module.exports = router

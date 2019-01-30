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

router.put('/removeEventFromEmail', ensureAuthorized, facebookService.removeEventFromEmail)

router.put('/removeEventFromTwitter', ensureAuthorized, facebookService.removeEventFromTwitter)

router.put('/removeEventFromCalendar', ensureAuthorized, facebookService.removeEventFromCalendar)

router.get('/isConnected', ensureAuthorized, facebookService.isConnected)
/*isConntected*/

module.exports = router

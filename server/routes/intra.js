let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let intraService = require('../services/intra/intra.service')

router.post('/addIntraConnection', ensureAuthorized, intraService.addIntraConnection)

router.get('/getMe', ensureAuthorized, intraService.getMe)

router.get('/isConnected', ensureAuthorized, intraService.isConnected)

router.get('/myOption', ensureAuthorized, intraService.myOption)

router.get('/logout', ensureAuthorized, intraService.logout)

router.get('/test', ensureAuthorized, intraService.test)

router.put('/addGPAChangeByMail', ensureAuthorized, intraService.addGPAChangeByMail)

router.put('/removeGPAChangeByMail', ensureAuthorized, intraService.removeGPAChangeByMail)

router.put('/addMessageNotificationByMail', ensureAuthorized, intraService.addMessageNotificationByMail)

router.put('/removeMessageNotificationByMail', ensureAuthorized, intraService.removeMessageNotificationByMail)

router.put('/addActivityByMail', ensureAuthorized, intraService.addActivityByMail)

router.put('/removeActivityByMail', ensureAuthorized, intraService.removeActivityByMail)

router.put('/addActivityToCalendar', ensureAuthorized, intraService.addActivityToCalendar)

router.put('/removeActivityToCalendar', ensureAuthorized, intraService.removeActivityToCalendar)

module.exports = router

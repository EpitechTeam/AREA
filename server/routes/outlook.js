let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let outlookService = require('../services/outlook/outlook.service')

router.put('/addFileToOne_drive', ensureAuthorized, outlookService.addFileToOne_drive)

router.get('/myOption', ensureAuthorized, outlookService.getMyOption)

router.get('/getMe', ensureAuthorized, outlookService.getMe)

router.get('/isConnected', ensureAuthorized, outlookService.isConnected)

router.get('/logout', ensureAuthorized, outlookService.logout)

module.exports = router

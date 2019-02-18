let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let outlookService = require('../services/outlook/outlook.service')

router.post('/addOutlookConnection', ensureAuthorized, outlookService.addOutlookConnection)

router.put('/addFileToOne_drive', ensureAuthorized, outlookService.addFileToOne_drive)

router.get('/myOpion', ensureAuthorized, outlookService.getMyOption)

module.exports = router

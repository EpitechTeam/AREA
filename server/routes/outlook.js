let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let outlookService = require('../services/outlook/outlook.service')

router.post('/addOutlookConnection', outlookService.addOutlookConnection)

module.exports = router

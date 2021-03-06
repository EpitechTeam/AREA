let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let office365Service = require('../services/office365.service')

router.post('/office365', ensureAuthorized, office365Service.office365Connection)

router.get('/logout', ensureAuthorized, office365Service.logout)

router.post('/webhook', office365Service.webhook)

module.exports = router

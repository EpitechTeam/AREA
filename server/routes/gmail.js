let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let gmailService = require('../services/gmail/gmail.service')

router.get('/addGmailConnection', gmailService.addGmailConnection)

module.exports = router

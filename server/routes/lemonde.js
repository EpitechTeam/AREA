let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let lemondeService = require('../services/lemonde/lemonde.service')

router.get('/addLemondeConnection', ensureAuthorized, lemondeService.addLemondeConnection)

router.get('/isConnected', ensureAuthorized, lemondeService.isConnected)

router.get('/logout', ensureAuthorized, lemondeService.logout)

router.get('/myOption', ensureAuthorized, lemondeService.getMyOption)

router.put('/addNewsToEmail', ensureAuthorized, lemondeService.addNewsToEmail)

router.put('/removeNewsToEmail', ensureAuthorized, lemondeService.removeNewsToEmail)

router.get('/test', ensureAuthorized, lemondeService.test)

module.exports = router

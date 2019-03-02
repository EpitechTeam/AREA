let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let intraService = require('../services/intra/intra.service')

router.post('/addIntraConnection', ensureAuthorized, intraService.addIntraConnection)

router.get('/getMe', ensureAuthorized, intraService.getMe)

router.get('/isConnected', ensureAuthorized, intraService.isConnected)

router.get('/logout', ensureAuthorized, intraService.logout)

module.exports = router

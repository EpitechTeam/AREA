let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let intraService = require('../services/intra/intra.service')

router.post('/addIntraConnection', intraService.addIntraConnection)

module.exports = router

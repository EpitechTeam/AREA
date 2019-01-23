let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let intraService = require('../services/intra/intra.service')

router.get('/addIntraConnection', intraService.addIntraConnection)

module.exports = router

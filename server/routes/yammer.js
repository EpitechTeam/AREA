let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let yammerService = require('../services/yammer/yammer.service')

router.get('/addYammerConnection', yammerService.addYammerConnection)

module.exports = router

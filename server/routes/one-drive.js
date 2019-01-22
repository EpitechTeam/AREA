let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let one_driveService = require('../services/one-drive/one-drive.service')

router.get('/addOne-driveConnection', one_driveService.addOne_driveConnection)

module.exports = router

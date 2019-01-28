let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let facebookService = require('../services/facebook/facebook.service')

router.post('/addFacebookConnection', ensureAuthorized, facebookService.addFacebookConnection)

router.get('/getMe', ensureAuthorized, facebookService.getMe)

router.get('/extendToken', ensureAuthorized, facebookService.extendToken)

router.get('/transferPicture', ensureAuthorized, facebookService.transferPicture)

router.put('/changeAccessToken', ensureAuthorized, facebookService.changeAccessToken)

/*isConntected*/

module.exports = router

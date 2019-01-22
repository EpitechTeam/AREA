let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let userService = require('../services/user/user.service')

router.get('/me', ensureAuthorized, userService.me)

router.post('/login', userService.login)

router.post('/register', userService.register)

module.exports = router

let express	= require("express")
let router	= express.Router()
let ensureAuthorized 	= require("./../middlewares/ensureAuthorized")

let calendarService = require('../services/calendar/calendar.service')

router.get('/addCalendarConnection', calendarService.addCalendarConnection)

module.exports = router

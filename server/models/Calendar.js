var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CalendarSchema   = mongoose.Schema({
	accessToken : String
});

var Calendar = module.exports = mongoose.model('Calendar', CalendarSchema);

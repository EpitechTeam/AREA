var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MeteoSchema   = mongoose.Schema({
	accessToken : String,
	done : Array,

	city : String,
	insee : String,
	toEmail : Boolean,
	toCalendar : Boolean,
	toTwitter : Boolean
});

var Meteo = module.exports = mongoose.model('Meteo', MeteoSchema);

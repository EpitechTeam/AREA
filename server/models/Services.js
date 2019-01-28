var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ServiceSchema   = mongoose.Schema({
	facebook : String,
	meteo : String,
	twitter : String,

	/*Office 365*/
	outlook : String,
	intra : String,
	calendar : String,
	one_drive : String
});

var Service = module.exports = mongoose.model('Service', ServiceSchema);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ServiceSchema   = mongoose.Schema({
	facebook : String,
	meteo : String,
	twitter : String,
	intra : String,

	/*Office 365*/
	outlook : String,
	calendar : String,
	one_drive : String,
	lemonde : String
});

var Service = module.exports = mongoose.model('Service', ServiceSchema);

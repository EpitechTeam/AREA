var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IntraSchema   = mongoose.Schema({
	accessToken : String,
	notesToEmail : Boolean,
	notesToOneDrive : Boolean,
	notificationToEmail : Boolean,
});

var Intra = module.exports = mongoose.model('Intra', IntraSchema);

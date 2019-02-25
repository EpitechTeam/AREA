var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OutlookSchema   = mongoose.Schema({
	accessToken : String,
	fileToOneDrive : Boolean,
	subscriptionId : String
});

var Outlook = module.exports = mongoose.model('Outlook', OutlookSchema);

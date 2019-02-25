var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FacebookSchema   = mongoose.Schema({
	accessToken : String, /*Long lived token*/
	eventToTwitter : Boolean,
	eventToEmail : Boolean,
	eventToCalendar : Boolean,
	photosToEmail : Boolean,
	photosToTwitter : Boolean,
	statusToEmail : Boolean,
	statusToTwitter : Boolean,
	friendsToEmail : Boolean,
	workToEmail : Boolean,
	locationToEmail : Boolean,
	hometownToEmail : Boolean,
	educationToEmail : Boolean,
	religionToEmail : Boolean,

	eventToTwitterInfo : Object,
	eventToEmailInfo : Object,
	eventToCalendarInfo : Object,
	photosToEmailInfo : Object,
	photosToTwitterInfo : Object,
	statusToEmailInfo : Object,
	statusToTwitterInfo : Object,
	friendsToEmailInfo : Object,
	workToEmailInfo : Object,
	locationToEmailInfo : Object,
	hometownToEmailInfo : Object,
	educationToEmailInfo : Object,
	religionToEmailInfo : Object,
	
	user_id : String
});

var Facebook = module.exports = mongoose.model('Facebook', FacebookSchema);

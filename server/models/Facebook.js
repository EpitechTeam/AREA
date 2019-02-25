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

	eventToTwitterInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	eventToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	eventToCalendarInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	photosToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	photosToTwitterInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	statusToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	statusToTwitterInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	friendsToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	workToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	locationToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	hometownToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	educationToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},
	religionToEmailInfo : {
		id : Number,
		type : String,
		title : String,
		description : String,
		class : String
	},

	user_id : String
});

var Facebook = module.exports = mongoose.model('Facebook', FacebookSchema);

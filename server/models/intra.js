var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IntraSchema   = mongoose.Schema({
	accessToken : String,
	GPA_intra : Number,
	done : Array,

	GPAChange : Boolean,
	messageNotificationByMail : Boolean,
	activityToEmail : Boolean,
	activityToCalendar : Boolean
});

var Intra = module.exports = mongoose.model('Intra', IntraSchema);

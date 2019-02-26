var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TwitterSchema   = mongoose.Schema({
	token : String,
	token_secret : String,
	user_id : String,
	webhook_id : String,
	tweetByMail : Boolean,
	startFollowByMail : Boolean,
	getFollowByMail : Boolean,
	getUnfollowByMail : Boolean,
	startFollowSendDirectMessage : Boolean
});

var Twitter = module.exports = mongoose.model('Twitter', TwitterSchema);

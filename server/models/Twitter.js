var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TwitterSchema   = mongoose.Schema({
	consumer_key : String,
	consuemer_secret : String,
	bearer_token : String
});

var Twitter = module.exports = mongoose.model('Twitter', TwitterSchema);

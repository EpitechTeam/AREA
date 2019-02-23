var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TwitterSchema   = mongoose.Schema({
	token : String,
	token_secret : String
});

var Twitter = module.exports = mongoose.model('Twitter', TwitterSchema);

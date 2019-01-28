var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = mongoose.Schema({
		first_name: String,
		last_name: String,
		email: String,
		password: String,
		token : String,
		services : String
});

var User = module.exports = mongoose.model('User', UserSchema);

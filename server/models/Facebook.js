var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FacebookSchema   = mongoose.Schema({
	accessToken : String, /*Long lived token*/
	actionTag : Boolean,
	transferPicture : Boolean,
});

var Facebook = module.exports = mongoose.model('Facebook', FacebookSchema);

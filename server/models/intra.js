var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IntraSchema   = mongoose.Schema({
	accessToken : String
});

var Intra = module.exports = mongoose.model('Intra', IntraSchema);

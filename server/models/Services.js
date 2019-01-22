var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ServiceSchema   = mongoose.Schema({
	facebook : String
});

var Service = module.exports = mongoose.model('Service', ServiceSchema);

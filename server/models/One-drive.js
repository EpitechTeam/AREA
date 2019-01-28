var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var One_driveSchema   = mongoose.Schema({
	accessToken : String
});

var One_drive = module.exports = mongoose.model('One_drive', One_driveSchema);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OutlookSchema   = mongoose.Schema({
});

var Outlook = module.exports = mongoose.model('Outlook', OutlookSchema);

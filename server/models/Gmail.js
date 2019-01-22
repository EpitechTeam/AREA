var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GmailSchema   = mongoose.Schema({
});

var Gmail = module.exports = mongoose.model('Gmail', GmailSchema);

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var YammerSchema   = mongoose.Schema({
});

var Yammer = module.exports = mongoose.model('Yammer', YammerSchema);

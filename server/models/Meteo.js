var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MeteoSchema   = mongoose.Schema({
});

var Meteo = module.exports = mongoose.model('Meteo', MeteoSchema);

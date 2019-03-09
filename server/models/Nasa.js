var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NasaSchema   = mongoose.Schema({
	done : Array,
  isConnected : Boolean,

  apodToEmail : Boolean
});

var Nasa = module.exports = mongoose.model('Nasa', NasaSchema);

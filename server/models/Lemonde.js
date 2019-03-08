var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LemondeSchema   = mongoose.Schema({
	done : Array,
  isConnected : Boolean,

  newToEmail : Boolean
});

var Lemonde = module.exports = mongoose.model('Lemonde', LemondeSchema);

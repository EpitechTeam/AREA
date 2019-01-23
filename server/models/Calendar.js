var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CalendarSchema   = mongoose.Schema({
});

var Calendar = module.exports = mongoose.model('Calendar', CalendarSchema);

var mongoose = require('mongoose');

var doc = mongoose.Schema({
    title: String
});
mongoose.model('Document', doc);

exports.Document = function (db) {
    return db.model('Document');
};

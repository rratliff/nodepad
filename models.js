var mongoose = require('mongoose');

var doc = mongoose.Schema({
    title: {type: String, index: true },
    tag: [String],
    data: String
});
mongoose.model('Document', doc);

exports.Document = function (db) {
    return db.model('Document');
};

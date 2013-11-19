
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var mongoose = require('mongoose');
var db;

var Document;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.configure('test', function () {
    app.use(express.errorHandler({ dumpexceptions: true, showStack: true}));
    db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.configure('development', function () {
    db = mongoose.connect('mongodb://localhost/nodepad');
});

app.document = Document = require('./models.js').Document(db);

app.get('/', routes.index);
app.get('/users', user.list);

// List
// :format can be json or html
app.get('/documents.:format', function (req, res) {
    Document.find(function (err, documents) {
        switch (req.params.format) {
        // When json, generate suitable data
        case 'json':
            res.send(documents.map(function (d) {
                return d.__doc;
            }));
            break;

            // Else render a database template (this isn't ready yet)
        default:
            res.render('documents/index.jade');
        }
    });
});

// Create
app.post('/documents.:format?', function (req, res) {
    var document = new Document(req.body.document);
    document.save(function (err) {
        if (err) {
            throw err;
        }
        switch (req.params.format) {
        case 'json':
            res.set('Content-Type', 'application/json');
            res.send(document);
            break;
        default:
            res.redirect('/documents');
        }
    });
});

// Read
app.get('/documents/:id.:format?', function (req, res) {
});

// Update
app.put('/documents/:id.:format?', function (req, res) {
});

// Delete
app.del('/documents/:id.:format?', function (req, res) {
});

if (!module.parent) {
    app.listen(3000);
    console.log('Express server listening on port ' + app.get('port'));
}

module.exports = app;

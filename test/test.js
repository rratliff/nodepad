// Force test environment
process.env.NODE_ENV = 'test';

var app = require('../app'),
    request = require('supertest'),
    should = require('should'),
    lastID = '';

describe('GET /documents.json', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/documents.json')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /', function () {
    it('redirects to the list of documents', function (done) {
        request(app)
            .get('/')
            .expect('Location', '/documents')
            .expect(302, done);
    });
});

describe('POST /documents.json', function () {
    it('responds with the same document', function (done) {
        request(app)
            .post('/documents.json')
            .send({ document: { title: 'Test' } })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                var document = JSON.parse(res.text);
                document.title.should.equal('Test');
                done();
            });
    });
});

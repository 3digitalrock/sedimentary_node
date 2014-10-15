var request = require('supertest');

describe('GET /', function(){
    var app = require('../server');
    beforeEach(function(){
        app.listen(3333);
    });
    it('respond successfully', function(done){
        request(app).get('/').expect(200, done);
    });
});
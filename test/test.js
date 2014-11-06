var request = require('supertest');

describe('GET /', function(){
    var app = require('../server');
    beforeEach(function(){
        app.listen(3333);
    });
    it('should respond successfully', function(done){
        request(app).get('/contact').expect(200, done);
    });
});
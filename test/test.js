var request = require('supertest')('http://localhost:3002');

describe('GET /', function(){
    it('respond successfully', function(done){
        request.get('/').expect(200, done);
    });
});
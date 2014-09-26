var apiClient = require('./api_client');

module.exports.login = function(req, res) {
    if(req.query.token){
        apiClient.arValidate(req.query.token, function(data, status){
            if(status===200){
                res.status(200).end();
            }
        });
    } else {
        res.render('login', {atLogin: true, pageTitle: 'Login'});
    }
};

module.exports.register = function(req, res) {
    res.render('register', {atRegister: true, pageTitle: 'Create New Account'});
};
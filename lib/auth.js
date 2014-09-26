module.exports.login = function(req, res) {
    res.render('login', {atLogin: true, pageTitle: 'Login'});
};

module.exports.register = function(req, res) {
    res.render('register', {atRegister: true, pageTitle: 'Create New Account'});
};
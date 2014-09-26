module.exports.login = function(req, res) {
    res.render('login', {atLogin: true, pageTitle: 'Login'});
};
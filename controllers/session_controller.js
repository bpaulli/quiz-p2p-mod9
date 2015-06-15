exports.autologout = function(req, res, next){
    if (req.session.user) {
        var horaactual = new Date();
        var horaactualSinMin = new Date();
        horaactualSinMin.setMinutes(0);
        horaactualSinMin.setSeconds(0);
        horaactualSinMin.setMilliseconds(0);

        var timestamp = new Date(req.session.user.timestamp);        
        var timestampSinMin = new Date(req.session.user.timestamp);
        timestampSinMin.setMinutes(0);
        timestampSinMin.setSeconds(0);
        timestampSinMin.setMilliseconds(0);
        
        if (horaactualSinMin.toDateString() === timestampSinMin.toDateString() && horaactual.getMinutes() < timestamp.getMinutes() + 2) {
            req.session.timestamp = new Date(); // actualizo la sesion
            next();
        } else {
            console.log('--- Auto Logout ---');
            delete req.session.user;
            res.redirect(req.session.redir.toString());
        }
    } else {
        next();
    }
};

exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.newsession = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");        
            return;
        }

        req.session.user = {id: user.id, username: user.username, timestamp: new Date()};

        res.redirect(req.session.redir.toString());
    });
};

exports.destroysession = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};
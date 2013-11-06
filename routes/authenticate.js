var tescoRequest = require('./lib/services/tescoRequest')

exports.login = function(req, res){
    console.log("/login User"+JSON.stringify(req.user));

    tescoRequest(function(authenticatedUser){
        console.log("tescoLoginRequest returned:");
        res.render('index',{title:app.get('name'),user: {name:authenticatedUser.name}
    });
};
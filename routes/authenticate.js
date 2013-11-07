var application = require('../package.json');
var tescoAuthentication = require('../lib/services/tescoAuthentication');

exports.login = function(req, res){
    console.log("/login User"+JSON.stringify(req.user));

    tescoAuthentication(function(authenticatedUser){
    	addUserToSession(req.session,authenticatedUser)
    	res.redirect("/");
    });
};

function addUserToSession(session,authenticatedUser){
	if(!session.user){
		session.user = authenticatedUser;
		console.log("Adding user to session")
	}
};
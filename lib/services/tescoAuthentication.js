var secrets = require('../../secrets.json');
var tescoApiRequest = require('./tescoApiRequest');

module.exports = function login(onLoggedIn){
    var developerKey = '&developerkey='+secrets.api.developerKey+'&applicationkey='+secrets.api.applicationKey
    var loginCommand = '&email=&password='+developerKey;

    var tescoRequest = {
        hostname:'secure.techfortesco.com',
        path:'/groceryapi/restservice.aspx?command=LOGIN',
        command:loginCommand
    };

    tescoApiRequest(tescoRequest,function(data){
        console.log('Received Authentication data:'+data);
        var dataAsJson = JSON.parse(data);

        var tescoUser = {
            name:dataAsJson.CustomerName,
            sessionKey:dataAsJson.SessionKey
        };

        onLoggedIn(tescoUser);
    });
};
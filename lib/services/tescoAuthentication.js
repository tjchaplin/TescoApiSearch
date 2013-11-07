var tescoApiRequest = require('./tescoRequest');

module.exports = function login(onLoggedIn){
    var developerKey = '&developerkey=&applicationkey='
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
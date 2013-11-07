var https = require('https');

module.exports = function tescoApiRequest(tescoRequest,next){
        var tescoLoginRequest = {
            hostname:tescoRequest.hostname,
            path:tescoRequest.path+tescoRequest.command,
            method:'GET'
        }
        console.log("TescoApiRequest:"+tescoLoginRequest.path);

        var req = https.request(tescoLoginRequest, function(res){
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            var data = '';
            res.on('data', function(chunkedData) {
                data += chunkedData
            });

            res.on('end',function(){
                next(data);
            });
        });
        req.end();


        req.on('error', function(e) {
            console.error(e);
        });
};
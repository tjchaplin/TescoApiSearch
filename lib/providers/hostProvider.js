var os = require("os");

var port = module.exports.port = function(){
	return 3002;
};

var server = module.exports.server = function(){
	return os.hostname();
};

var url = module.exports.url = function(){
	return "http://"+server()+":"+port();
};
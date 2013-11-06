/*
 * GET home page.
*/

var tescoProductDataFactory = require('./lib/factories/TescoProductDataFactory')

exports.index = function(req, res){
	var tescoUser = {name:null};
    console.log("/ User"+JSON.stringify(tescoUser));
    response.render('index',{title:app.get('name'),user: {name: tescoUser.name}});
};

exports.search = function(req, res){
	console.log("search User"+JSON.stringify(tescoUser));

	var search = request.query["searchString"];
	if(search.indexOf(' ') >0)
	    search ="+"+search.replace(/ /g,'+');

	tescoProductSearchRequest(search,function(data){
	    var searchView = getProductSearchView(JSON.parse(data));
	    console.log("SearchView:"+JSON.stringify(searchView));
	    response.render('productSearch', {title:app.get('name'),user: request.user,productSearchResults:searchView});
	});
};
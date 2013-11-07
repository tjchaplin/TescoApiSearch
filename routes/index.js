var application = require('../package.json');
var productSearchRequest = require('../lib/services/productSearch');
var getProductSearchView = require('../lib/factories/TescoProductDataFactory');

exports.index = function(req, res){
	if(!req.session.user)
		return res.redirect("/login");

    res.render('search',{title:application.name,user: req.session.user});
};

exports.productSearch = function(req, res){
	if(!req.session.user)
		return res.redirect("/login");

	var searchQuery = req.query["searchString"];

	productSearchRequest(req.session.user,searchQuery,function(data){
	    var searchView = getProductSearchView(JSON.parse(data));
	    console.log("SearchView:"+JSON.stringify(searchView));
	    res.render('search', {title:application.name,user: req.session.user,productSearchResults:searchView});
	});
};
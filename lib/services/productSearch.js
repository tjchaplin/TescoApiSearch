var tescoApiRequest = require('./tescoRequest')

module.exports = function productSearchRequest(user,query,onSearched){

        query = formatSearchQuery(query);

        var sessionKey = '&sessionKey='+user.sessionKey;
        var searchCommand = '&searchText='+query+'&page=1'+sessionKey;

        console.log("Search Command:"+searchCommand);

        var tescoRequest = {
            hostname:'secure.techfortesco.com',
            path:'/groceryapi/restservice.aspx?command=PRODUCTSEARCH',
            command:searchCommand
        };

        tescoApiRequest(tescoRequest,function(data){
            onSearched(data);
        });
};

function formatSearchQuery(searchQuery){
    if(searchQuery.indexOf(' ') >0)
        searchQuery ="+"+searchQuery.replace(/ /g,'+');

    return searchQuery;
}

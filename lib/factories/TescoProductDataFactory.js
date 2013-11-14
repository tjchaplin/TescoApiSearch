module.exports = function getProductSearchView (productSearchResult){
    var view = {};
    try{
        view.startIndex = productSearchResult.PageNumber;
        view.totalItems = productSearchResult.TotalProductCount;
        view.currentItemCount = productSearchResult.PageProductCount;
        view.products = getProductData(productSearchResult.Products);
    }catch(exception){
        console.log(exception)
    }
    return view;

};

var getProductData = function(productData)
{
    var resultProductData = [];
    for(var i = 0; i< productData.length; i++)
    {
        var productItem = getProductItem(productData[i]);
        resultProductData.push(productItem);
    }

    return resultProductData;
};


var getProductItem = function (productItem)
{
    var resultProductItem = {};
    resultProductItem.baseProductId = productItem.BaseProductId;
    resultProductItem.productId = productItem.ProductId
    resultProductItem.gtin = productItem.EANBarcode;
    resultProductItem.name = productItem.Name;
    resultProductItem.image = productItem.ImagePath;
    return resultProductItem;
}

window.onload = function (){
    console.log(typeof(window.location.search));
    var urlParams = new URLSearchParams(window.location.search);
    var keys = urlParams.keys();
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    let id;
    for(key of keys) { 
    id=getUrlParameter(key);
    console.log(key); 
    }
   
   let viewItem = () => {
    
    var Request = new XMLHttpRequest();
    URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json" ;
    const METHOD = 'GET';
    Request.open(METHOD,URL)
    Request.send() 
    
    Request.onerror = (err) => {
        console.error(err)
    }

    Request.onload = function (){
    
        if (Request.status ===200) {
            const RES = JSON.parse(Request.response);
            output = RES.ProductCollection[id];
            console.log(RES)
            console.log(output)
            return content();     
            }
          }; 
    }
viewItem();


function content(){
    var img = document.getElementById("viewImage");
    var productName = document.getElementById("product-name");
    var Category = document.getElementById("category");

    var desc = document.getElementById("Description");

    var availability = document.getElementById("available");
    var availability2 = document.getElementById("availableWord");

    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    var quntyWord = document.getElementById("quantityWord");

    img.src = output.ProductPicUrl;
    Category.innerHTML = output.Category;
    productName.innerHTML = output.Name;
    desc.innerHTML = output.Description;
    availability.innerHTML = "Availability in Stock: ";
    availability2.innerHTML = output.Status;
    availability2.style.color = "green";
    price.innerHTML = "$" + output.Price;
    quntyWord.innerHTML = "Maximum items available:";
    let total_quantity= output.Quantity; //total # items
    let cart_data = JSON.parse(localStorage.getItem('products'));
    console.log(cart_data); 
  let available_items;
  if (cart_data && cart_data.length) {
    cart_data.forEach((element)=>{
        if(output.ProductId == element["id"]){
            available_items=total_quantity-element["item_ctr"]
            quantity.innerHTML=available_items;
        }else{
            available_items=total_quantity;
            quantity.innerHTML=available_items; 
        }
    });
}
else{
    available_items=total_quantity;
    quantity.innerHTML=available_items;
}

}
}
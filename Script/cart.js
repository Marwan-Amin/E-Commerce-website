let cart_data = JSON.parse(localStorage.getItem('products'));
let old_data = JSON.parse(localStorage.getItem('old_products'));

//console.log("cart data",cart_data);
//console.log("old data",old_data);
//let final_data = [];
if (old_data != null ){
cart_data.forEach((element)=> {
    old_data.forEach((elem)=> {
        if (element["id"]==elem["id"] && element["item_ctr"]!=elem["item_ctr"]){
            element["item_ctr"]=element["item_ctr"]+elem["item_ctr"];
            console.log(element["item_ctr"]);
            
        }
    });
});
localStorage.setItem('products', JSON.stringify(cart_data));
}
//localStorage.setItem('products', JSON.stringify(cart_data));
//console.log("new data",cart_data);
let total =0;
//console.log("cart data",cart_data);
cart_data.forEach((element) => {
    console.log(element);
    console.log(element["name"]);
   // id = element["id"];
    name = element["name"];
    photo = element["photo"];
    price = element["price"];
    quantity = element["item_ctr"];
    
    let div_container = $("#cart");
    let row_div =$('<div class="row"> </div>');
    div_container.append (row_div);

    let img_div =$('<div class="col-md-5 "> </div>'); 
    row_div.append(img_div);

    let price_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(price_div);

    let quantity_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(quantity_div);
    
    let total_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(total_div);

    let delete_div =$('<div class="col-md-1"> </div>');
    row_div.append(delete_div);
    
    

    //img creation
    const IMG = new Image();
    IMG.src = photo;
    img_div.append(IMG);
    $("img").attr("width","130");
    $("img").attr("height","130");
    IMG.style.border = "thin solid black";
    //name
    let span = document.createElement("SPAN");
    product_name =  name;
    let span_txt = document.createTextNode(product_name);
    span.appendChild(span_txt);
    img_div.append(span);
    $("span").addClass("ml-3");
    //price
    product_price = `$${price}`;
    create_label (product_price,price_div)
    //quantity
    create_label (quantity,quantity_div)
    //total
    item_price  = price*quantity;
    create_label (item_price ,total_div)
    total += item_price
    //delete BUtton
    let delete_btn = document.createElement("button");
    delete_btn.style = "width:100px; height: 100px; vertical-align: center; font-size:40px";
    delete_btn.setAttribute("id",element["id"]);
    delete_div.append(delete_btn);
    delete_btn.innerHTML = "x";
    //empty row
    let empty_row =$('<div class="row mt-5"> </div>');
    div_container.append (empty_row);

    delete_btn.addEventListener("click", (ev)=>{
        var idd = ev.target;
        var ss = ev.target.getAttribute("id");
        row_div.remove();
        var afterDel = JSON.parse(localStorage.getItem("products"));
        var filter = afterDel.filter(function(ev){
            return ev.id != ss;
        });
        localStorage.setItem("products", JSON.stringify(filter))
    })

});
function create_label (txt,div)
{
    let label = document.createElement("LABEL");
    let label_txt = document.createTextNode(txt);
    label.appendChild(label_txt);
    div.append(label);
    $("label").addClass("mt-5");
}

var total_price = document.getElementById("total-price");
let total_no = document.createTextNode(total);
total_price.appendChild(total_no);
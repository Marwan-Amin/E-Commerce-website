let cart_data = JSON.parse(localStorage.getItem('products'));
let old_data = JSON.parse(localStorage.getItem('old_products'));

console.log("cart data",cart_data);
console.log("old data",old_data);
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
console.log("new data",cart_data);
let total =0;

cart_data.forEach((element) => {
    console.log(element);
    console.log(element["name"]);
   // id = element["id"];
    name = element["name"];
    photo = element["photo"];
    price = element["price"];
    quantity = element["quantity"];

    let div_container = $("#cart");
    let row_div =$('<div class="row"> </div>');
    div_container.append (row_div);

    let img_div =$('<div class="col-md-6"> </div>'); 
    row_div.append(img_div);

    let price_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(price_div);

    
    let input_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(input_div);
    
    let total_div =$('<div class="col-md-2"> </div>'); 
    row_div.append(total_div);

    

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
    //input quantity
    let input = document.createElement("input");
    input_div.append(input);
    input.setAttribute("size",5);
    input.value=quantity;
    arr=[];
    input.addEventListener("change",(event)=>{
        let item_no= input.value;
        arr.push({item_no});
        let newData = JSON.parse(localStorage.getItem('products'));
        let arrs = [];
        //console.log(arr)
        
        for(let key in newData){
            arrs.push({
                id:newData[key].id,
                name:newData[key].name,
                photo:newData[key].photo,
                price:newData[key].price,
                quantity:newData[key].quantity,
            });
            var object = arr.reduce(
                (obj , item) => Object.assign(obj , { ['item_ctr']: item.item_no
            }),{}
            );
            //console.log(object);
            cart_data.push(object);
            console.log(cart_data);
        }
        
        });
    //total
    item_price = price;
    create_label (item_price,total_div)
    total += item_price;
    //empty row
    let empty_row =$('<div class="row mt-5"> </div>');
    div_container.append (empty_row);

});
function create_label (txt,div)
{
    let label = document.createElement("LABEL");
    let label_txt = document.createTextNode(txt);
    label.appendChild(label_txt);
    div.append(label);
    $("label").addClass("mt-5");
}
console.log(total);


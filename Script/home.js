window.onload = function(e){ 
    let old_array = localStorage.getItem('products') ?  JSON.parse(localStorage.getItem('products')):[];
    if (old_array && old_array.length) {
    console.log("old array",old_array);
    localStorage.setItem('old_products', JSON.stringify(old_array));
    }
}
let getDataAndRender =  (renderData) => {
    const URL = 'https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json';
    const METHOD = 'GET';
    let xhr = new XMLHttpRequest();
    xhr.open(METHOD, URL);
    xhr.send();
    xhr.onerror = (err) => {
        console.error(err);
    }
    xhr.onload = (res) => {
        if(xhr.status == 200){
            const RES = JSON.parse(xhr.response);
            console.log(RES);
            result=RES.ProductCollection;
            console.log(result);
            return renderData(result);
        }
    }
}
let counter = 0;

let renderDataTOHTml= (result) => {    
    console.log("render to html");
    let div_container = $("#all_data") ;
    let counter = 0;
    for (var i = 0 ; i <41 ; i ++){
        let row_div =$('<div class="row"> </div>');
        //create row
        div_container.append (row_div);
        for(var j = 0; j<3;j++){
            //create col
            let col_div =$('<div class=" card col-md-4 " style="text-align:center;"> </div>'); 
            row_div.append(col_div);
            let div = document.createElement("DIV");
            col_div.append(div);
            //---------------------------------------------------------------
            //img of product
            const IMG = new Image();
            IMG.src = result[counter].ProductPicUrl;
            IMG.style.cursor = "pointer";
            IMG.style.display = "block";
            div.append(IMG);
            $("img").css("margin","auto")
            $("img").attr("width","300");
            $("img").attr("height","300");
            IMG.setAttribute("data-id" ,counter);
            //--------------------------------------------------------------
            //name of product
            let span = document.createElement("h4");
            product_name =  result[counter].Name;
            let span_txt = document.createTextNode(product_name);
            span.appendChild(span_txt);
            div.append(span);
            $("h4").addClass("span_style");
            $("h4").addClass("mt-3");
            $("h4").addClass("text-dark");
            span.setAttribute("data_id" ,counter);
            span.style.cursor = "pointer";
            //let span_id = span.getAttribute("data-id");
            //---------------------------------------------------------------
            //Name of Category
            let Category = document.createElement('strong');
            Category.innerHTML = result[counter].Category;
            Category.style.display = "block";
            div.append(Category)
            $("strong").css("font-size","15px")
            $("strong").css("color","orange")
            //---------------------------------------------------------------
            //price of product
            let label = document.createElement("LABEL");
            product_price =  `$${result[counter].Price}`;
            let label_txt = document.createTextNode(product_price);
            label.appendChild(label_txt);
            div.append(label);
            $("label").css("margin","auto");
            $("label").css("font-size","20px")
            $("label").css("color","gray")
            $("label").addClass("m-2");
            $("label").addClass("label_style");
            //---------------------------------------------------------------
            //cart btn
            let btn=document.createElement("BUTTON");
            let divBTN = document.createElement('div');
            div.append(divBTN);
            divBTN.append(btn);
            $("button").addClass("col-12");
            $("button").addClass("btn btn-outline-dark");
            $("button").text("Add to cart");
            $("button").css("cursor","pointer")
            $("button").attr('id',result[counter].ProductId);
            let div2 = document.createElement("DIV");
            div.append(div2);
            //add event on click
                let id =result[counter].ProductId
                let name = result[counter].Name;
                let photo = result[counter].ProductPicUrl;
                let price = result[counter].Price;
                let quantity = result[counter].Quantity;
                let product_array = localStorage.getItem('products') ?  JSON.parse(localStorage.getItem('products')):[];
                //console.log(product_array);
                let item_ctr=0;
                let total 
                //product_array.push(exist_items);
            btn.addEventListener("click",(ev)=>{
                //if item is not available
                item_ctr ++;
                if (quantity < item_ctr){
                    btn.disabled = true;
                    let sorry_span = document.createElement("SPAN");
                    let sorry_txt = document.createTextNode("Sorry :( ,This Item isn't available any more");
                    sorry_span.appendChild(sorry_txt);
                    div2.append(sorry_span);
                }
                else{
                    //console.log (item_ctr);
                    let product_array = localStorage.getItem('products') ?  JSON.parse(localStorage.getItem('products')):[];
                    let product = {'id': id, 'name': name, 'photo': photo,'price': price,'quantity':quantity,'item_ctr':item_ctr};
                    console.log(product.id);
                    let product_flag ;
                    let flag;
                    if (product_array && product_array.length) {   
                        // not empty 
                        product_array.forEach(element => {
                            console.log(product.id);
                            console.log(element["id"]);
                            if(element["id"]==product.id){
                                console.log("item match");
                                element["item_ctr"]=product.item_ctr;
                                product_flag = 1; //means item is found
                                flag=1
                            }
                            else{
                                product_flag = 0; //means item not found
                            }
                        });
                     } 
                     else {
                        // empty
                        console.log("first push");
                        product_array.push(product); 
                     }
                     if(product_flag == 0 && flag != 1){
                        product_array.push(product);
                     }
                    //product_array.push(product);
                    // Put the object into storage
                    console.log("product array",product_array);
                    localStorage.setItem('products', JSON.stringify(product_array));

                   /* //add data to moving btn
                    let total = document.getElementById("total-items");
                    let total_text = getNoItems();
                    console.log(total_text);
                    total.innerHTML = total_text;*/

                }
                //add data to moving btn
               
                let cart_data = JSON.parse(localStorage.getItem('products'));
                //console.log(cart_data);
                let items_checked =0;
                let total_price=0;
                if (cart_data && cart_data.length) {
                    cart_data.forEach((element)=>{
                        items_checked += element["item_ctr"];
                        total_price+= (element["item_ctr"]*element["price"]);
                    });
                }
                else{
                items_checked=0;
                }
                let totalPrice= document.getElementById("total-price");
                totalPrice.innerHTML = `$${total_price}`;
                let total = document.getElementById("total-items");
                console.log();
                total.innerHTML = items_checked;
                
            });
            //send data to view
            IMG.addEventListener("click",(ev)=>{
                IMG.target = ev.target;
                let IMG_id = IMG.getAttribute("data-id");
                console.log(IMG_id);
                location.href = "view.html"+"?id="+IMG_id;  
            });
            span.addEventListener("click",(ev)=>{
                span.target = ev.target;
                let span_id = span.getAttribute("data_id");
                console.log(span_id);
                location.href = "view.html"+"?id="+span_id;
            });
            //------------------------------------
            let empty_row =$('<div class="row mt-3"> </div>');
            div_container.append (empty_row);
            counter++ ;
            //console.log(counter);
            
                totalbtn = document.getElementById("total-items");
                console.log();
                totalbtn.innerHTML = 0;
                let total_pricebtn= document.getElementById("total-price");
                total_pricebtn.innerHTML = `$0`;
        }
    }
    let cart_data = JSON.parse(localStorage.getItem('products'));
    //console.log(cart_data);
    let items_checked =0;
    let total_price=0;
    if (cart_data && cart_data.length) {
        cart_data.forEach((element)=>{
            items_checked += element["item_ctr"];
            total_price+= (element["item_ctr"]*element["price"]);
        });
    }
    else{
    items_checked=0;
    }
    let totalPrice= document.getElementById("total-price");
    totalPrice.innerHTML = `$${total_price}`;
    let total = document.getElementById("total-items");
    console.log();
    total.innerHTML = items_checked;
};

getDataAndRender(renderDataTOHTml);
console.log('end');
//-------------------------------------------------------
console.log("sold Products");

let div = document.querySelector("#container");

const sold = JSON.parse(localStorage.getItem("soldProducts")) || [];
console.log(sold);

if (sold.length === 0) {

    div.innerHTML = `
        <h1 class="error"><span class="aqua-border">There is no remaning order!</span> <br /><span class="aqua-border">All products are returned succsessfully.</span></h1>
        <div class="center">
            <button onclick="towordHome()" class="checkOut">Back To Home</button>
        </div>
    `;

} 
else {
    sold.map((item, index) => {
        
        div.innerHTML += `
            <div class="sold-card" id="product-${item.id}">
                
                <img src="${item.thumbnail}" class="w-img">
                <h2><span class="aqua-border">Title:</span> ${item.title}</h2>
                <h2><span class="aqua-border">Category:</span> ${item.category}</h2>
                <h4><span class="aqua-border">Description:</span> ${item.description}</h4>
                <h3><span class="aqua-border">Warranty:</span> <span class="red-color">${item.warrantyInformation}</span></h3>
                <h4><span class="aqua-border">Weight:</span> ${item.weight}</h4>
                <h4><span class="aqua-border">Stocks:</span> ${item.stock}</h4>
                <h4><span class="aqua-border">Quantity:</span> ${item.quantity}</h4>
                <h3><span class="aqua-border">Price:</span> <span class="text-green">$${(item.price * item.quantity).toFixed(2)}</span></h3>

                <button class="big-btns" onclick="deleteCard(${index})">Order Returned</button>
                
            </div>
        `;
        
    });
}


function deleteCard(index) {

    sold.splice(index, 1);

    localStorage.setItem("soldProducts", JSON.stringify(sold));
    
    div.innerHTML = ""

    sold.map((item, index) => {

        div.innerHTML += `
            <div class="sold-card" id="product-${item.id}">
                
                <img src="${item.thumbnail}" width="50%">
                <h2><span class="aqua-border">Title:</span> ${item.title}</h2>
                <h2><span class="aqua-border">Category:</span> ${item.category}</h2>
                <h4><span class="aqua-border">Description:</span> ${item.description}</h4>
                <h3><span class="aqua-border">Warranty:</span> <span class="red-color">${item.warrantyInformation}</span></h3>
                <h4><span class="aqua-border">Weight:</span> ${item.weight}</h4>
                <h4><span class="aqua-border">Stocks:</span> ${item.stock}</h4>
                <h4><span class="aqua-border">Quantity:</span> ${item.quantity}</h4>
                <h3><span class="aqua-border">Price:</span> <span class="text-green">$${(item.price * item.quantity).toFixed(2)}</span></h3>

                <button class="big-btns" onclick="deleteCard(${index})">Order Returned</button>
            
            </div>
        `;
    
    })
 
    Swal.fire({
        title: "No problem OR Dont worry",
        text: "Your item has been return !",
        icon: "success",
    });

    setTimeout(() => {
        // reload UI
        location.reload();
    }, 1000)
}

function towordHome() {
    window.location = "./index.html";
}

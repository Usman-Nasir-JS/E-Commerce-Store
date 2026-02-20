console.log("Single Prodoct Api");

let products = document.querySelector("#OneProducts")

let newProducts = localStorage.getItem("id")
console.log(newProducts);


fetch(`https://dummyjson.com/products/${newProducts}`)

.then(res => res.json() )

.then(newData => {
    console.log(newData);
    
    products.innerHTML += `
    
        <div class="result-card">

            <div>
                <img src="${newData.thumbnail}" width="100%">    
            </div>
        
            <div>

                <h1><span class="aqua-border">Product:</span> ${newData.title}</h1>
                <h2><span class="aqua-border">Category:</span> ${newData.category}</h2>
                <h5><span class="aqua-border">Description:</span> ${newData.description}</h5>
                <h3><span class="aqua-border">Warranty:</span> <span class="red-color">${newData.warrantyInformation}</span></h3>
                <h4><span class="aqua-border">Stocks:</span> ${newData.stock}</h4>
                <h4><span class="aqua-border">Weight:</span> ${newData.weight}</h4>
                <h3><span class="aqua-border">Price:</span> <span class="text-green">$${newData.price}</span></h3>
        
                <button class="order-btn" onclick="addCard()">Add Now</button>
    
            </div>
            
        </div>

    `
})

.catch(error => {
    console.error(error);
})

function addCard() {
    window.location = 'index.html';
}

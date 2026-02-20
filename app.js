console.log("E-Commerce Store");

const div = document.querySelector("#container");
let data;

let cardItems = JSON.parse(localStorage.getItem("cart")) || [];

let zero = document.querySelector(".zero");
zero.innerHTML = cardItems.reduce((sum, item) => sum + item.quantity, 0);

let scrollDown = document.getElementById("cartIcon");


fetch(`https://dummyjson.com/products`)

.then(res => res.json())

.then(res => {
    console.log(res.products);

    data = res;

    res.products.map((item, index) => {

        div.innerHTML += `
            <div class="alone-card" id="product-${item.id}">
                
                <img src="${item.thumbnail}" width="50%">
                <h2><span class="aqua-border">Title:</span> ${item.title}</h2>
                <h4><span class="aqua-border">Description:</span> ${item.description.slice(0, 30)} <b><span class="aqua-color">.............</span></b></h4>
                <h3><span class="aqua-border">Warranty:</span> <span class="red-color">${item.warrantyInformation}</span></h3>
                <h3><span class="aqua-border">Price:</span> <span class="text-green">$${item.price}</span></h3>

                <button class="homeBtns" onclick="showMore(${item.id})">See More Details</button>
                <button class="homeBtns" onclick="addToCard(${index})">Add To Card</button>
            
            </div>
        `;

    });

    let scrollPos = localStorage.getItem("scrollPos");

    if (scrollPos) {

        setTimeout(() => {
            
            window.scrollTo({
                top: parseInt(scrollPos),
                behavior: "smooth"
            });
            
            localStorage.removeItem("scrollPos");
        }, 200);
    
    }
})

.catch(err => {
    console.error(err);
})

scrollDown.addEventListener("click", () => {

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });

});

const showMore = id => {

    localStorage.setItem("scrollPos", window.scrollY);
    localStorage.setItem("id", id);
    
    window.location = "oneProduct.html";
}

const addToCard = (index) => {

    let product = data.products[index];

    let existing = cardItems.find(item => item.id === product.id);

    if (existing) {

        Swal.fire({
            title: "Oops!",
            text: "You already added this product!",
            icon: "info",
        });
        
        return;
    }

    product.quantity = 1;
    cardItems.push(product);

    localStorage.setItem("cart", JSON.stringify(cardItems));

    zero.innerHTML = cardItems.reduce((sum, item) => sum + item.quantity, 0);

    Swal.fire({
        title: "Good job!",
        text: "Item added to cart successfully!",
        icon: "success",
    });

};

function checkOut() {
    localStorage.setItem("cart", JSON.stringify(cardItems));
    window.location = "addToCard.html";
}

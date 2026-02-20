console.log("These Products You Selected !");

const div = document.querySelector("#countainer");
const deta = localStorage.getItem("cart");
const purchaseAllBtn = document.getElementById("purchaseAllBtn");
const soldBtn = document.getElementById("soldBtn");

let soldProducts = JSON.parse(localStorage.getItem("soldProducts")) || [];
let convert = JSON.parse(deta) || [];

console.log(convert);

convert.forEach(item => {
    if (!item.quantity) item.quantity = 1;
});

localStorage.setItem("cart", JSON.stringify(convert));

function updateTotal() {

    let total = 0;

    convert.forEach(item => {
        total += item.price * item.quantity;
    });

    document.getElementById("totalPrice").innerHTML = `
        <span class="aqua-border">Total price:</span> 
        <span class="text-green">$${total.toFixed(2)}</span>
    `;

}

function renderCart() {

    div.innerHTML = "";

    convert.map((item, index) => {

        div.innerHTML += `
            <div class="alone-card">

                <img src="${item.thumbnail}" width="50%">
                <h2><span class="aqua-border">Title:</span> ${item.title}</h2>
                <h4><span class="aqua-border">Description:</span> ${item.description.slice(0, 30)}
                <b><span class="aqua-color">.............</span></b></h4>
                <h3><span class="aqua-border">Warranty:</span> 
                <span class="red-color">${item.warrantyInformation}</span></h3>

                <h3>
                    <span class="aqua-border">Price:</span> 
                    <span class="text-green" id="price${index}">
                        $${(item.price * item.quantity).toFixed(2)}
                    </span>
                </h3>

                <div class="quantity">
                    <h3 class="aqua-border">Quantity:</h3>
                    <button class="mini-btns" onclick="decrease(${index})"> - </button>
                    <h2 id="digit-${index}">${item.quantity}</h2> 
                    <button class="mini-btns" onclick="increase(${index})"> + </button>
                </div>
    
                <div class="two-btns">
                    <button class="big-btns" onclick="deleteCard(${index})">Delete</button>
                    <button class="big-btns" onclick="buyNow(${index})">Buy Now</button>
                </div>

            </div>
        `;
    });

    updateTotal();
}

renderCart();

function increase(index) {

    convert[index].quantity++;

    document.querySelector(`#digit-${index}`).innerHTML =
    convert[index].quantity;

    document.getElementById(`price${index}`).innerHTML = `
        $${(convert[index].price * convert[index].quantity).toFixed(2)}
    `;

    localStorage.setItem("cart", JSON.stringify(convert));

    updateTotal();
}

function decrease(index) {

    if (convert[index].quantity > 1) {

        convert[index].quantity--;

        document.querySelector(`#digit-${index}`).innerHTML =

        convert[index].quantity;

        document.getElementById(`price${index}`).innerHTML = `
            $${(convert[index].price * convert[index].quantity).toFixed(2)}
        `;

        localStorage.setItem("cart", JSON.stringify(convert));

        updateTotal();
    }
}

function deleteCard(index) {

    convert.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(convert));

    renderCart();

    Swal.fire("Deleted!", "Your item has deleted!", "success");
}

function buyNow(index) {

    Swal.fire({
        title: "Are you sure?",
        text: "You want to purchase this product now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy it!"
    })
    .then((result) => {

        if (result.isConfirmed) {

            soldProducts.push(convert[index]);

            convert.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(convert));
            localStorage.setItem("soldProducts", JSON.stringify(soldProducts));

            Swal.fire("Thank You!", "Product purchased successfully!", "success");

            renderCart();
        }
    });
}

purchaseAllBtn.addEventListener("click", () => {

    if (convert.length === 0) {
        Swal.fire("Cart Empty", "No products to purchase!", "info");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You want to purchase ALL products?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Purchase All!"
    })
    .then((result) => {

        if (result.isConfirmed) {

            soldProducts = soldProducts.concat(convert);

            convert.length = 0;

            localStorage.setItem("cart", JSON.stringify(convert));
            localStorage.setItem("soldProducts", JSON.stringify(soldProducts));

            Swal.fire("Thank You!", "All products purchased successfully!", "success");

            renderCart();
        }
        
    });
});


if (convert.length <= 0) {
    soldBtn.disabled = true;
}
else {
    soldBtn.disabled = false;
}

soldBtn.addEventListener("click", () => {
    window.location = "soldProducts.html";
});

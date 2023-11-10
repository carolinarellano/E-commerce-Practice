const productsInCart = document.querySelector('.productsInCart');
const cartTotal = document.querySelector('#total');

let cartProducts = [];

function getCartData() {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || {};
    cartProducts = Object.values(cartData).map((item) => item.product);
}

function showProductsInCart() {
    const productsInCart = document.querySelector('#productsInCart');
    const cartTotal = document.querySelector('#total');
    productsInCart.innerHTML = '';
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};

    //No products in cart div
    if (Object.keys(cart).length === 0 && cart.constructor === Object) {
        productsInCart.innerHTML = `
        <div class="no-items">
            <img src="https://i.ibb.co/Js50VMJ/Fun-Bag.jpg" alt="Fun-Bag" border="0"><br>
                <h4> No items added to the cart yet! Your bag is empty :( </h4>
        </div>
        `;
    }

    let total = 0;

    for (let uuid in cart) {
        const product = cart[uuid].product;
        let quantity = cart[uuid].quantity;
        const { _uuid, _title, _description, _imageURL, _unit, _category, _pricePerUnit, _stock } = product;

        const productDiv = document.createElement('div');
        productDiv.classList.add('card');
        productDiv.classList.add('mb-3');
        productDiv.id = `product-${_uuid}`;

        const totalPrice = quantity * _pricePerUnit;

        total += totalPrice;

        productDiv.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div>
                            <img src="${_imageURL}" class="img-fluid rounded-2" alt="Shopping item" style="width: 150px;">
                        </div>
                        <div class="ms-3">
                            <h5>${_title}
                                <a href="" style="color: #cecece; margin: 5px;" class="deleteBtn" data-uuid="${_uuid}"><i class="fas fa-trash-alt"></i></a>
                            </h5>
                            <p><small>${_category}</small></p>
                            <p class="small mb-0">${_description}</p>
                        </div>
                    </div>
                    <div>
                    <br>
                    <div>
                    <input id="quantity-${_uuid}" type="number" class="fw-normal mb-2" value="${quantity}" disabled>
                    <button id="editBtn-${_uuid}" class="editBtn" style="color: #cecece; margin: 5px; border: none" data-uuid="${_uuid}"><i class="fa-sharp fa-solid fa-pen-to-square"></i></a>
                    <button id="saveBtn-${_uuid}" class="saveBtn d-none" style="color: #cecece; margin: 5px; border: none" data-uuid="${_uuid}"><i class="fa-sharp fa-solid fa-floppy-disk"></i></a>
                    </div>
                        <div style="width: 180px;">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">$</span>
                                <input type="text" class="form-control" placeholder=${_pricePerUnit} aria-label=${_pricePerUnit} disabled>
                                <span class="input-group-text" id="basic-addon2">USD</span>
                            </div>
                            <h5>${totalPrice} USD</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productsInCart.appendChild(productDiv);

        const deleteBtn = productDiv.querySelector('.deleteBtn');
        const editBtn = productDiv.querySelector('.editBtn');
        const saveBtn = productDiv.querySelector('.saveBtn');

        deleteBtn.addEventListener("click", function () {
            const productUUID = this.getAttribute('data-uuid');
            deleteProduct(productUUID);
            productDiv.remove();
            updateCartTotal();
        });

        editBtn.addEventListener("click", function () {
            const productUUID = this.getAttribute('data-uuid');
            editProduct(productUUID);
        });

        saveBtn.addEventListener("click", function () {
            const productUUID = this.getAttribute('data-uuid');
            saveProduct(productUUID);
        })
    }

    updateCartTotal();
}

function displayPurchaseSummary() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let totalCost = 0;

    const summaryListItems = [];

    for (const uuid in cart) {
        const product = cart[uuid].product;
        const quantity = cart[uuid].quantity;
        const { _title, _pricePerUnit } = product;
        const itemTotal = _pricePerUnit * quantity;

        totalCost += itemTotal;

        summaryListItems.push(`<li><strong>${_title}</strong> ${quantity} x ${_pricePerUnit.toFixed(2)} USD</li>`);
    }

    const deliveryCost = 10;
    totalCost += deliveryCost;

    if (totalCost - deliveryCost == 0) {
        const summaryCardHTML = `
        <div class="card">
            <div class="card-body">
                <h4>Purchase Summary</h4>
                <ul class="mb-0" style="list-style: none;">
                    <p>There are no items in the cart</p>
                </ul>
            </div>
        </div>
        `;
        const totalCostElement = document.getElementById('totalCost');
        totalCostElement.innerHTML = summaryCardHTML;
    }
    else {
        const deliverySummary = `<li><strong>Delivery:</strong> ${deliveryCost} USD</li>`;
        const summaryCardHTML = `
        <div class="card">
            <div class="card-body">
                <h4>Purchase Summary</h4>
                <ul class="mb-0" style="list-style: none;">
                    ${summaryListItems.join('')}
                    ${deliverySummary}
                </ul>
                <hr>
                <h5>Total: ${totalCost.toFixed(2)} USD</h5>
                <div  text-align: "right">
                    <button class="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>
        `;
        const totalCostElement = document.getElementById('totalCost');
        totalCostElement.innerHTML = summaryCardHTML;
    }

}

function deleteProduct(productUUID) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    delete cart[productUUID];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
}

function updateCartTotal() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let total = 0;
    for (let uuid in cart) {
        const product = cart[uuid].product;
        const quantity = parseInt(cart[uuid].quantity);
        const pricePerUnit = parseFloat(product._pricePerUnit);
        total += quantity * pricePerUnit;
    }
    cartTotal.innerText = total;
}

function editProduct(productUUID) {
    let input = document.getElementById(`quantity-${productUUID}`);
    input.disabled = false;
    input.focus();
    let edit = document.getElementById(`editBtn-${productUUID}`);
    edit.classList.add("d-none");
    let save = document.getElementById(`saveBtn-${productUUID}`);
    save.classList.remove("d-none");
}

function saveProduct(productUUID) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let newQuantity = parseInt(document.getElementById(`quantity-${productUUID}`).value);
    if (!newQuantity || newQuantity < 1) {
        alert("Please enter a valid number!");
        return;
    }
    cart[productUUID]["quantity"] = newQuantity;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    showProductsInCart();
    let edit = document.getElementById(`editBtn-${productUUID}`);
    edit.classList.remove("d-none");
    let save = document.getElementById(`saveBtn-${productUUID}`);
    save.classList.add("d-none");
}

getCartData();
showProductsInCart();
displayPurchaseSummary();
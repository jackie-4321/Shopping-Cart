const shopItemBtn = document.querySelectorAll('.shop-item-button');
const cartItems = document.querySelector('.cart-items')

//get input
shopItemBtn.forEach(function(elem) {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        let price = elem.previousElementSibling.innerHTML;
        let image = elem.parentElement.previousElementSibling.src;
        let name = elem.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        let quantity = 1;
        addToCart(image, name, price, quantity);       
    })
})

//add to cart
function addToCart(image,name,price, quantity) {
    let totalPrice = document.querySelector('.cart-total-price');
    let totalPriceNum = parseFloat(totalPrice.innerHTML);
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    if (cartItemNames.length == 0) {
        //add item to cart
        addItem(image, name, price, quantity);

        //update total
        total(price, quantity);

        //delete button
        deleteBtn()        
    } else {
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == name) {
                alert('The item is in the cart already')
                return
            }
        }
            //add item to cart
            addItem(image, name, price, quantity); 
            //update total
            total(price, quantity);
            //delete button
            deleteBtn()
    }    
}

//add item to cart
function addItem(image, name, price, quantity) {
    cartItems.innerHTML +=`
            <div class="cart-row">
            <div class="cart-item cart-column">
                <img src="${image}" width="100" height="100">
                <span class="cart-item-title">${name}</span>
            </div>
            <div class="cart-price cart-column">${price}</div>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${quantity}">
                <button class="btn btn-danger" type="button" >REMOVE</button>
            </div>
        
            </div>
        `
}

//delete button
function deleteBtn() {
    let removeBtn = document.getElementsByClassName('btn btn-danger');
    Array.from(removeBtn).forEach(function(item) {
        item.addEventListener('click', (e) => {
            //remove the item
            item.parentElement.parentElement.remove();
            //update the total cost 
            let totalPrice = document.querySelector('.cart-total-price');
            let itemPrice = item.parentElement.previousElementSibling.innerHTML;
            let itemTotal = item.previousElementSibling.defaultValue;
            newTotalPrice = parseFloat(totalPrice.innerHTML) - (parseFloat(itemPrice.substr(1)) * itemTotal)
            totalPrice.innerHTML = newTotalPrice.toFixed(2);

        })
    })
}

//update total of multiple items 
function total(price, quantity) {
    //convert price from string to number
    let totalPrice = document.querySelector('.cart-total-price');
    let totalPriceNum = parseFloat(totalPrice.innerHTML);
    let newPrice = parseFloat(price.substr(1));

    //add the new total price
        if (!totalPriceNum) {
            let sum = newPrice * quantity;
            totalPrice.innerHTML = sum.toFixed(2);
            updateCartTotal()
            totalPrice.innerHTML = sum.toFixed(2);
        } else {
            totalPriceNum += newPrice * quantity;
            updateCartTotal()
            totalPrice.innerHTML = totalPriceNum.toFixed(2);
        }  
}

function updateCartTotal() {
    //get the updated quantity and total price 
    let newQuantity = document.querySelectorAll('.cart-quantity-input');
    newQuantity.forEach(function(item) {
        let totalPrice = document.querySelector('.cart-total-price');        
        //get the old total before changing the quantity
        item.addEventListener('focus', (e) => {
            newPrice = parseFloat(item.parentElement.previousElementSibling.innerHTML.substr(1));
            let oldTotal = item.value * newPrice;
            totalPriceNum = parseFloat(totalPrice.innerHTML);
            //update the new total price after chaning the quantity
            item.addEventListener('input', (e) => {
                let finalTotal = totalPriceNum - oldTotal + (item.value * newPrice);
                item.defaultValue = item.value;
                totalPrice.innerHTML = finalTotal.toFixed(2);
                })
        }) 
    })
}
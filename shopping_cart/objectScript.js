
// Structure for phone object
class Product{
  constructor(id, brand, model, variant, color, image, price){
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.variant = variant;
    this.color = color;
    this.image = image;
    this.price = price;
  }
}

// Creating Phone object
const huawei01 = new Product('hua01','Huawei','Honor 8x', 128, 'Blue','img/honor-8x.jpg', 220); 
const iphone01 = new Product('iph01','iPhone','X', 128, 'Golden','img/iphone-x.jpg', 599); 
const iphone02 = new Product('iph02','iPhone','12', 64, 'Ocean','img/iphone-12.jpg', 1400);
const samsung01 = new Product('sam01','Samsung Galazy','Z fold', 128, 'Mate','img/samsung_galaxy_z_fold.jpg', 1500);
const oneplus01 = new Product('oneplus01','One Plus','7 pro', 256, 'Gold','img/oneplus_7_pro.jpg', 799);

// list to hold all the products at a single place
let productList = [huawei01, iphone01, iphone02, samsung01, oneplus01]


// Function to show product list on the webpage
function showProductList(){
  let productsContainer = document.querySelector('.products-container');
  productList.forEach(product => {
      productsContainer.innerHTML += `
      <div class="product">
          <img class="product-img" src=${product.image} alt=${product.model} />
          <div class="details">
            <p class="two-line">${product.brand} ${product.model}</p>
            <p><span>$</span>${product.price}</p>
            <button class="add-to-cart" onclick="productAddToCart('${product.id}')">Add to Cart</button>
          </div>
        </div>`

  })
}


// Structuring User Class
class User{
  #userCart = [];
  constructor(userName, userId, email, password, phone){
    this.userName = userName;
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  // Method to add product to the current users cart
  addToUserCart(item){
    if(this.#userCart.indexOf(item) == -1){
      this.#userCart.push(item);
      refreshCart();
    }
    else{
      alert("Already added to the cart")
    }
  }
// Method to delete product from user cart
  deleteFromCart(itemId){
    for (let item of this.#userCart){
      if(item.id === itemId){
        const indexToRemove = this.#userCart.indexOf(item);
        if(indexToRemove !== -1){
          this.#userCart.splice(indexToRemove,1);
        }
      }
    } 
  }
  // Method to 
  getCart(){
    return this.#userCart;
  }

  getProductPrice(itemId){
    let i=0;
    while (i< this.#userCart.length){
      if(this.#userCart[i].id == itemId){
        return this.#userCart[i].price;
      }
      i++;
    }
  }

  cartDetails(){
    let cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = ''

    for(var item of this.#userCart){
      cartContainer.innerHTML += `<div id="${item.id}" class="item-container">
        <img class="product-image" src=${item.image} alt=${item.brand}>
        <p>${item.brand} ${item.model} ${item.variant}GB ${item.color}
        </p>
      
        <div class="inner-item">
          <button id="${item.id}minus" onclick="onProductChange('${item.id}','minus')"><i class="fa fa-minus"></i></button>
          <input id="${item.id}qty" type="number" class="input" value="1">
          <button id="${item.id}plus" onclick="onProductChange('${item.id}','plus')"><i class="fa fa-plus"></i></button>
          <span>$</span><p id="${item.id}price" class="item-price">${item.price}</p>
          <button id="${item.id}delete" class="btnCancel" onclick="onProductChange('${item.id}','delete')"><i class="fa fa-times fa-2x"> </i></button>
        </div>
      </div>`
    }
    cartSummary();
  }
}


// New user creation
const ayan = new User('ayan', '2019', 'ayan@gmali.com', '1234', '01645800000');


// Functionality of product cart.
function onProductChange(itemId, option){

  const itemQuantity = document.getElementById(itemId+'qty');
  const toPrice = document.getElementById(itemId+'price');

  // Function to change data if item quantity decrease
  if(option == "minus"){
    if(itemQuantity.value > 0){
      itemQuantity.value = parseInt(itemQuantity.value)-1;
      toPrice.innerHTML = ayan.getProductPrice(itemId) * parseInt(itemQuantity.value);
    }
  }
  // Function to change data if item quantity increases
  if(option == "plus"){
    itemQuantity.value = parseInt(itemQuantity.value)+1;
    toPrice.innerHTML = ayan.getProductPrice(itemId) * parseInt(itemQuantity.value);
  }
  // Function to delete the item from the list
  if(option == "delete"){
    const section = document.getElementById(itemId);
    let isConfirm = confirm("Are you sure You want to remove this product from cart?");
    if(isConfirm){
      section.remove();
      ayan.deleteFromCart(itemId);
    }

  }

  // To update the cart summary at every change
  cartSummary();
  
}

// Function for cart summary
function cartSummary(){
  const priceList = document.getElementsByClassName('item-price');
  const subTotal = document.getElementById('subTotal');
  const taxTotal = document.getElementById('taxTotal');
  const totalPrice = document.getElementById('totalPrice');
  let subTotalPrice = 0;
  for(let i=0; i<priceList.length; i++){
    subTotalPrice += parseFloat(priceList[i].innerText);
  }
  let tax = (subTotalPrice * 5)/100;
  let total = subTotalPrice + tax;
// Update the prices in the summary cart
  subTotal.innerHTML = `<span>$</span>` + subTotalPrice;
  taxTotal.innerHTML = `<span>$</span>` + tax.toFixed(2);
  totalPrice.innerHTML = `<span>$</span>` + total.toFixed(2);
}


// Function to refresh when a user adds any product to the cart
function refreshCart(){
  ayan.cartDetails();
}
refreshCart()



// Function to add product from list to user cart
function productAddToCart(productId,user=ayan){
  let product;
  for(let item of productList){
    if(item.id === productId){
      product = item;
      break;
    }
    else{
      product = null;
    }
  }
  user.addToUserCart(product);
}

// Fetch JSON file for product details
async function prod(){
  const promise = await fetch("./products.json")
  .then(response => response.json())

  return promise.chairs
}

// Create product from a json file
async function jsonProducts(){
  let products = await prod()

  for(let product of products){
    let objectName = product.id;
    objectName = new Product(product.id, product.brand, product.model, product.variant, product.color, product.image, product.price);
    productList.push(objectName);
  }
  showProductList();
}
jsonProducts()


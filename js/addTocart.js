let url =
  "https://multi-vendor-e-commerce-37b58-default-rtdb.asia-southeast1.firebasedatabase.app/";

let cartProduct = [];
document.addEventListener("DOMContentLoaded", () => {
  cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
});

async function GetProduct(productId) {
  try {
    let response = await fetch(`${url}/products/${productId}.json`);
    let data = await response.json();
    data.id = productId;
    addToCart(data);
  } catch (error) {
    console.log("Something went wrong:");
  }
}
function addToCart(product) {
  let quantity = 1;
  let productPrice = product.price;
  let totalPrice = quantity * productPrice;
  // Check if the product already exists in the cart
  let existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    // If the product exists, update the quantity and total price
    existingProduct.quantity += quantity;
    existingProduct.totalPrice += totalPrice;
  } else {
    // If the product does not exist, add it to the cart
    cartProduct.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      quantity: quantity,
      totalPrice: totalPrice,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cartProduct));
  window.location.href = "./cart.html";
}
window.GetProduct = GetProduct;
window.addToCart = addToCart;

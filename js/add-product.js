import { baseurl } from "./firebase.js";
import { showMessage } from "./utils.js";
export async function addProduct(event) {
  event.preventDefault();
  let name = document.getElementById("productName").value.trim();
  let category = document.getElementById("productCategory").value;
  let brand = document.getElementById("productBrand").value.trim();
  let price = document.getElementById("productPrice").value.trim();
  let stock = document.getElementById("productStock").value.trim();
  let rating = document.getElementById("productRating").value;
  let color = document.getElementById("productColor").value.trim();
  let weigth = document.getElementById("productWeight").value.trim();
  let image = document.getElementById("mainImage").value.trim();
  let desciption = document.getElementById("productDescription").value.trim();
  let sellerID = localStorage.getItem("vendor");
  let productObj = {
    name,
    category,
    brand,
    price,
    stock,
    rating,
    color,
    weigth,
    image,
    desciption,
    sellerID,
  };
  try {
    let response = await fetch(`${baseurl}/products.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productObj),
    });

    if (response.ok) {
      showMessage("green", "Product added Successful!");
      setTimeout(() => {
        window.location.href = "./view-products.html";
      }, 1000);
      document.getElementById("productName").value = "";
      document.getElementById("productCategory").value = "";
      document.getElementById("productBrand").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productStock").value = "";
      document.getElementById("productRating").value = "";
      document.getElementById("productColor").value = "";
      document.getElementById("productWeight").value = "";
      document.getElementById("mainImage").value = "";
      document.getElementById("productDescription").value = "";
    } else {
      showMessage("red", "Product Not Added");
    }
  } catch (error) {
    showMessage("red", "Something went wrong!");
  }
}

export async function isSellerLoggedIn() {
  let sellerID = localStorage.getItem("vendor");
  if (!sellerID) {
    window.location.href = "./seller.html";
    return;
  }
}

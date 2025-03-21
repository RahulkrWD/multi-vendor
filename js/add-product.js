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
  let details = document.getElementById("productDetails").value.trim();
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
    details,
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
      document.getElementById("productDetails").value = "";
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
// Seller profile
export async function SellerProfileForm(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("password").value.trim();
  let businessName = document.getElementById("businessName").value.trim();
  let businessType = document.getElementById("businessType").value;
  let address = document.getElementById("address").value.trim();

  let sellerObj = {
    name,
    phone,
    password,
    businessName,
    address,
    businessType,
  };

  try {
    let sellerId = localStorage.getItem("vendor");
    let response = await fetch(`${baseurl}/vendors/${sellerId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerObj),
    });

    if (response.ok) {
      showMessage("green", "Update Successful!");
      GetSellerProfile();
    }
  } catch (error) {
    showMessage("red", "Something went wrong. Please try again.");
  }
}

export async function GetSellerProfile() {
  let sellerId = localStorage.getItem("vendor");

  try {
    let response = await fetch(`${baseurl}/vendors/${sellerId}.json`);
    let sellerData = await response.json();

    // Update the form fields if they exist
    let nameField = document.getElementById("name");
    let emailField = document.getElementById("email");
    let businessNameField = document.getElementById("businessName");
    let businessTypeField = document.getElementById("businessType");
    let addressField = document.getElementById("address");
    let passwordField = document.getElementById("password");
    let phoneField = document.getElementById("phone");
    let sellerNameElement = document.getElementById("sellerName");
    let sellerEmailElement = document.getElementById("sellerEmail");

    if (nameField) nameField.value = sellerData.name || "";
    if (emailField) emailField.value = sellerData.email || "";
    if (businessNameField)
      businessNameField.value = sellerData.businessName || "";
    if (businessTypeField)
      businessTypeField.value = sellerData.businessType || "";
    if (addressField) addressField.value = sellerData.address || "";
    if (passwordField) passwordField.value = sellerData.password || "";
    if (phoneField) phoneField.value = sellerData.phone || "";

    // Update the seller's name and email in the UI
    if (sellerNameElement)
      sellerNameElement.textContent = sellerData.name || "";
    if (sellerEmailElement)
      sellerEmailElement.textContent = sellerData.email || "";
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    showMessage("red", "Failed to fetch seller profile. Please try again.");
  }
}

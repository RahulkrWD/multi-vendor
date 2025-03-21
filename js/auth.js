import { baseurl } from "./firebase.js";
import { showMessage } from "./utils.js";

// Register new user
export async function CreateUser(event) {
  event.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  try {
    // Check if user already exists
    let response = await fetch(`${baseurl}/users.json`);
    let data = await response.json();
    let userObj = data ? Object.values(data) : [];
    let exists = userObj.some((e) => e.email == email);
    if (exists) return showMessage("red", "User already exists");

    let user = { name, email, password, role: "customer" };
    let newUser = await fetch(`${baseurl}/users.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (newUser.ok) {
      showMessage("green", "Registration Successful!");
      setTimeout(() => (window.location.href = "login.html"), 1000);
    } else {
      showMessage("red", "Registration Failed!");
    }
  } catch (error) {
    showMessage("red", "Something went wrong!");
  }
}

// User login
export async function LoginUser(event) {
  event.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  try {
    let response = await fetch(`${baseurl}/users.json`);
    let data = await response.json();
    let users = data
      ? Object.entries(data).map(([id, user]) => ({ id, ...user }))
      : [];

    let user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      showMessage("green", "Login Successful!");
      localStorage.setItem("user", user.id);
      setTimeout(() => (window.location.href = "index.html"), 1000);
    } else {
      showMessage("red", "Invalid email or password!");
    }
  } catch (error) {
    showMessage("red", "Something went wrong!");
  }
}

// Logout user
export function LogoutUser() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// create new seller account.
export async function createSellerForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let businessName = document.getElementById("businessName").value.trim();
  let businessType = document.getElementById("businessType").value;
  let address = document.getElementById("address").value.trim();

  try {
    // check if seller already exists
    let checkSeller = await fetch(`${baseurl}/vendors.json`);
    let data = await checkSeller.json();
    let sellerObj = data ? Object.values(data) : [];
    let exists = sellerObj.some((e) => e.email == email);
    if (exists) return showMessage("red", "Seller already exists");

    // create new seller
    let seller = {
      name,
      email,
      password,
      businessName,
      businessType,
      address,
      role: "vendor",
    };
    let response = await fetch(`${baseurl}/vendors.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seller),
    });
    if (response.ok) {
      showMessage("green", "Registration Successful!");
      setTimeout(() => (window.location.href = "seller.html")), 1000;
    } else {
      showMessage("red", "Registration Failed");
    }
  } catch (error) {
    showMessage("red", "Something went wrong!");
  }
}

// seller login.
export async function sellerLoginForm(event) {
  event.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  try {
    let response = await fetch(`${baseurl}/vendors.json`);
    let data = await response.json();
    let sellers = data
      ? Object.entries(data).map(([id, data]) => ({ id, ...data }))
      : [];
    let verifiedSeller = sellers.find(
      (s) => s.email === email && s.password == password
    );

    if (verifiedSeller) {
      showMessage("green", "Login Successful!");
      localStorage.setItem("vendor", verifiedSeller.id);
      setTimeout(() => (window.location.href = "./dashboard.html")), 1000;
    } else {
      showMessage("red", "Invaild email or password");
    }
  } catch (error) {
    showMessage("red", "Something went wrong!");
    console.log(error);
  }
}

export async function editProfileForm(event) {
  event.preventDefault();

  // Get input values
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let updateObj = { name, phone, password };

  try {
    let userId = localStorage.getItem("user");
    let response = await fetch(`${baseurl}/users/${userId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateObj),
    });
    if (response.ok) {
      showMessage("green", "Update Successful!");
      getProfile();
    } else {
      showMessage("red", "Failed to update profile.");
    }
  } catch (error) {
    showMessage("red", "Something went wrong. Please try again.");
  }
}

export async function getProfile() {
  let userId = localStorage.getItem("user");
  try {
    let response = await fetch(`${baseurl}/users.json`);
    let data = await response.json();
    let userArray = data
      ? Object.entries(data).map(([id, data]) => ({ id, ...data }))
      : [];

    let findUser = userArray.find((user) => user.id === userId);
    document.getElementById("name").value = findUser.name;
    document.getElementById("phone").value = findUser.phone
      ? findUser.phone
      : "";

    document.getElementById("email").value = findUser.email;
    document.getElementById("password").value = findUser.password;
    document.getElementById("profile-name").textContent = findUser.name;
    document.getElementById("profile-email").textContent = findUser.email;
  } catch (error) {
    showMessage("red", "Something went wrong!");
  }
}

export async function SellerProfileForm(event) {
  event.preventDefault();
  // get input value
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
    let response = await fetch(`${baseurl}/vendors.json`);
    let data = await response.json();
    let sellerArray = data
      ? Object.entries(data).map(([id, data]) => ({ id, ...data }))
      : [];
    let findSeller = sellerArray.find((seller) => seller.id === sellerId);
    document.getElementById("name").value = findSeller.name;
    document.getElementById("email").value = findSeller.email;
    document.getElementById("businessName").value = findSeller.businessName;
    document.getElementById("businessType").value = findSeller.businessType;
    document.getElementById("address").value = findSeller.address;
    document.getElementById("password").value = findSeller.password;
    document.getElementById("phone").value = findSeller.phone
      ? findSeller.phone
      : "";
    document.getElementById("sellerName").textContent = findSeller.name;
    document.getElementById("sellerEmail").textContent = findSeller.email;
  } catch (error) {
    showMessage("red", "Something went Wrong");
  }
}

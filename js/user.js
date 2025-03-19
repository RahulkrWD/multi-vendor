import { baseurl } from "./firebase.js";
import { LogoutUser } from "./auth.js";

// Check if user is logged in and dynamically create the navbar
export async function checkUserLogin() {
  let response = await fetch(`${baseurl}/users.json`);
  let data = await response.json();
  let users = data
    ? Object.entries(data).map(([id, user]) => ({ id, ...user }))
    : [];
  let loggedInUser = localStorage.getItem("user");

  let user = users.find((u) => u.id === loggedInUser);
  let nav = document.getElementById("navbar");

  if (user) {
    nav.innerHTML = `
      <div class="navbar-item">
        <h3><a class="title" href="index.html">Shoppy</a></h3>
        <div class="search-container">
          <input class="search" id="search" type="text" placeholder="Search.">
        </div>
        <ul id="user-menu" class="menu">
          <li><a href="profile.html">Profile</a></li>
          <li><a href="cart.html">Cart</a></li>
          <li>
            <button class="btn text-bg-danger" id="logoutBtn">LogOut</button>
          </li>
        </ul>
      </div>
    `;
    document.getElementById("logoutBtn").addEventListener("click", LogoutUser);
  } else {
    nav.innerHTML = `
      <div class="navbar-item">
        <h3><a class="title" href="index.html">Shoppy</a></h3>
        <div class="search-container">
          <input class="search" id="search" type="text" placeholder="Search.">
        </div>
        <ul id="menu" class="menu">
          <li><a href="seller.html">Seller/Vendor</a></li>
          <li><a href="register.html">Register</a></li>
          <li><a href="login.html">Login</a></li>
        </ul>
      </div>
    `;
  }
}

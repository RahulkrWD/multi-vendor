import { checkUserLogin } from "./user.js";
import { CreateUser, LoginUser } from "./auth.js";

async function loadNavbar(id, file) {
  let response = await fetch(file);
  let data = await response.text();
  document.getElementById(id).innerHTML = data;
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserLogin();
  loadNavbar("navbar", "./components/navbar.html");

  document
    .getElementById("registerForm")
    ?.addEventListener("submit", CreateUser);
  document.getElementById("loginForm")?.addEventListener("submit", LoginUser);
});

import { checkUserLogin } from "./user.js";
import { CreateUser, LoginUser, LogoutUser } from "./auth.js";
import { showLoadingBar, hideLoadingBar } from "./utils.js";

async function loadNavbar(id, file) {
  showLoadingBar();
  try {
    let response = await fetch(file);
    let data = await response.text();
    document.getElementById(id).innerHTML = data;
    document.getElementById("logoutBtn").addEventListener("click", LogoutUser);
  } catch (error) {
    console.error("Error loading navbar:", error);
  } finally {
    hideLoadingBar();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserLogin();
  loadNavbar("navbar", "./components/navbar.html");

  document
    .getElementById("registerForm")
    ?.addEventListener("submit", CreateUser);
  document.getElementById("loginForm")?.addEventListener("submit", LoginUser);
});

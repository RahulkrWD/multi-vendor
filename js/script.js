import { checkUserLogin } from "./user.js";
import {
  CreateUser,
  LoginUser,
  createSellerForm,
  sellerLoginForm,
  editProfileForm,
  getProfile,
} from "./auth.js";
document.addEventListener("DOMContentLoaded", () => {
  checkUserLogin();
  let userId = localStorage.getItem("user");
  if (userId) {
    getProfile();
  }
  // user Register Form
  document
    .getElementById("registerForm")
    ?.addEventListener("submit", CreateUser);

  // user login form
  document.getElementById("loginForm")?.addEventListener("submit", LoginUser);

  // new seller Register form
  document
    .getElementById("createSeller")
    ?.addEventListener("submit", createSellerForm);

  // seller Login form
  document
    .getElementById("sellerLoginForm")
    ?.addEventListener("submit", sellerLoginForm);

  // Edit profile
  document
    .getElementById("editProfile")
    ?.addEventListener("submit", editProfileForm);
});

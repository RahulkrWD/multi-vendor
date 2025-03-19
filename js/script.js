import { checkUserLogin } from "./user.js";
import { CreateUser, LoginUser } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  checkUserLogin();

  document
    .getElementById("registerForm")
    ?.addEventListener("submit", CreateUser);
  document.getElementById("loginForm")?.addEventListener("submit", LoginUser);
});

import { baseurl } from "./firebase.js";
// import { LogoutUser } from "./auth.js";

// Check if user is logged in
export async function checkUserLogin() {
  let response = await fetch(`${baseurl}/users.json`);
  let data = await response.json();
  let users = data
    ? Object.entries(data).map(([id, user]) => ({ id, ...user }))
    : [];
  let loggedInUser = localStorage.getItem("user");

  let user = users.find((u) => u.id === loggedInUser);
  if (user) {
    let nav = document.getElementById("menu");
    let userNav = document.getElementById("user-menu");
    nav.style.display = "none";
    userNav.style.display = "flex";
  }
}

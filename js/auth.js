import { baseurl } from "./firebase.js";
import { showMessage } from "./utils.js";

// Register new user
export async function CreateUser(event) {
  event.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  try {
    // check if user already exists
    let response = await fetch(`${baseurl}/users.json`);
    let data = await response.json();
    let userObj = data ? Object.values(data) : [];
    let exists = userObj.some((e) => e.email == email);
    if (exists) return showMessage("red", "user already exist");

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

// // Logout user
// export function LogoutUser() {
//   localStorage.removeItem("user");
//   window.location.href = "login.html";
// }

import { LogoutUser } from "./auth.js";

// Check if user is logged in and dynamically create the navbar
export async function checkUserLogin() {
  let loggedInUser = localStorage.getItem("user");
  let nav = document.getElementById("navbar");

  if (loggedInUser) {
    nav.innerHTML = `
       <nav class="navbar-custom">
            <!-- Brand/Logo -->
            <a class="navbar-brand" href="index.html">
                <i class="fas fa-shopping-cart"></i>
                <span class="brand-text">Shoppy</span>
            </a>

            <!-- Search Bar -->
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input
                    class="search"
                    id="search"
                    type="text"
                    placeholder="Search..." />
            </div>

            <!-- Nav Links (Visible on Desktop) -->
            <div class="nav-links">
                <a class="nav-link" href="./profile.html">
                    <i class="fas fa-user"></i> Profile
                </a>
                <a class="nav-link" href="./cart.html">
                    <i class="fas fa-shopping-cart"></i> Cart
                </a>
                 <a class="nav-link"  id="logoutBtn">
                 <i class="fas fa-sign-out-alt"></i>  LogOut
                 </a>
            </div>

            <!-- Sidebar Toggle Button (Visible on Mobile/Tablet) -->
            <button class="sidebar-toggle" id="toggleSidebar">
                <i class="fas fa-bars"></i>
            </button>
        </nav>

        <!-- Sidebar (Visible on Mobile/Tablet) -->
        <div class="sidebar" id="sidebar">
            <a class="nav-link" href="profile.html">
                <i class="fas fa-user"></i> Profile
            </a>
            <a class="nav-link" href="cart.html">
                <i class="fas fa-shopping-cart"></i> Cart
            </a>
             <a class="nav-link"  id="logoutBtnside">
             <i class="fas fa-sign-out-alt"></i>  LogOut
             </a>
        </div>

    `;

    document.getElementById("logoutBtn").addEventListener("click", LogoutUser);
    document
      .getElementById("logoutBtnside")
      .addEventListener("click", LogoutUser);
  } else {
    nav.innerHTML = `

     <nav class="navbar-custom">
            <!-- Brand/Logo -->
            <a class="navbar-brand" href="index.html">
                <i class="fas fa-shopping-cart"></i>
                <span class="brand-text">Shoppy</span>
            </a>

            <!-- Search Bar -->
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input
                    class="search"
                    id="search"
                    type="text"
                    placeholder="Search..." />
            </div>

            <!-- Nav Links (Visible on Desktop) -->
            <div class="nav-links">
                <a class="nav-link" href="seller.html">
                    <i class="fas fa-user p-2"></i> Seller/Vendor
                </a>
                <a class="nav-link" href="register.html">
                    <i class="fas fa-shopping-cart p-2"></i> Register
                </a>
                <a class="nav-link" href="login.html">
                    <i class="fas fa-sign-out-alt p-2"></i> Login
                </a>
            </div>

            <!-- Sidebar Toggle Button (Visible on Mobile/Tablet) -->
            <button class="sidebar-toggle" id="toggleSidebar">
                <i class="fas fa-bars"></i>
            </button>
        </nav>

        <!-- Sidebar (Visible on Mobile/Tablet) -->
        <div class="sidebar" id="sidebar">
            <a class="nav-link" href="seller.html">
                <i class="fas fa-user"></i> Seller/Vendor
            </a>
            <a class="nav-link" href="register.html">
                <i class="fas fa-shopping-cart"></i> Register
            </a>
            <a class="nav-link" href="login.html">
                <i class="fas fa-sign-out-alt"></i> Login
            </a>
        </div>

    `;
  }
  document.getElementById("toggleSidebar").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    sidebar.classList.toggle("open");
    mainContent?.classList?.toggle("shifted");
  });
}

// Close Sidebar on Resize (if screen width > 768px)
function handleResize() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  if (window.innerWidth > 768 && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    mainContent.classList.remove("shifted");
  }
}

// Add Resize Event Listener
window.addEventListener("resize", handleResize);

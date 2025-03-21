// Create Navbar
document.getElementById("navbar").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <!-- Left Side: Title -->
      <a class="navbar-brand" href="./dashboard.html">Seller Dashboard</a>

      <!-- Right Side: Icons -->
      <div class="d-flex align-items-center">
        <!-- Notification Icon -->
        <a href="#" class="text-white me-4">
          <i class="fas fa-bell fs-4"></i>
        </a>

        <!-- Message Icon -->
        <a href="#" class="text-white me-4">
          <i class="fas fa-envelope fs-4"></i>
        </a>

        <!-- Profile Dropdown -->
        <div class="dropdown">
          <a href="#" class="text-white dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown">
            <i class="fas fa-user-circle fs-4"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <li><a class="dropdown-item" href="./seller-profile.html">Profile</a></li>
            <li><hr class="dropdown-divider"></li>

            <button id="sellerLogout" class="dropdown-item">Logout</button>
            
          </ul>
        </div>
      </div>
    </div>
  </nav>
`;

// Create Sidebar
document.getElementById("sidebar").innerHTML = `
  <div class="sidebar bg-light">
    <!-- Toggle Button for Mobile -->
    <button class="sidebar-toggle btn btn-dark d-lg-none" onclick="toggleSidebar()">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar Links with Icons -->
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link active" href="./dashboard.html">
          <i class="fas fa-home fs-4"></i>
          <span class="sidebar-text">Home</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./add-product.html">
          <i class="fas fa-plus fs-4"></i>
          <span class="sidebar-text">Add Product</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./view-products.html">
          <i class="fas fa-eye fs-4"></i>
          <span class="sidebar-text">View Products</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./seller-order.html">
          <i class="fas fa-shopping-cart fs-4"></i>
          <span class="sidebar-text">Orders</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./stock.html">
          <i class="fas fa-box fs-4"></i>
          <span class="sidebar-text">Stock</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="./seller-profile.html">
          <i class="fas fa-user-circle fs-4"></i>
          <span class="sidebar-text">Profile</span>
        </a>
      </li>
     
    </ul>
  </div>
`;
// Function to set the active link in the sidebar
function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".sidebar .nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Toggle Sidebar on Mobile
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
}
setActiveLink();

// Seller logout
document.getElementById("sellerLogout").addEventListener("click", () => {
  localStorage.removeItem("vendor");
  window.location.href = "index.html";
});

import { LogoutUser } from "./auth.js";
import { baseurl } from "./firebase.js";

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
            placeholder="Search brands..." />
        <!-- Search Results Container -->
        <div id="search-results" class="search-results"></div>
    </div>

    <!-- Nav Links (Visible on Desktop) -->
    <div class="nav-links">
        <!-- Profile Dropdown -->
        <div class="dropdown">
            <div class="text-white dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" style="cursor: pointer;">
                <i class="fas fa-user"></i> Profile
            </div>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><a class="dropdown-item" href="./profile.html" style="cursor: pointer;"><i class="fas fa-user m-2"></i> Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="./my-order.html" style="cursor: pointer;"><i class="fas fa-shopping-bag m-2"></i>  My Order</a></li>
            </ul>
        </div>

        <!-- Cart Link -->
        <a class="nav-link" href="./cart.html">
            <i class="fas fa-shopping-cart"></i> Cart
        </a>

        <!-- Logout Link -->
        <a class="nav-link" id="logoutBtn">
            <i class="fas fa-sign-out-alt"></i> LogOut
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
                <a class="nav-link" href="./my-order.html">
                   <i class="fas fa-shopping-bag"></i> My Order
                </a>
                <a class="nav-link" href="cart.html">
                    <i class="fas fa-shopping-cart"></i> Cart
                </a>
                <a class="nav-link" id="logoutBtnside">
                    <i class="fas fa-sign-out-alt"></i> LogOut
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
                        placeholder="Search brands..." />
                    <!-- Search Results Container -->
                    <div id="search-results" class="search-results"></div>
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

  // Add event listener for search input
  document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const searchResultsContainer = document.getElementById("search-results");

    if (searchTerm === "") {
      searchResultsContainer.style.display = "none"; // Hide results if search term is empty
      searchResultsContainer.innerHTML = ""; // Clear results
    } else {
      filterBrands(searchTerm);
      searchResultsContainer.style.display = "block"; // Show results
    }
  });

  // Hide search results when clicking outside the search container
  document.addEventListener("click", (e) => {
    const searchContainer = document.querySelector(".search-container");
    const searchResultsContainer = document.getElementById("search-results");

    if (!searchContainer.contains(e.target)) {
      searchResultsContainer.style.display = "none"; // Hide results
    }
  });

  // Add event listener for sidebar toggle
  document.getElementById("toggleSidebar").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    sidebar.classList.toggle("open");
    mainContent?.classList?.toggle("shifted");
  });
}

// Filter brands based on user input
async function filterBrands(searchTerm) {
  try {
    let response = await fetch(`${baseurl}/products.json`);
    let data = await response.json();
    let productArray = data
      ? Object.entries(data).map(([id, data]) => ({ id, ...data }))
      : [];

    // Get unique brands
    let uniqueBrands = [...new Set(productArray.map((item) => item.brand))];

    // Filter brands based on search term
    const filteredBrands = uniqueBrands.filter((brand) =>
      brand.toLowerCase().includes(searchTerm)
    );

    // Display filtered brands
    displayFilteredBrands(filteredBrands);
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

// Display filtered brands as clickable links
function displayFilteredBrands(filteredBrands) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = ""; // Clear previous results

  if (filteredBrands.length === 0) {
    searchResultsContainer.innerHTML = `<p>No brands found.</p>`;
    return;
  }

  filteredBrands.forEach((brand) => {
    const brandLink = document.createElement("a");
    brandLink.href = `listing-product.html?brand=${encodeURIComponent(brand)}`;
    brandLink.textContent = brand;
    brandLink.className = "brand-link";
    searchResultsContainer.appendChild(brandLink);
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

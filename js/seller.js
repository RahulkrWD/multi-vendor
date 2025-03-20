import { addProduct, isSellerLoggedIn } from "./add-product.js";
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addProductFrom")
    ?.addEventListener("submit", addProduct);

  isSellerLoggedIn();
});

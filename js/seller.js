import { addProduct, isSellerLoggedIn } from "./add-product.js";
import { SellerProfileForm, GetSellerProfile } from "./auth.js";
document.addEventListener("DOMContentLoaded", () => {
  let sellerId = localStorage.getItem("vendor");
  if (sellerId) {
    GetSellerProfile();
  }
  document
    .getElementById("addProductFrom")
    ?.addEventListener("submit", addProduct);

  isSellerLoggedIn();

  document
    .getElementById("editSellerForm")
    ?.addEventListener("submit", SellerProfileForm);
});

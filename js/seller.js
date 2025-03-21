import {
  addProduct,
  isSellerLoggedIn,
  SellerProfileForm,
  GetSellerProfile,
} from "./add-product.js";
document.addEventListener("DOMContentLoaded", () => {
  GetSellerProfile();
  document
    .getElementById("addProductFrom")
    ?.addEventListener("submit", addProduct);

  isSellerLoggedIn();

  document
    .getElementById("editSellerForm")
    ?.addEventListener("submit", SellerProfileForm);
});

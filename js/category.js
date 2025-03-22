import { baseurl } from "./firebase.js";
export async function FeaturedProduct() {
  try {
    let response = await fetch(`${baseurl}/products.json`);
    let data = await response.json();
    let product = data
      ? Object.entries(data).map(([id, data]) => ({ id, ...data }))
      : [];

    //    unique category
    let unique = [...new Set(product.map((product) => product.category))];

    let container = document.getElementById("feature-product");
    container.innerHTML = "";
    unique.map((category) => {
      let li = document.createElement("li");
      li.innerHTML = `
       <a class="text-decoration-none text-light" href="./listing-product.html?category=${category}">${category}</a>
        `;
      container.appendChild(li);
    });
    // listProduct(product);
  } catch (error) {
    console.log("Something went wrong!");
  }
}

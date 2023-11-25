import "../scss/products.scss";
import * as bootstrap from "bootstrap";

import { products } from "./data";

const productsContainer = document.querySelector("#products-container");

const createpProductElements = () => {
  products.forEach((element) => {
    const div = document.createElement("div");
    div.className = "col-10 col-md-4 col-lg-3";

    const product = document.createElement("div");
    product.className = "product";

    const image = document.createElement("img");
    image.src = element.src;
    image.alt = element.alt;
    product.appendChild(image);

    const text = document.createElement("div");
    text.innerText = element.name;
    product.appendChild(text);

    div.appendChild(product);
    div.addEventListener("click", () => {
      location.href = "../product/product.html?" + element.name.split("\n")[0];
      localStorage.setItem("product", element.id);
    });
    productsContainer.appendChild(div);
  });
};

createpProductElements();

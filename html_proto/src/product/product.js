import "../scss/product.scss";
import { productDetals } from "./productDetails";
import * as bootstrap from "bootstrap";

const productContainer = document.querySelector("#product-container");
const productId = localStorage.getItem("product");
const toCartButton = document.createElement("button");
toCartButton.disabled = true;

const addDiv = (text, infoStack, name) => {
  const div = document.createElement("div");
  div.className = "p-2" + " " + name;
  div.innerText = text;
  infoStack.appendChild(div);
};
let selected = null;

const addRating = (srce, infoStack, text, name) => {
  const div = document.createElement("div");
  const ratingText = document.createElement("div");
  div.className = name;
  ratingText.innerText = text;
  const image = document.createElement("img");
  image.src = srce;
  image.style.width = "100%";
  div.appendChild(image);
  div.appendChild(ratingText);
  infoStack.appendChild(div);
};

const addButton = (id, buttonText, group) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.className = "btn-check hide";
  input.name = "btnradio";
  input.id = "btnradio" + id;
  input.autocomplete = "off";
  const label = document.createElement("label");
  label.className = "btn btn-light";
  label.htmlFor = "btnradio" + id;
  label.innerText = buttonText;
  group.appendChild(input);
  group.appendChild(label);
  input.addEventListener("change", function () {
    const labels = document.querySelectorAll(".btn-group label");
    for (let i = 0; i < labels.length; i++) {
      labels[i].classList.remove("active");
    }
    const selectedLabel = document.querySelector(
      `label[for="${"btnradio" + id}"]`
    );
    selectedLabel.classList.add("active");
    selected = buttonText;
    toCartButton.disabled = false;
    console.log(selected);
  });
};

const addCartOptions = (addToCart, product) => {
  addToCart.className = "addToCart";

  const minus = document.createElement("button");
  minus.className = "cart-button";
  minus.innerText = "-";

  const value = document.createElement("div");
  value.className = "value";
  value.value = 1;
  value.innerText = value.value;

  const plus = document.createElement("button");
  plus.className = "cart-button";
  plus.innerText = "+";

  minus.onclick = () => {
    if (value.value > 1) {
      value.value = value.value - 1;
      value.innerText = value.value;
    }
  };

  plus.onclick = () => {
    value.value = value.value + 1;
    value.innerText = value.value;
  };

  addToCart.appendChild(minus);
  addToCart.appendChild(value);
  addToCart.appendChild(plus);

  toCartButton.className = "btn add-button";
  toCartButton.innerText = "Add to cart";

  toCartButton.onclick = () => {
    const productId = localStorage.getItem("product");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (productId in cart) {
      cart[productId].qty += value.value;
    } else {
      let cartItem = {
        name: product.name,
        price: product.price,
        imageSrc: product.src,
        productAmount: selected,
        qty: value.value,
      };
      cart[productId] = cartItem;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.href = "../cart/cart.html";
  };

  addToCart.appendChild(toCartButton);
};

const createpProductElement = () => {
  const product = productDetals.find((product) => product.id == productId);

  const images = document.createElement("div");
  images.className = "col-sm-8 col-md-4 col-lg-2";

  const imagesStack = document.createElement("div");
  imagesStack.className = "vstack gap-3 col-md-5";
  product.images.forEach((small) => {
    const smallImage = document.createElement("img");
    smallImage.className = "p-2";
    smallImage.src = small.src;
    smallImage.alt = small.alt;
    imagesStack.appendChild(smallImage);
  });
  images.appendChild(imagesStack);
  productContainer.appendChild(images);

  const image = document.createElement("img");
  const imageDiv = document.createElement("div");
  image.src = product.src;
  image.alt = product.alt;
  image.style.width = "100%";
  imageDiv.className = "col-sm-10 col-md-5 col-lg-4";

  imageDiv.appendChild(image);
  productContainer.appendChild(imageDiv);

  const info = document.createElement("div");
  info.className = "col-sm-10 col-md-10 col-lg-6";

  const infoStack = document.createElement("div");
  infoStack.className = "vstack gap-2 infostack";

  addDiv(product.name, infoStack, "name");
  addDiv(product.teaType, infoStack, "teatype");
  addRating(
    "./../assets/rating.png",
    infoStack,
    product.rating + " " + product.reviews + " reviews",
    "rating"
  );
  addDiv(product.description, infoStack, "desc");
  addDiv(product.price.toFixed(2) + "€", infoStack, "pro");

  const options = document.createElement("div");
  options.className = "btn-group";
  options.role = "group";
  options.ariaLabel = "Basic radio toggle button group";

  addButton(1, "50g", options);
  addButton(2, "100g", options);
  addButton(3, "500g", options);
  infoStack.appendChild(options);

  const addToCart = document.createElement("div");
  addCartOptions(addToCart, product);

  infoStack.appendChild(addToCart);
  info.appendChild(infoStack);

  productContainer.appendChild(info);
};

createpProductElement();

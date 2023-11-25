import "../scss/cart.scss";

let cart = {};
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}
let total = 0;
let cartItems = document.querySelector("#cart-items");
let sum = document.querySelector("#sum-shipping");
let sum2 = document.querySelector("#sum");

const changeSum = () => {
  sum.innerHTML = total.toFixed(2) + " €<br> -";
  sum2.innerHTML = total.toFixed(2) + " €";
  localStorage.setItem("total", total.toFixed(2) + " €");
};

for (let id in cart) {
  let item = cart[id];

  let tr = document.createElement("div");
  tr.className = "row item";

  let image_td = document.createElement("img");
  image_td.className = "col image";
  image_td.src = item.imageSrc;
  tr.appendChild(image_td);

  let title_td = document.createElement("div");
  title_td.className = "col name";
  title_td.textContent = item.name;
  tr.appendChild(title_td);

  let tt = document.createElement("div");
  tt.className = "col amount";
  tt.textContent = item.productAmount;
  title_td.appendChild(tt);

  const minus = document.createElement("button");
  minus.className = "cart-button";
  minus.innerText = "-";

  const value = document.createElement("div");
  value.className = "value";
  value.value = item.qty;
  value.innerText = value.value;

  const plus = document.createElement("button");
  plus.className = "cart-button";
  plus.innerText = "+";

  minus.onclick = () => {
    if (value.value > 1) {
      value.value = value.value - 1;
      value.innerText = value.value;
      total -= item.price;
      item.qty -= 1;
      changeSum();
      // localstorage change also
    }
  };

  plus.onclick = () => {
    value.value = value.value + 1;
    value.innerText = value.value;
    total += item.price;
    item.qty += 1;
    changeSum();
  };

  const d = document.createElement("div");
  d.className = "hstack gap-3 plus-minus";
  d.appendChild(minus);
  d.appendChild(value);
  d.appendChild(plus);
  title_td.appendChild(d);

  let price_td = document.createElement("div");
  price_td.textContent = item.price.toFixed(2) + "€";
  price_td.className = "col price";
  tr.appendChild(price_td);

  let carbage_can = document.createElement("img");
  carbage_can.className = "can";
  carbage_can.src = "./../assets/Vector.png";
  price_td.appendChild(carbage_can);
  carbage_can.onclick = () => {
    total -= item.price * item.qty;
    changeSum();
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItems.removeChild(tr);
  };

  cartItems.appendChild(tr);
  total += item.price * item.qty;
}

changeSum();

import { Button } from "bootstrap";
import "../scss/checkout.scss";
let sum = document.querySelector("#sum");
sum.innerHTML = localStorage.getItem("total");

let sum2 = document.querySelector("#sum-total");
sum2.innerHTML = localStorage.getItem("total");

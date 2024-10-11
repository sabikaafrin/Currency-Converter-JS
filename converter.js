const BASE_URL =
  "https://v6.exchangerate-api.com/v6/ffd24e1ede4790697382999e/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const countryList = {
  USD: "US",
  BDT: "BD",
  INR: "IN",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  JPY: "JP",
  CNY: "CN",
  SGD: "SG",
  NZD: "NZ",
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "BDT") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  amount.value = "";

  const URL = `${BASE_URL}${fromCurr.value}`;
  let response = await fetch(URL);

  let data = await response.json();

  let rate = data.conversion_rates[toCurr.value];

  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  
};
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  msg.style.visibility = "visible";
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

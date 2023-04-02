let plusbtn = document.getElementById("plusbtn");
let form = document.getElementById("form");
let products = document.getElementById("product-container");
let dict = {};

let k = 2;
function update_total_bill() {
  let tb = document.getElementById("tb");
  let tp = document.getElementsByClassName("tp");
  tb.value = 0;
  for (let i = 0; i < tp.length; i++) {
    if (tp[i].value) {
      tb.value = Number(tb.value) + Number(tp[i].value);
    }
  }
}
function addListener(n) {
  for (let i = 0; i < n; i++) {
    console.log(document.getElementById(`pid${i + 1}`));
    document
      .getElementById(`pid${i + 1}`)
      .addEventListener("input", (event) => {
        dict[`pid${i + 1}`] = event.target.value;
      });
    document
      .getElementById(`ppp${i + 1}`)
      .addEventListener("input", (event) => {
        dict[`ppp${i + 1}`] = event.target.value;
        if (dict[`ppp${i + 1}`] && dict[`qty${i + 1}`]) {
          document.getElementById(`tp${i + 1}`).value =
            dict[`ppp${i + 1}`] * dict[`qty${i + 1}`];
          update_total_bill();
        }
      });
    document
      .getElementById(`qty${i + 1}`)
      .addEventListener("input", (event) => {
        dict[`qty${i + 1}`] = event.target.value;

        if (dict[`ppp${i + 1}`] && dict[`qty${i + 1}`]) {
          document.getElementById(`tp${i + 1}`).value =
            dict[`ppp${i + 1}`] * dict[`qty${i + 1}`];
          update_total_bill();
        }
      });
  }
}

addListener(1);

function putValue(n) {
  console.log(dict);
  for (let i = 0; i < n; i++) {
    if (dict[`pid${i + 1}`])
      document.getElementById(`pid${i + 1}`).value = dict[`pid${i + 1}`];
    if (dict[`ppp${i + 1}`])
      document.getElementById(`ppp${i + 1}`).value = dict[`ppp${i + 1}`];
    if (dict[`qty${i + 1}`])
      document.getElementById(`qty${i + 1}`).value = dict[`qty${i + 1}`];
    if (dict[`ppp${i + 1}`] && dict[`qty${i + 1}`]) {
      document.getElementById(`tp${i + 1}`).value =
        dict[`ppp${i + 1}`] * dict[`qty${i + 1}`];

      update_total_bill();
    }
  }
}

form.addEventListener("submit", function (event) {
  if (event.submitter.matches("#plusbtn")) {
    event.preventDefault();

    const parser = new DOMParser();
    htmlStr = products.innerHTML;
    const htmldoc = parser.parseFromString(htmlStr, "text/html");
    prods = htmldoc.getElementsByClassName("product");

    addListener(prods.length);

    products.innerHTML += `<div class="product">
    <input type="text" name="pid" class="pid" id="pid${k}" placeholder="ProductId">
    <input type="text" name='ppp' class='ppp' id="ppp${k}" placeholder="Price per product">
    <input type="text" name='qty' class='qty' id="qty${k}" placeholder="Qty">
    <input type="text" name='tp' class='tp' id="tp${k}" placeholder="Total price" disabled>
    </div>`;

    putValue(prods.length);
    addListener(k);

    k = k + 1;
  }
});

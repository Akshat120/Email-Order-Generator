var tab = document.getElementsByClassName("tab");
var logintab = tab[0];
var registertab = tab[1];

var formholder = document.getElementsByClassName("formholder");

login_form_text = `<form action="/login" method="post">
<input class="input-field" type="text" name="email" id="email" placeholder="email" />
<input class="input-field" type="password" name="password" id="password" placeholder="password" />
<button class="btn" type="submit">login</button>
</form>`;

register_form_text = `<form action="/register" method="post">
<input class="input-field" type="text" name="email" id="email" placeholder="email" />
<input class="input-field" type="password" name="password" id="password" placeholder="password" />
<input class="input-field" type="password" name="repassword" id="repassword" placeholder="confirm-password" />
<button class="btn" type="submit">register</button>
</form>`;

logintab.addEventListener("click", () => {
  formholder[0].innerHTML = login_form_text;
  logintab.setAttribute("style", "background-color:#00adb5; color: #222831;");
  registertab.setAttribute("style", "background:none; color: #eeeeee;");
});

registertab.addEventListener("click", () => {
  formholder[0].innerHTML = register_form_text;
  registertab.setAttribute(
    "style",
    "background-color:#00adb5; color: #222831;"
  );
  logintab.setAttribute("style", "background:none; color: #eeeeee;");
});

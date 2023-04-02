c1 = document.getElementById("otp1");
c2 = document.getElementById("otp2");
c3 = document.getElementById("otp3");
c4 = document.getElementById("otp4");

c1.focus();

c1.addEventListener("keypress", (event) => {
  c1.value = event.key;
  c2.focus();
});

c2.addEventListener("keypress", (event) => {
  c2.value = event.key;
  c3.focus();
});
c3.addEventListener("keypress", (event) => {
  c3.value = event.key;
  c4.focus();
});

c4.addEventListener("keypress", (event) => {
  c4.value = event.key;
  c1.focus();
});

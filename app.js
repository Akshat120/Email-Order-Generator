require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = require("./router");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/", router);

app.listen(3000, () => {
  console.log("server started");
});

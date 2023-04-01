const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTIONSTRING, () => {
  console.log("MongoDB-Atlas connected.");
});
